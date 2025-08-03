import React from 'react';
import { FileText, GraduationCap, Users, Calendar } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'assignment' | 'exam' | 'attendance' | 'batch';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'scheduled';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'Todo App Assignment',
    description: '15 new submissions received',
    timestamp: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    type: 'exam',
    title: 'React Fundamentals Assessment',
    description: 'Scheduled for tomorrow',
    timestamp: '4 hours ago',
    status: 'scheduled'
  },
  {
    id: '3',
    type: 'attendance',
    title: 'Batch A Attendance',
    description: 'Marked for today\'s session',
    timestamp: '6 hours ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'batch',
    title: 'New Student Enrolled',
    description: 'John Smith joined Batch C',
    timestamp: '1 day ago',
    status: 'completed'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'assignment': return FileText;
    case 'exam': return GraduationCap;
    case 'attendance': return Calendar;
    case 'batch': return Users;
    default: return FileText;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100';
    case 'pending': return 'text-orange-600 bg-orange-100';
    case 'scheduled': return 'text-blue-600 bg-blue-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 truncate">{activity.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
};