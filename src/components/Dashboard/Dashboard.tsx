import React, { useEffect } from 'react';
import { Users, Video, FileText, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TodaySchedule } from './TodaySchedule';
import { RecentActivity } from './RecentActivity';
import { useTrainerData } from '../../hooks/useTrainerData';

export default function Dashboard() {
  const { dashboardStats, sessions, batches, fetchStudents, fetchSessions, fetchBatches } = useTrainerData();

  useEffect(() => {
    fetchSessions();
    fetchBatches();
    fetchStudents();
  }, []);


  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Total Batches"
          value={dashboardStats.totalBatches}
          icon={Users}
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Students"
          value={dashboardStats.totalStudents}
          icon={Users}
          color="bg-emerald-500"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Today's Sessions"
          value={dashboardStats.todaySessions}
          icon={Video}
          color="bg-purple-500"
        />
        <StatsCard
          title="Pending Grading"
          value={dashboardStats.pendingGrading}
          icon={FileText}
          color="bg-orange-500"
        />
        <StatsCard
          title="Average Attendance"
          value={`${dashboardStats.averageAttendance}%`}
          icon={Calendar}
          color="bg-cyan-500"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Upcoming Exams"
          value={dashboardStats.upcomingExams}
          icon={GraduationCap}
          color="bg-pink-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodaySchedule sessions={sessions} batches={batches} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
            <Video className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-blue-700 group-hover:text-blue-800">Schedule Session</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors group">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span className="font-medium text-emerald-700 group-hover:text-emerald-800">Create Assignment</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-purple-700 group-hover:text-purple-800">Create Exam</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
            <Calendar className="w-6 h-6 text-orange-600" />
            <span className="font-medium text-orange-700 group-hover:text-orange-800">Mark Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};