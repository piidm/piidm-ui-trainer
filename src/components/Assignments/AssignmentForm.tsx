import React, { useEffect, useState } from 'react';
import { X, Calendar, Users, FileText, AlertCircle, Save } from 'lucide-react';
import { Assignment, Batch } from '../../types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTrainerData } from '../../hooks/useTrainerData';

interface AssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => Promise<void>;
  batches: Batch[];
  assignment?: Assignment;
  isEditing?: boolean;
}

export const AssignmentForm: React.FC<AssignmentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  batches,
  assignment,
  isEditing = false
}) => {
  
  // Initialize form data based on whether we're editing or creating
  const getInitialFormData = () => {
    if (assignment && isEditing) {
      // Handle batchId which might be a JSON string like "[1,2,3]" 
      let extractedBatchId = '';
      if (assignment.batchId) {
        try {
          // Try to parse as JSON array first
          if (assignment.batchId.startsWith('[')) {
            const batchIds = JSON.parse(assignment.batchId);
            extractedBatchId = Array.isArray(batchIds) && batchIds.length > 0 ? batchIds[0].toString() : '';
          } else {
            // If it's not a JSON array, use it directly
            extractedBatchId = assignment.batchId;
          }
        } catch (error) {
          // If parsing fails, use the original value
          extractedBatchId = assignment.batchId;
        }
      }

      return {
        title: assignment.title || '',
        details: assignment.details || '',
        batchId: extractedBatchId,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : '',
        totalMarks: assignment.totalMarks || 100
      };
    }
    return {
      title: '',
      details: '',
      batchId: '',      
      dueDate: '',
      totalMarks: 100
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    if (isOpen) {
      // Reset form data when modal opens
      setFormData(getInitialFormData());
    }
  }, [assignment, isEditing, isOpen]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const batchTimeObj = localStorage.getItem("batch_time_obj") ? JSON.parse(localStorage.getItem("batch_time_obj")!) : [];
  const batchObj = localStorage.getItem("batch_obj") ? JSON.parse(localStorage.getItem("batch_obj")!) : [];


  // Helper to get timing name for a batch
  function getBatchTimingName(batchId: string) {
    // Find batch in batchObj
    const batch = batchObj.find((b: any) => String(b.batch_id) === String(batchId));
    if (!batch) return "";
    // batch_time_id may be a number or string
    const batchTimeId = batch.batch_time_id?.toString();
    if (!batchTimeId) return "";
    // Find timing in batchTimeObj
    const timing = batchTimeObj.find((t: any) => String(t.id) === batchTimeId || String(t.batch_time_id) === batchTimeId);
    return timing?.name || "";
  }


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Assignment title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!formData.details.trim() || formData.details === '<p><br></p>') {
      newErrors.details = 'Assignment details are required';
    }

    if (!formData.batchId) {
      newErrors.batchId = 'Please select a batch';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const dueDate = new Date(formData.dueDate);
      const now = new Date();
      if (dueDate <= now) {
        newErrors.dueDate = 'Due date must be in the future';
      }
    }

    if (!formData.totalMarks || formData.totalMarks < 1 || formData.totalMarks > 1000) {
      newErrors.totalMarks = 'Total marks must be between 1 and 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const assignmentData = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      };

      await onSubmit(assignmentData);
      
      // Show success notification (you can implement a toast system)
    } catch (error) {
      console.error('Error saving assignment:', error);
      // Show error notification here if you have a toast system
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      details: '',
      batchId: '',
      dueDate: '',
      totalMarks: 100
    });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    if (!isEditing) {
      resetForm();
    }
  };

  if (!isOpen) return null;

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  const activeBatches = batches.filter(batch => batch.isActive);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Edit Assignment' : 'Create New Assignment'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isEditing ? 'Update assignment details' : 'Fill in the details to create a new assignment'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Assignment Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Title *
              <span className="text-xs text-gray-500 ml-2">
                ({formData.title.length}/100 characters)
              </span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              maxLength={100}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter a descriptive title for the assignment"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Assignment Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Details *
            </label>
            <div className={`border rounded-lg ${errors.details ? 'border-red-300' : 'border-gray-300'}`}>
              <ReactQuill
                theme="snow"
                value={formData.details}
                onChange={(value) => setFormData(prev => ({ ...prev, details: value }))}
                modules={quillModules}
                placeholder="Provide detailed instructions, requirements, deliverables, and evaluation criteria..."
                style={{ minHeight: '200px' }}
              />
            </div>
            {errors.details && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.details}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Use the rich text editor to format your assignment instructions with headings, lists, and emphasis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Batch *
              </label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.batchId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                >
                  <option value="">Choose target batch</option>
                  {activeBatches.map(batch => {
                    const timingName = getBatchTimingName(batch.id);
                    return (
                      <option key={batch.id} value={batch.id}>
                        {batch.name}
                        {timingName ? ` (${timingName})` : ""}
                        {" - "} {batch.totalStudents! > 1 ? `${batch.totalStudents} students` : `${batch.totalStudents} student`}
                      </option>
                    );
                  })}
                </select>
              </div>
              {errors.batchId && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.batchId}
                </p>
              )}
            </div>

            {/* Total Marks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Marks *
              </label>
              <div className="relative">
                <FileText className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalMarks: parseInt(e.target.value) || 0 }))}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.totalMarks ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="Enter maximum points"
                />
              </div>
              {errors.totalMarks && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.totalMarks}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date & Time *
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dueDate}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t bg-gray-50 -mx-6 px-6 -mb-6 pb-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Update Assignment' : 'Create Assignment'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};