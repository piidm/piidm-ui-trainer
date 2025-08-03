import React, { useState } from 'react';
import { X, Download, FileText, Calendar, User, Star, MessageSquare, Check, XCircle, AlertCircle } from 'lucide-react';
import { Assignment, AssignmentSubmission, Batch } from '../../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  batch: Batch | undefined;
  onUpdateSubmission: (submissionId: string, updates: Partial<AssignmentSubmission>) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ 
  isOpen, 
  onClose, 
  assignment, 
  batch,
  onUpdateSubmission 
}) => {
  const [filter, setFilter] = useState<'all' | 'submitted' | 'assessed' | 'rejected'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [assessmentData, setAssessmentData] = useState({
    marks: 0,
    feedback: '',
    status: 'assessed' as 'assessed' | 'rejected'
  });

  const filteredSubmissions = assignment.submissions.filter(submission => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-orange-100 text-orange-800';
      case 'assessed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return AlertCircle;
      case 'assessed': return Check;
      case 'rejected': return XCircle;
      default: return FileText;
    }
  };

  const handleAssessment = (submission: AssignmentSubmission) => {
    setSelectedSubmission(submission);
    setAssessmentData({
      marks: submission.marks || 0,
      feedback: submission.feedback || '',
      status: submission.status === 'rejected' ? 'rejected' : 'assessed'
    });
  };

  const submitAssessment = () => {
    if (selectedSubmission) {
      onUpdateSubmission(selectedSubmission.id, {
        ...assessmentData,
        marks: assessmentData.status === 'rejected' ? 0 : assessmentData.marks
      });
      setSelectedSubmission(null);
      setAssessmentData({ marks: 0, feedback: '', status: 'assessed' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
              <p className="text-gray-600">{batch?.name} - {assignment.submissions.length} submissions</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              {[
                { key: 'all', label: 'All Submissions', count: assignment.submissions.length },
                { key: 'submitted', label: 'Pending Review', count: assignment.submissions.filter(s => s.status === 'submitted').length },
                { key: 'assessed', label: 'Assessed', count: assignment.submissions.filter(s => s.status === 'assessed').length },
                { key: 'rejected', label: 'Rejected', count: assignment.submissions.filter(s => s.status === 'rejected').length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-600">
                  {filter === 'all' ? 'No students have submitted yet' : `No ${filter} submissions`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => {
                  const StatusIcon = getStatusIcon(submission.status);
                  return (
                    <div key={submission.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5 text-gray-400" />
                              <span className="font-medium text-gray-900">{submission.studentName}</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                              <StatusIcon className="w-3 h-3" />
                              {submission.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Submitted: {new Date(submission.submittedAt).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {submission.fileName}
                            </div>
                          </div>

                          {submission.status === 'assessed' && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="w-4 h-4 text-green-600" />
                                <span className="font-medium text-green-800">
                                  Score: {submission.marks}/{assignment.totalMarks} ({Math.round((submission.marks! / assignment.totalMarks) * 100)}%)
                                </span>
                              </div>
                              {submission.feedback && (
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="w-4 h-4 text-green-600 mt-0.5" />
                                  <p className="text-green-700 text-sm">{submission.feedback}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {submission.status === 'rejected' && submission.feedback && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                                <p className="text-red-700 text-sm">{submission.feedback}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => window.open(submission.fileUrl, '_blank')}
                            className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          
                          {submission.status === 'submitted' && (
                            <button
                              onClick={() => handleAssessment(submission)}
                              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Assess
                            </button>
                          )}
                          
                          {submission.status === 'assessed' && (
                            <button
                              onClick={() => handleAssessment(submission)}
                              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                            >
                              Edit Assessment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Assessment Panel */}
        {selectedSubmission && (
          <div className="w-96 border-l bg-gray-50 flex flex-col">
            <div className="p-6 border-b bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Assessment</h3>
              <p className="text-gray-600">{selectedSubmission.studentName}</p>
            </div>

            <div className="flex-1 p-6 space-y-6">
              {/* Status Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Assessment Decision
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="assessed"
                      checked={assessmentData.status === 'assessed'}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, status: e.target.value as 'assessed' | 'rejected' }))}
                      className="mr-2"
                    />
                    <span className="text-green-700">Accept & Grade</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="rejected"
                      checked={assessmentData.status === 'rejected'}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, status: e.target.value as 'assessed' | 'rejected' }))}
                      className="mr-2"
                    />
                    <span className="text-red-700">Reject</span>
                  </label>
                </div>
              </div>

              {/* Marks Input */}
              {assessmentData.status === 'assessed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks (out of {assignment.totalMarks})
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={assignment.totalMarks}
                    value={assessmentData.marks}
                    onChange={(e) => setAssessmentData(prev => ({ ...prev, marks: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {assessmentData.status === 'assessed' ? 'Feedback' : 'Reason for Rejection'}
                </label>
                <textarea
                  value={assessmentData.feedback}
                  onChange={(e) => setAssessmentData(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={assessmentData.status === 'assessed' 
                    ? "Provide constructive feedback..." 
                    : "Explain why this submission is being rejected..."
                  }
                />
              </div>
            </div>

            <div className="p-6 border-t bg-white">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitAssessment}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    assessmentData.status === 'assessed'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {assessmentData.status === 'assessed' ? 'Submit Assessment' : 'Reject Submission'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};