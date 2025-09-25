
import { AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Users } from 'lucide-react';
import { Assignment } from '../../types';

interface AssignmentDashboardProps {
  assignments: Assignment[];
}

// Helper to get assignment status (same as table logic)
function getAssignmentStatus(assignment: Assignment): 'active' | 'expired' {
  const now = new Date();
  const due = new Date(assignment.dueDate);
  return due < now ? 'expired' : 'active';
}

export const AssignmentDashboard: React.FC<AssignmentDashboardProps> = ({ assignments }) => {
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => getAssignmentStatus(a) === 'active').length;
  const expiredAssignments = assignments.filter(a => getAssignmentStatus(a) === 'expired').length;
  const totalSubmissions = assignments.reduce((acc, a) => acc + a.submissions.length, 0);
  const pendingReviews = assignments.reduce((acc, a) => acc + a.submissions.filter(s => s.status === 'submitted').length, 0);
  const reviewedSubmissions = assignments.reduce((acc, a) => acc + a.submissions.filter(s => s.status === 'reviewed').length, 0);
  const completionRate = totalSubmissions > 0 ? Math.round((reviewedSubmissions / totalSubmissions) * 100) : 0;
  const pendingRate = totalSubmissions > 0 ? Math.round((pendingReviews / totalSubmissions) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Assignments</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalAssignments}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Active Assignments</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{activeAssignments}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Expired Assignments</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{expiredAssignments}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalSubmissions}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Pending Reviews</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{pendingReviews}</p>
            <div className="flex items-center mt-2 text-sm text-orange-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>{pendingRate}% of submissions</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{completionRate}%</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{reviewedSubmissions} reviewed</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};