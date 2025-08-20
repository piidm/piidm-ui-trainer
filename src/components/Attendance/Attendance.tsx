import React, { useEffect } from 'react';
import { AttendanceCalendar } from './AttendanceCalendar';
import { AttendanceStats } from './AttendanceStats';
import { useTrainerData } from '../../hooks/useTrainerData';

export const Attendance: React.FC = () => {
  const { sessions, batches, students,fetchStudents, fetchBatches, fetchSessions,markAttendance } = useTrainerData();

    useEffect(() => {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        fetchSessions(controller.signal);
        fetchBatches(controller.signal);
        fetchStudents(controller.signal)
      }, 1000);
      return () => {
              console.log("🛑 Dashboard unmounted → clearing timeout");

        clearTimeout(timeout);
        controller.abort();
      }
    }, []);

  // Calculate stats
  const totalSessions = sessions.length;
  const totalStudents = students.length;
  const averageAttendance = 89; // Mock data
  const todayAttendance = 92; // Mock data

  // Get this week's sessions
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  }).length;

  // Get pending sessions (f\uture sessions)
  const pendingSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate > new Date();
  }).length;

  const handleMarkAttendance = (sessionId: string, attendanceData: Array<{
    studentId: string;
    status: 'present' | 'absent';
  }>) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const attendanceRecords = attendanceData.map(data => ({
      studentId: data.studentId,
      batchId: session.batchId,
      date: session.date,
      status: data.status,
      sessionId: sessionId,
      markedAt: new Date().toISOString(),
      notes: ''
    }));

    markAttendance(attendanceRecords);
    console.log(`Attendance marked for session ${sessionId}`, attendanceRecords);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Attendance Management</h2>
        <p className="text-gray-600 mt-1">Track and manage student attendance for all sessions</p>
      </div>

      {/* Stats Dashboard */}
      <AttendanceStats
        totalSessions={totalSessions}
        totalStudents={totalStudents}
        averageAttendance={averageAttendance}
        todayAttendance={todayAttendance}
        thisWeekSessions={thisWeekSessions}
        pendingSessions={pendingSessions}
      />

      {/* Calendar Interface */}
      <AttendanceCalendar
        sessions={sessions}
        batches={batches}
        onMarkAttendance={handleMarkAttendance}
      />
    </div>
  );
};