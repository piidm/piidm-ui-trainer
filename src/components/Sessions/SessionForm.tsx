import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Users, Monitor, Link2 } from 'lucide-react';
import { LiveSession, Batch, AllBatches } from '../../types';
// import { useTrainerData } from '../../hooks/useTrainerData';

interface SessionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (session: Omit<LiveSession, 'id'>) => void;
  batches: Batch[];
  allBatches: AllBatches[];
}

export const SessionForm: React.FC<SessionFormProps> = ({ isOpen, onClose, onSubmit, batches, allBatches }) => {

  const batchObj = localStorage.getItem("batch_obj") ? JSON.parse(localStorage.getItem("batch_obj")!) : [];
  const batchtimeObj = localStorage.getItem("batch_time_obj") ? JSON.parse(localStorage.getItem("batch_time_obj")!) : [];
  const courseModeObj = localStorage.getItem("course_mode_obj") ? JSON.parse(localStorage.getItem("course_mode_obj")!) : [];
  console.log("Batch Object:", batchObj);
  console.log("Batch Time Object:", batchtimeObj);
  console.log("Course Mode Object:", courseModeObj);

  const [formData, setFormData] = useState<{
    topic: string;
    batchId: string;
    batchTimeId?: string;
    date: string;
    time: string;
    mode: 'classroom' | 'online' | 'hybrid';
    lectureLink: string;
  }>({
    topic: '',
    batchId: '',
    batchTimeId: '',
    date: '',
    time: '',
    mode: 'classroom',
    lectureLink: ''
  });
  console.log("Form Data:", formData);

  useEffect(() => {
    // Run when a batch is selected; compute timing and mode from localStorage objects
    if (!formData.batchId) return;
    const selectedBatch = batchObj.find((b: { batch_id: string | number; }) => String(b.batch_id) === String(formData.batchId));
    let timing = "";
    if (selectedBatch && batchtimeObj && Array.isArray(batchtimeObj)) {
      const batchTime = batchtimeObj.find((b: { batch_time_id: string | number; }) => String(b.batch_time_id) === String(selectedBatch.batch_time_id));
      timing = batchTime?.name;
    }

    // Extract starting time if timing or name is like "8:00AM - 10:00AM"
    let startTime = '';
    if (typeof timing === 'string' && timing.includes('-')) {
      const firstPart = timing.split('-')[0].trim();
      const match = firstPart.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || firstPart.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
      if (match) {
        let [_, hourStr, minuteStr, modifier] = match;
        let hours = parseInt(hourStr, 10);
        const minutes = parseInt(minuteStr, 10);
        if (modifier?.toUpperCase() === 'PM' && hours !== 12) hours += 12;
        if (modifier?.toUpperCase() === 'AM' && hours === 12) hours = 0;
        startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }

    // Set mode from course_mode_obj using course_mode_id from selectedBatch
    let modeValue: 'classroom' | 'online' | 'hybrid' = 'classroom';
    if (selectedBatch && courseModeObj && Array.isArray(courseModeObj)) {
      const courseMode = courseModeObj.find((c: { course_mode_id: number }) => c.course_mode_id === selectedBatch.course_mode_id);
      if (courseMode && courseMode.name) {
        const name = courseMode.name.toLowerCase();
        if (name.includes('classroom')) modeValue = 'classroom';
        else if (name.includes('online')) modeValue = 'online';
        else if (name.includes('hybrid')) modeValue = 'hybrid';
      }
    }

    setFormData(prev => ({
      ...prev,
      // keep existing time if we couldn't parse one
      time: startTime || prev.time,
      mode: modeValue,
      // ensure batchTimeId is also kept in sync with selected batch
      batchTimeId: selectedBatch && selectedBatch.batch_time_id ? String(selectedBatch.batch_time_id) : prev.batchTimeId
    }));
  }, [formData.batchId, allBatches]);
  // }, [formData.batchTimeId, allBatches]);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }

    if (!formData.batchTimeId) {
      newErrors.batchId = 'Please select a batch';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if ((formData.mode === 'online' || formData.mode === 'hybrid') && !formData.lectureLink.trim()) {
      newErrors.lectureLink = 'Lecture link is required for online/hybrid sessions';
    }

    if (formData.lectureLink && !isValidUrl(formData.lectureLink)) {
      newErrors.lectureLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const session: Omit<LiveSession, 'id'> = {
      ...formData,
      status: 'scheduled'
    };

    await onSubmit(session);

    onClose();
    setFormData({
      topic: '',
      batchTimeId: '',
      batchId: '',
      date: '',
      time: '',
      mode: 'classroom',
      lectureLink: ''
    });
    setErrors({});
  };

  const handleModeChange = (mode: 'classroom' | 'online' | 'hybrid') => {
    setFormData(prev => ({
      ...prev,
      mode,
      lectureLink: mode === 'classroom' ? '' : prev.lectureLink
    }));
    // Clear lecture link error when switching to classroom mode
    if (mode === 'classroom' && errors.lectureLink) {
      setErrors(prev => ({ ...prev, lectureLink: '' }));
    }
  };

  if (!isOpen) return null;

  const requiresLink = formData.mode === 'online' || formData.mode === 'hybrid';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Schedule New Session</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.topic ? 'border-red-300' : 'border-gray-300'
                }`}
              placeholder="Enter session topic"
            />
            {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.date ? 'border-red-300' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <div className="relative">
                <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  value={formData.time}
                  disabled

                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.time ? 'border-red-300' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Select Batch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Batch *
            </label>
            <div className="relative">
              <Users className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={formData.batchId}
                onChange={(e) => {
                  const selectedBatchId = e.target.value;
                  const selectedBatch = batchObj.find((b: { batch_id: string | number; batch_time_id?: string | number; course_mode_id?: number }) => String(b.batch_id) === String(selectedBatchId));
                  console.log("Selected Batch:", selectedBatch);

                  // Set batchId and batchTimeId (if available). useEffect will compute time & mode.
                  setFormData(prev => ({
                    ...prev,
                    batchId: selectedBatch ? String(selectedBatch.batch_id) : '',
                    batchTimeId: selectedBatch && selectedBatch.batch_time_id ? String(selectedBatch.batch_time_id) : ''
                  }))

                }}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.batchId ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Choose a batch</option>
                {batchObj.map((item: any, index: number) => (
                  <option key={`${item.batch_id}-${index}`} value={item.batch_id} >
                    {item.name}
                  </option>))}
              </select>
            </div>
            {errors.batchId && <p className="text-red-500 text-sm mt-1">{errors.batchId}</p>}
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mode *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'classroom', label: 'Classroom', icon: Users },
                { value: 'online', label: 'Online', icon: Monitor },
                { value: 'hybrid', label: 'Hybrid', icon: Monitor }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  disabled
                  onClick={() => handleModeChange(value as 'classroom' | 'online' | 'hybrid')}
                  className={`flex flex-col items-center gap-2 p-3 border-2 rounded-lg transition-all ${formData.mode === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lecture Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lecture Link {requiresLink && '*'}
              {requiresLink && (
                <span className="text-xs text-gray-500 ml-1">(Required for online/hybrid sessions)</span>
              )}
            </label>
            <div className="relative">
              <Link2 className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={formData.lectureLink}
                onChange={(e) => setFormData(prev => ({ ...prev, lectureLink: e.target.value }))}
                disabled={formData.mode === 'classroom'}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formData.mode === 'classroom'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : errors.lectureLink
                    ? 'border-red-300'
                    : 'border-gray-300'
                  }`}
                placeholder={formData.mode === 'classroom' ? 'Not required for classroom sessions' : 'https://meet.google.com/your-meeting-link'}
              />
            </div>
            {errors.lectureLink && <p className="text-red-500 text-sm mt-1">{errors.lectureLink}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};