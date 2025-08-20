import React from 'react';
import { Users, UserCheck, UserX, TrendingUp, Calendar, Clock } from 'lucide-react';

interface AttendanceStatsProps {
  totalSessions: number;
  totalStudents: number;
  averageAttendance: number;
  todayAttendance: number;
  thisWeekSessions: number;
  pendingSessions: number;
}

export const AttendanceStats: React.FC<AttendanceStatsProps> = ({
  totalSessions,
  totalStudents,
  averageAttendance,
  todayAttendance,
  thisWeekSessions,
  pendingSessions
}) => {


  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalSessions}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Students</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalStudents}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Average Attendance</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{averageAttendance}%</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+2% from last month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Today's Attendance</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{todayAttendance}%</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">This Week Sessions</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{thisWeekSessions}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Pending Sessions</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{pendingSessions}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
            <UserX className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};