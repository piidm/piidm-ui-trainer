import React from 'react';
import { Calendar, Users, FileText, Clock, CheckCircle, AlertCircle, Eye, Edit } from 'lucide-react';
import { Assignment, Batch } from '../../types';

interface AssignmentCardProps {
  assignment: Assignment;
  batch: Batch | undefined;
  onViewSubmissions?: (assignment: Assignment) => void;
  onEdit?: (assignment: Assignment) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment, 
  batch, 
  onViewSubmissions, 
  onEdit 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isDueToday = new Date(assignment.dueDate).toDateString() === new Date().toDateString();
  const isOverdue = new Date(assignment.dueDate) < new Date();
  
  const submittedCount = assignment.submissions.length;
  const reviewedCount = assignment.submissions.filter(s => s.status === 'reviewed').length;
  const pendingCount = assignment.submissions.filter(s => s.status === 'submitted').length;
  const rejectedCount = assignment.submissions.filter(s => s.status === 'rejected').length;

  const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{assignment.details.substring(0, 150)}...</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-red-500" />
                <span className={isDueToday ? 'text-red-600 font-medium' : isOverdue ? 'text-red-500' : ''}>
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(assignment.dueDate).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {assignment.totalMarks} marks
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
              {batch && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                  {batch.name}
                </span>
              )}
            </div>

            {/* Due Date Warning */}
            {!isOverdue && daysUntilDue <= 3 && (
              <div className="flex items-center gap-1 text-orange-600 text-sm font-medium mb-2">
                <AlertCircle className="w-4 h-4" />
                {isDueToday ? 'Due today!' : `Due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}`}
              </div>
            )}

            {isOverdue && (
              <div className="flex items-center gap-1 text-red-600 text-sm font-medium mb-2">
                <AlertCircle className="w-4 h-4" />
                Overdue
              </div>
            )}
          </div>
        </div>

        {/* Submission Stats */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Submission Status</h4>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">{submittedCount}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">{pendingCount}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{reviewedCount}</div>
              <div className="text-xs text-gray-600">Reviewed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{rejectedCount}</div>
              <div className="text-xs text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            Created {new Date(assignment.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(assignment)}
                className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
            {onViewSubmissions && (
              <button
                onClick={() => onViewSubmissions(assignment)}
                className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Submissions ({submittedCount})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};