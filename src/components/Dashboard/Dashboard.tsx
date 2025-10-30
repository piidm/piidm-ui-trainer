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


  function load_prerequisite_data() {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MDkwfQ.C6BhLFFCetm_GBiklD-04t0nMBoPspl59tZED603vFE');
    // Retreive dependent data through Endpoints
    let BASE_URL = "https://64.227.150.234:3002/api/";
    let display_objects = ['course', 'course_mode', 'branch', 'batch_time', 'source', 'payment_mode', 'trainer', 'country', 'state', 'city', 'agent', 'batch'];
    $.each(display_objects, function (index, display_obj) {
      $.ajax({
        type: "GET",
        async: false,
        url: BASE_URL + `${display_obj}/all `,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
          if (display_obj == 'course') { localStorage.setItem('course_obj', JSON.stringify(response)) }
          if (display_obj == 'course_mode') { localStorage.setItem('course_mode_obj', JSON.stringify(response)) }
          if (display_obj == 'branch') { localStorage.setItem('branch_obj', JSON.stringify(response)) }
          if (display_obj == 'batch_time') { localStorage.setItem('batch_time_obj', JSON.stringify(response)) }
          if (display_obj == 'batch') { localStorage.setItem('batch_obj', JSON.stringify(response)) }
          if (display_obj == 'source') { localStorage.setItem('source_obj', JSON.stringify(response)) }
          if (display_obj == 'payment_mode') { localStorage.setItem('payment_mode_obj', JSON.stringify(response)) }
          if (display_obj == 'trainer') { localStorage.setItem('trainer_obj', JSON.stringify(response)) }
          if (display_obj == 'country') { localStorage.setItem('country_obj', JSON.stringify(response)) }
          if (display_obj == 'state') { localStorage.setItem('state_obj', JSON.stringify(response)) }
          if (display_obj == 'city') { localStorage.setItem('city_obj', JSON.stringify(response)) }
          if (display_obj == 'agent') { localStorage.setItem('agent_obj', JSON.stringify(response)) }

        },

        error: function (response) {
          console.error("Error:", response);
        }

      });
    });
  }

  load_prerequisite_data();


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