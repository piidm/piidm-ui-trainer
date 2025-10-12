import React, { useState, useMemo, useEffect } from 'react';
import { X, Download, FileText, Calendar, User, Star, MessageSquare, Check, XCircle, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { Assignment, AssignmentSubmission, Batch, Student } from '../../types';
import { useTrainerData } from '../../hooks/useTrainerData';

interface SubmissionManagementProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  batch: Batch | undefined;
  students: Student[];
  onReviewSubmission: (assignmentId: string, submissionId: string, reviewData: {
    action: 'accept' | 'reject';
    marks?: number;
    feedback: string;
  }) => void;
  onBulkReview: (reviews: Array<{
    assignmentId: string;
    submissionId: string;
    action: 'accept' | 'reject';
    marks?: number;
    feedback: string;
  }>) => void;
}

export const SubmissionManagement: React.FC<SubmissionManagementProps> = ({
  isOpen,
  onClose,
  assignment,
  batch,
  students,
  onReviewSubmission,
  onBulkReview
}) => {

  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'reviewed'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [bulkSelectedIds, setBulkSelectedIds] = useState<Set<string>>(new Set());
  const [bulkReviewData, setBulkReviewData] = useState({
    action: 'accept' as 'accept' | 'reject',
    marks: 0,
    feedback: ''
  });
  const [showBulkReview, setShowBulkReview] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    marks: 0,
    feedback: '',
    action: 'accept' as 'accept' | 'reject'
  });

  // Create a comprehensive list of all students with their submission status
  const studentSubmissions = useMemo(() => {

    let assignmentBatchId = assignment.batchId;
    if (assignmentBatchId.startsWith("[")) {
      try {
        const ids = JSON.parse(assignmentBatchId);
        assignmentBatchId = Array.isArray(ids) ? ids[0].toString() : assignmentBatchId;
      } catch {
      }
    }

    // ✅ Use assignment.submissions as the primary source
    const result = assignment.submissions.map(submission => {
      // Find matching student data if available
      const matchingStudent = students.find(s => s.id === submission.studentId);
      
      const student: Student = matchingStudent || {
        id: submission.studentId,
        name: submission.studentName,
        email: "N/A",
        batchId: assignmentBatchId,
        enrollmentDate: "N/A",
        overallAttendance: 0,
        overallGrade: submission.marks || 0,
        assignment: "N/A",
        exam: "N/A",
        certificate: "Pending",
        mockInterview: "Not Attempted",
        placementStatus: "Not Placed",
      };

    

      return {
        student,
        submission: submission, // ✅ Direct submission object from assignment
        status: submission.status as 'pending' | 'submitted' | 'reviewed'
      };
    });

    console.log("🟣 [MODAL] Final studentSubmissions:", result);
    return result;
  }, [students, assignment]);

  const filteredSubmissions = useMemo(() => {
    return studentSubmissions.filter(item => {
      if (filter === 'all') return true;
      return item.status === filter;
    });
  }, [studentSubmissions, filter]);

  const stats = useMemo(() => {
    const total = studentSubmissions.length;
    const pending = studentSubmissions.filter(item => item.status === 'pending').length;
    const submitted = studentSubmissions.filter(item => item.status === 'submitted').length;
    const reviewed = studentSubmissions.filter(item => item.status === 'reviewed').length;

    return { total, pending, submitted, reviewed };
  }, [studentSubmissions]);


  const handleAssessment = (submission: AssignmentSubmission) => {
    setSelectedSubmission(submission);
    setAssessmentData({
      marks: submission.marks || 0,
      feedback: submission.feedback || '',
      action: submission.status === 'reviewed' ? 'accept' : 'accept'
    });
  };

  const submitAssessment = () => {
    if (selectedSubmission) {
      onReviewSubmission(assignment.id, selectedSubmission.id, {
        action: assessmentData.action,
        marks: assessmentData.action === 'accept' ? assessmentData.marks : 0,
        feedback: assessmentData.feedback
      });
      setSelectedSubmission(null);
      setAssessmentData({ marks: 0, feedback: '', action: 'accept' });
    }
  };

  const handleBulkSelect = (submissionId: string) => {
    const newSelected = new Set(bulkSelectedIds);
    if (newSelected.has(submissionId)) {
      newSelected.delete(submissionId);
    } else {
      newSelected.add(submissionId);
    }
    setBulkSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    const submittedSubmissions = filteredSubmissions
      .filter(item => item.submission && item.status === 'submitted')
      .map(item => item.submission!.id);

    if (bulkSelectedIds.size === submittedSubmissions.length) {
      setBulkSelectedIds(new Set());
    } else {
      setBulkSelectedIds(new Set(submittedSubmissions));
    }
  };

  console.log("filteredSubmissions:", filteredSubmissions);

  const submitBulkReview = () => {
    const reviews = Array.from(bulkSelectedIds).map(submissionId => ({
      assignmentId: assignment.id,
      submissionId,
      action: bulkReviewData.action,
      marks: bulkReviewData.action === 'accept' ? bulkReviewData.marks : 0,
      feedback: bulkReviewData.feedback
    }));

    onBulkReview(reviews);
    setBulkSelectedIds(new Set());
    setShowBulkReview(false);
    setBulkReviewData({ action: 'accept', marks: 0, feedback: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-orange-100 text-orange-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'submitted': return FileText;
      case 'reviewed': return Check;
      default: return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
              <p className="text-gray-600">{batch?.name} - {stats.total} students</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats and Filters */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.submitted}</div>
                <div className="text-sm text-gray-600">Submitted</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.reviewed}</div>
                <div className="text-sm text-gray-600">Reviewed</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Filter:</span>
                {[
                  { key: 'all', label: 'All Students', count: stats.total },
                  { key: 'pending', label: 'Pending', count: stats.pending },
                  { key: 'submitted', label: 'Submitted', count: stats.submitted },
                  { key: 'reviewed', label: 'Reviewed', count: stats.reviewed }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>

              {bulkSelectedIds.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{bulkSelectedIds.size} selected</span>
                  <button
                    onClick={() => setShowBulkReview(true)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Bulk Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submissions List */}
          <div className="flex-1 overflow-y-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-600">
                  {filter === 'all' ? 'No students in this batch' : `No ${filter} submissions`}
                </p>
              </div>
            ) : (
              <div className="p-6">
                {/* Bulk Select Header */}
                {filter === 'submitted' && (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
                    >
                      {bulkSelectedIds.size === filteredSubmissions.filter(item => item.submission).length ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      Select All Submitted
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredSubmissions.map((item) => {
                    const StatusIcon = getStatusIcon(item.status);
                    const isSelected = item.submission && bulkSelectedIds.has(item.submission.id);

                    // console.log("filteredSubmissions",filteredSubmissions);
                    return (
                      <div key={item.student.id} className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow ${isSelected ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Bulk Select Checkbox */}
                            {item.submission && item.status === 'submitted' && (
                              <button
                                onClick={() => handleBulkSelect(item.submission!.id)}
                                className="mt-1"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                )}
                              </button>
                            )}

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <User className="w-5 h-5 text-gray-400" />
                                  <span className="font-medium text-gray-900">{item.student.name}</span>
                                  <span className="text-sm text-gray-500">({item.student.email})</span>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {item.status}
                                </span>
                              </div>
                            
                              {item.submission ? (
                                <>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      Submitted: {new Date(item.submission.submittedAt).toLocaleString()}
                                    </div>
                                  </div>

                                  {/* Files */}
                                  <div className="mb-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted Files:</h4>
                                    <div className="space-y-1">
                                      
                                        <div className="flex items-center gap-2 text-sm">
                                          <FileText className="w-4 h-4 text-gray-400" />
                                          <span className="text-gray-700">{item.submission.document}</span>
                                          <button
                                            onClick={() => window.open(item.submission.document, '_blank')}
                                            className="text-blue-600 hover:text-blue-700 ml-auto"
                                          >
                                            <Download className="w-4 h-4" />
                                          </button>
                                        </div>
                                     
                                    </div>
                                  </div>

                                  {item.submission.status === 'reviewed' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-green-600" />
                                        <span className="font-medium text-green-800">
                                          Score: {item.submission.marks}/{assignment.totalMarks} ({Math.round((item.submission.marks! / assignment.totalMarks) * 100)}%)
                                        </span>
                                      </div>
                                      {item.submission.feedback && (
                                        <div className="flex items-start gap-2">
                                          <MessageSquare className="w-4 h-4 text-green-600 mt-0.5" />
                                          <p className="text-green-700 text-sm">{item.submission.feedback}</p>
                                        </div>
                                      )}
                                      <div className="text-xs text-green-600 mt-2">
                                        Reviewed on {new Date(item.submission.reviewedAt!).toLocaleString()} by {item.submission.reviewedBy}
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-sm text-gray-500 italic">
                                  No submission yet
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {item.submission && (
                              <>
                                <button
                                  onClick={() => {
                                    item.submission?.files.forEach(file => {
                                      window.open(file.url, '_blank');
                                    });
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>

                                {item.status === 'submitted' && (
                                  <button
                                    onClick={() => handleAssessment(item.submission!)}
                                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                  >
                                    Review
                                  </button>
                                )}

                                {item.status === 'reviewed' && (
                                  <button
                                    onClick={() => handleAssessment(item.submission!)}
                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                                  >
                                    Edit Review
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assessment Panel */}
        {selectedSubmission && (
          <div className="w-96 border-l bg-gray-50 flex flex-col">
            <div className="p-6 border-b bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Review Submission</h3>
              <p className="text-gray-600">{selectedSubmission.studentName}</p>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Action Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Review Decision
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="action"
                      value="accept"
                      checked={assessmentData.action === 'accept'}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, action: e.target.value as 'accept' | 'reject' }))}
                      className="mr-2"
                    />
                    <span className="text-green-700">Accept & Grade</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="action"
                      value="reject"
                      checked={assessmentData.action === 'reject'}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, action: e.target.value as 'accept' | 'reject' }))}
                      className="mr-2"
                    />
                    <span className="text-red-700">Reject</span>
                  </label>
                </div>
              </div>

              {/* Marks Input */}
              {assessmentData.action === 'accept' && (
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
                  {assessmentData.action === 'accept' ? 'Feedback' : 'Reason for Rejection'}
                </label>
                <textarea
                  value={assessmentData.feedback}
                  onChange={(e) => setAssessmentData(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={assessmentData.action === 'accept'
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
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${assessmentData.action === 'accept'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  {assessmentData.action === 'accept' ? 'Submit Review' : 'Reject Submission'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Review Modal */}
        {showBulkReview && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Bulk Review</h3>
                <p className="text-gray-600">Review {bulkSelectedIds.size} submissions</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bulkAction"
                        value="accept"
                        checked={bulkReviewData.action === 'accept'}
                        onChange={(e) => setBulkReviewData(prev => ({ ...prev, action: e.target.value as 'accept' | 'reject' }))}
                        className="mr-2"
                      />
                      <span className="text-green-700">Accept & Grade</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bulkAction"
                        value="reject"
                        checked={bulkReviewData.action === 'reject'}
                        onChange={(e) => setBulkReviewData(prev => ({ ...prev, action: e.target.value as 'accept' | 'reject' }))}
                        className="mr-2"
                      />
                      <span className="text-red-700">Reject</span>
                    </label>
                  </div>
                </div>

                {bulkReviewData.action === 'accept' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marks (out of {assignment.totalMarks})
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={assignment.totalMarks}
                      value={bulkReviewData.marks}
                      onChange={(e) => setBulkReviewData(prev => ({ ...prev, marks: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {bulkReviewData.action === 'accept' ? 'Feedback' : 'Reason'}
                  </label>
                  <textarea
                    value={bulkReviewData.feedback}
                    onChange={(e) => setBulkReviewData(prev => ({ ...prev, feedback: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={bulkReviewData.action === 'accept'
                      ? "Feedback for all selected submissions..."
                      : "Reason for rejecting all selected submissions..."
                    }
                  />
                </div>
              </div>

              <div className="p-6 border-t flex gap-3">
                <button
                  onClick={() => setShowBulkReview(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBulkReview}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${bulkReviewData.action === 'accept'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  Apply to {bulkSelectedIds.size} Submissions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};