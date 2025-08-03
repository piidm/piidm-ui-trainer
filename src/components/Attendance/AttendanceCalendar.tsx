import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin, User } from 'lucide-react';
import { LiveSession, Batch } from '../../types';
import { AttendanceModal } from './AttendanceModal';

interface AttendanceCalendarProps {
  sessions: LiveSession[];
  batches: Batch[];
  onMarkAttendance: (sessionId: string, attendanceData: Array<{
    studentId: string;
    status: 'present' | 'absent';
  }>) => void;
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  sessions,
  batches,
  onMarkAttendance
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [currentYear, currentMonth, daysInMonth, startingDayOfWeek]);

  // Get sessions for a specific date
  const getSessionsForDate = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.filter(session => session.date === dateString);
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get batch info
  const getBatch = (batchId: string) => {
    return batches.find(batch => batch.id === batchId);
  };

  // Check if date is in the past or today
  const canMarkAttendance = (day: number) => {
    const sessionDate = new Date(currentYear, currentMonth, day);
    return sessionDate <= today;
  };

  // Check if attendance can be edited (within 24 hours)
  const canEditAttendance = (day: number) => {
    const sessionDate = new Date(currentYear, currentMonth, day);
    const hoursDiff = (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleSessionClick = (session: LiveSession, day: number) => {
    if (canMarkAttendance(day)) {
      setSelectedSession(session);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Calendar Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Attendance Calendar
          </h2>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-32"></div>;
            }

            const sessionsForDay = getSessionsForDate(day);
            const isToday = today.getDate() === day && 
                           today.getMonth() === currentMonth && 
                           today.getFullYear() === currentYear;
            const isPast = new Date(currentYear, currentMonth, day) < today;
            const canMark = canMarkAttendance(day);

            return (
              <div
                key={day}
                className={`h-32 border rounded-lg p-2 transition-all ${
                  isToday 
                    ? 'bg-blue-50 border-blue-200' 
                    : isPast 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday ? 'text-blue-600' : isPast ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  {day}
                  {isToday && <span className="ml-1 text-xs">(Today)</span>}
                </div>
                
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {sessionsForDay.map(session => {
                    const batch = getBatch(session.batchId);
                    return (
                      <button
                        key={session.id}
                        onClick={() => handleSessionClick(session, day)}
                        disabled={!canMark}
                        className={`w-full text-left p-1.5 rounded text-xs transition-all ${
                          canMark
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        }`}
                        title={canMark ? 'Click to mark attendance' : 'Cannot mark attendance for future dates'}
                      >
                        <div className="font-medium truncate">{session.topic}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span className="truncate">{batch?.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Legend:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
              <span className="text-gray-600">Past dates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded"></div>
              <span className="text-gray-600">Sessions (clickable)</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Click on sessions to mark attendance. Attendance can only be marked for current/past dates and edited within 24 hours.
          </p>
        </div>
      </div>

      {/* Attendance Modal */}
      {selectedSession && (
        <AttendanceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          session={selectedSession}
          batch={getBatch(selectedSession.batchId)}
          onSaveAttendance={onMarkAttendance}
          canEdit={canEditAttendance(new Date(selectedSession.date).getDate())}
        />
      )}
    </div>
  );
};