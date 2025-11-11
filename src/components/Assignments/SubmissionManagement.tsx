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

  const { refreshAssignmentSubmissions} = useTrainerData();

  // Add token for API calls
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MDkwfQ.C6BhLFFCetm_GBiklD-04t0nMBoPspl59tZED603vFE";

  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'reviewed' | 'rejected' | 'resubmitted'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [bulkSelectedIds, setBulkSelectedIds] = useState<Set<string>>(new Set());
  const [bulkReviewData, setBulkReviewData] = useState({
    action: 'accept' as 'accept' | 'reject',
    marks: 0,
    feedback: ''
  });
  const [showBulkReview, setShowBulkReview] = useState(false);
  const [isUpdatingSubmission, setIsUpdatingSubmission] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    marks: 0,
    feedback: '',
    action: 'accept' as 'accept' | 'reject'
  });


  // Local overrides so UI updates instantly (before parent/remote refresh)
  const [submissionOverrides, setSubmissionOverrides] = useState<Record<string, Partial<AssignmentSubmission>>>({});

  // Add effect to automatically refresh data when modal opens
  useEffect(() => {
    if (isOpen && assignment.id) {
      // Clear previous overrides when opening modal
      setSubmissionOverrides({});
      // Refresh assignment submissions data
      refreshAssignmentSubmissions(assignment.id);
    }
  }, [isOpen, assignment.id]); // Remove refreshAssignmentSubmissions from dependencies

  // Track assignment prop changes
  useEffect(() => {
    console.log('SubmissionManagement assignment prop changed:', {
      id: assignment.id,
      title: assignment.title,
      submissionsCount: assignment.submissions.length,
      submissionStatuses: assignment.submissions.map(s => ({id: s.id, status: s.status}))
    });
  }, [assignment]);

    // Add effect to automatically refresh data periodically while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (assignment.id) {
        refreshAssignmentSubmissions(assignment.id);
      }
    }, 10000); // Increase to 10 seconds to reduce API calls

    return () => clearInterval(interval);
  }, [isOpen, assignment.id]); // Remove refreshAssignmentSubmissions from dependencies

  const mergeSubmission = (sub: AssignmentSubmission | null) => {
    if (!sub) return null;
    const over = submissionOverrides[sub.id] || {};
    const merged = { ...sub, ...over } as any;
    
    // Normalize status from API response or overrides
    const s = merged.status;
    if (typeof s === 'number') {
      if (s === 0) merged.status = 'pending';
      else if (s === 1) merged.status = 'submitted';
      else if (s === 2) merged.status = 'rejected';
      else if (s === 3) merged.status = 'resubmitted';
    } else if (typeof s === 'string') {
      // Keep string status as is if it's already normalized
      if (['pending', 'submitted', 'reviewed', 'rejected', 'resubmitted'].includes(s)) {
        merged.status = s;
      } else {
        merged.status = 'pending';
      }
    }
    
    // If has marks but status is still submitted, mark as reviewed
    if (merged.marks && (merged.status === 'submitted' || merged.status === 1)) {
      merged.status = 'reviewed';
    }
    
    return merged as AssignmentSubmission;
  };

  // Sync assessment form with selected submission whenever it changes
  useEffect(() => {
    if (selectedSubmission) {
      const merged = mergeSubmission(selectedSubmission);
      if (merged) {
        setAssessmentData({
          marks: merged.marks || 0,
          feedback: merged.feedback || '',
          action: merged.status === 'reviewed' ? 'accept' : (merged.status === 'rejected' ? 'reject' : 'accept')
        });
      }
    }
  }, [selectedSubmission?.id, selectedSubmission?.status, selectedSubmission?.marks, selectedSubmission?.feedback]); // More specific dependencies

  // Add effect to update selectedSubmission when assignment submissions change
  useEffect(() => {
    if (selectedSubmission && assignment.submissions) {
      const updatedSubmission = assignment.submissions.find(
        sub => sub.id === selectedSubmission.id
      );
      if (updatedSubmission) {
        const merged = mergeSubmission(updatedSubmission);
        if (merged) {
          // Only update if there's a meaningful change
          const hasChanged = 
            merged.status !== selectedSubmission.status ||
            merged.marks !== selectedSubmission.marks ||
            merged.feedback !== selectedSubmission.feedback;
          
          if (hasChanged) {
            setSelectedSubmission(merged);
          }
        }
      }
    }
  }, [assignment.submissions, selectedSubmission?.id]); // Remove submissionOverrides from dependencies


  
  // Create a comprehensive list of all students with their submission status
  const studentSubmissions = useMemo(() => {
    // include overrides in deps so UI recalculates after we set them
    // Resolve primary batch id from assignment.batchId (handles "[...]" case)
    let assignmentBatchId = assignment.batchId;
    if (typeof assignmentBatchId === 'string' && assignmentBatchId.startsWith("[")) {
      try {
        const ids = JSON.parse(assignmentBatchId);
        assignmentBatchId = Array.isArray(ids) ? ids[0].toString() : assignmentBatchId;
      } catch {
        // keep original if parse fails
      }
    }

    // Get students from provided prop who belong to the assignment's batch
    const batchStudents = students.filter(student => (student.batchId ?? "").toString() === (assignmentBatchId ?? "").toString());

    // Map every student => attach submission if exists (apply local overrides)
    const mapped = batchStudents.map(student => {
      const studentIdStr = (student.id ?? "").toString().trim();
      const baseSubmission = (assignment.submissions || []).find(sub =>
        (sub.studentId ?? "").toString().trim() === studentIdStr
      ) || null;

      const submission = mergeSubmission(baseSubmission);
      const status = submission ? (submission.status ?? 'submitted') : 'pending';

      return {
        student,
        submission,
        status: status as 'pending' | 'submitted' | 'reviewed' | 'rejected' | 'resubmitted'
      };
    });

    return mapped;
  }, [students, assignment, submissionOverrides]);

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
    const rejected = studentSubmissions.filter(item => item.status === 'rejected').length;
    const resubmitted = studentSubmissions.filter(item => item.status === 'resubmitted').length;

    return { total, pending, submitted, reviewed, rejected, resubmitted };
  }, [studentSubmissions]);

  const handleAssessment = (submission: AssignmentSubmission) => {
    // Find the latest version of this submission from assignment.submissions
    const latestSubmission = assignment.submissions.find(
      sub => sub.id === submission.id
    ) || submission;
    
    // Ensure we use merged submission with latest data
    const merged = mergeSubmission(latestSubmission) || latestSubmission;
    setSelectedSubmission(merged);
    
    setAssessmentData({
      marks: merged.marks || 0,
      feedback: merged.feedback || '',
      action: merged.status === 'reviewed' ? 'accept' : (merged.status === 'rejected' ? 'reject' : 'accept')
    });
  };

  const submitAssessment = async () => {
    if (selectedSubmission) {
      setIsUpdatingSubmission(true);
      try {
        // Prepare API payload
        const payload = [{
          submission_id: parseInt(selectedSubmission.id),
          marks_obtained: assessmentData.action === 'accept' ? assessmentData.marks : 0,
          feedback: assessmentData.feedback,
          submission_status: assessmentData.action === 'accept' ? 1 : 2
        }];

        // Call API to update submission
        const response = await fetch(`https://64.227.150.234:3002/api/assignment/submission/update/${assignment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Failed to update submission: ${response.statusText}`);
        }

        await response.json();

        // Build override for immediate UI update
        const override: Partial<AssignmentSubmission> = {
          marks: assessmentData.action === 'accept' ? assessmentData.marks : 0,
          feedback: assessmentData.feedback,
          status: assessmentData.action === 'accept' ? 'reviewed' : 'rejected',
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Dr. Sarah Johnson'
        };
        
        // Apply override immediately
        setSubmissionOverrides(prev => ({ 
          ...prev, 
          [selectedSubmission.id]: { 
            ...(prev[selectedSubmission.id] || {}), 
            ...override 
          } 
        }));

        // Update selectedSubmission immediately with the new status
        const updatedSelectedSubmission = { 
          ...selectedSubmission, 
          ...override 
        } as AssignmentSubmission;
        setSelectedSubmission(updatedSelectedSubmission);

        // Update assessmentData to reflect the new status
        setAssessmentData(prev => ({
          ...prev,
          action: assessmentData.action // Keep the current action for form consistency
        }));

        // Call the original onReviewSubmission callback to update local state
        onReviewSubmission(assignment.id, selectedSubmission.id, {
          action: assessmentData.action,
          marks: assessmentData.action === 'accept' ? assessmentData.marks : 0,
          feedback: assessmentData.feedback
        });

        // Clear the local override since the assignment state is now updated
        setSubmissionOverrides(prev => {
          const next = { ...prev };
          delete next[selectedSubmission.id];
          return next;
        });

        // Refresh assignment data in background to sync with server
        refreshAssignmentSubmissions(assignment.id);

      } catch (error) {
        console.error('Error updating submission:', error);
        alert('Failed to update submission. Please try again.');
      } finally {
        setIsUpdatingSubmission(false);
      }
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
      .filter(item => item.submission && (item.status === 'submitted' || item.status === 'resubmitted'))
      .map(item => item.submission!.id);

    if (bulkSelectedIds.size === submittedSubmissions.length) {
      setBulkSelectedIds(new Set());
    } else {
      setBulkSelectedIds(new Set(submittedSubmissions));
    }
  };


  const submitBulkReview = async () => {
    setIsUpdatingSubmission(true);
    try {
      // Prepare API payload for bulk update
      const payload = Array.from(bulkSelectedIds).map(submissionId => ({
        submission_id: parseInt(submissionId),
        marks_obtained: bulkReviewData.action === 'accept' ? bulkReviewData.marks : 0,
        feedback: bulkReviewData.feedback,
        submission_status: bulkReviewData.action === 'accept' ? 1 : 2
      }));

      // Call API to update multiple submissions
      const response = await fetch(`https://64.227.150.234:3002/api/assignment/submission/update/${assignment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Failed to update submissions: ${response.statusText}`);
      }

      await response.json();

      // Refresh assignment data immediately to get latest submission status
      await refreshAssignmentSubmissions(assignment.id);

      // Call the original onBulkReview callback to update local state
      const reviews = Array.from(bulkSelectedIds).map(submissionId => ({
        assignmentId: assignment.id,
        submissionId,
        action: bulkReviewData.action,
        marks: bulkReviewData.action === 'accept' ? bulkReviewData.marks : 0,
        feedback: bulkReviewData.feedback
      }));

      onBulkReview(reviews);

      // apply local overrides so list & UI reflect bulk changes immediately
      setSubmissionOverrides(prev => {
        const next = { ...prev };
        Array.from(bulkSelectedIds).forEach(submissionId => {
          next[submissionId] = {
            ...(next[submissionId] || {}),
            marks: bulkReviewData.action === 'accept' ? bulkReviewData.marks : 0,
            feedback: bulkReviewData.feedback,
            status: bulkReviewData.action === 'accept' ? 'reviewed' : 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Dr. Sarah Johnson'
          };
        });
        return next;
      });

      // If currently selected submission was in bulk update, update it too
      if (selectedSubmission && bulkSelectedIds.has(selectedSubmission.id)) {
        const updatedSubmission: AssignmentSubmission = {
          ...selectedSubmission,
          marks: bulkReviewData.action === 'accept' ? bulkReviewData.marks : 0,
          feedback: bulkReviewData.feedback,
          status: bulkReviewData.action === 'accept' ? 'reviewed' : 'rejected',
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Dr. Sarah Johnson'
        };
        setSelectedSubmission(updatedSubmission);
      }

      // Clear local overrides for bulk updated submissions since assignment state is now updated
      setSubmissionOverrides(prev => {
        const next = { ...prev };
        Array.from(bulkSelectedIds).forEach(submissionId => {
          delete next[submissionId];
        });
        return next;
      });

      // Reset form
      setBulkSelectedIds(new Set());
      setShowBulkReview(false);
      setBulkReviewData({ action: 'accept', marks: 0, feedback: '' });

    } catch (error) {
      console.error('Error updating bulk submissions:', error);
      alert('Failed to update submissions. Please try again.');
    } finally {
      setIsUpdatingSubmission(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-orange-100 text-orange-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'resubmitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'submitted': return FileText;
      case 'reviewed': return Check;
      case 'rejected': return XCircle;
      case 'resubmitted': return FileText;
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

  // New helper: normalize files from submission object (files[], document array, or single document path)
  const getSubmissionFiles = (submission?: AssignmentSubmission | null) => {
    if (!submission) return [];
    const s: any = submission;

    // 1) Prefer explicit files array
    if (Array.isArray(s.files) && s.files.length > 0) {
      return s.files;
    }

    // 2) If document / documents field is an array of file-like objects
    const docArray = s.document || s.documents;
    if (Array.isArray(docArray) && docArray.length > 0) {
      return docArray.map((d: any, i: number) => ({
        id: (d.id ?? `doc-${submission.id}-${i}`).toString(),
        name: d.name || d.filename || `document-${i}`,
        url: d.url || d.path || d.document_url || '',
        type: d.type || 'application/octet-stream',
        size: d.size || 0,
      }));
    }

    // 3) Single document path fallback (string)
    const singleDoc = s.document || s.document_uploaded_path || s.documentUrl || s.url;
    if (typeof singleDoc === 'string' && singleDoc.trim()) {
      const name = s.document_filename || singleDoc.split('/').pop() || `document-${submission.id}`;
      return [{
        id: `doc-${submission.id}`,
        name,
        url: singleDoc,
        type: s.document_type || 'application/octet-stream',
        size: s.document_size || 0,
      }];
    }

    return [];
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
              onClick={(e) => {
                e.stopPropagation();
                // If review panel is open, close it first
                if (selectedSubmission) {
                  setSelectedSubmission(null);
                } else {
                  // If no review panel is open, close the main modal
                  onClose();
                }
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
              type="button"
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
                  { key: 'reviewed', label: 'Reviewed', count: stats.reviewed },
                  { key: 'rejected', label: 'Rejected', count: stats.rejected },
                  { key: 'resubmitted', label: 'Resubmitted', count: stats.resubmitted }
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
                {(filter === 'submitted' || filter === 'resubmitted') && (
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
                      Select All {filter === 'submitted' ? 'Submitted' : 'Resubmitted'}
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredSubmissions.map((item) => {
                    const StatusIcon = getStatusIcon(item.status);
                    const isSelected = item.submission && bulkSelectedIds.has(item.submission.id);

                    // console
                    return (
                      <div key={item.student.id} className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow ${isSelected ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Bulk Select Checkbox */}
                            {item.submission && (item.status === 'submitted' || item.status === 'resubmitted') && (
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
                            
                              {item.status === 'submitted' || item.status === 'reviewed' ? (
                                <>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      Submitted: {item.submission?.submittedAt ? new Date(item.submission.submittedAt).toLocaleString() : '—'}
                                    </div>
                                  </div>

                                  {/* Files */}
                                  <div className="mb-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted Files:</h4>
                                    <div className="space-y-1">
                                      {(() => {
                                        const files = getSubmissionFiles(item.submission);
                                        if (!files || files.length === 0) {
                                          return <div className="text-sm text-gray-500">No files uploaded</div>;
                                        }
                                        return files.map((file: any) => (
                                          <div key={file.id} className="flex items-center gap-2 text-sm">
                                            <FileText className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{file.name}</span>
                                            <span className="text-gray-500">({formatFileSize(file.size || 0)})</span>
                                            <button
                                              onClick={() => file?.url && window.open(file.url, '_blank')}
                                              className="text-blue-600 hover:text-blue-700 ml-auto"
                                            >
                                              <Download className="w-4 h-4" />
                                            </button>
                                          </div>
                                        ));
                                      })()}
                                    </div>
                                  </div>

                                  {item.submission?.status === 'reviewed' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-green-600" />
                                        <span className="font-medium text-green-800">
                                          Score: {item.submission?.marks}/{assignment.totalMarks} ({Math.round((item.submission.marks! / assignment.totalMarks) * 100)}%)
                                        </span>
                                      </div>
                                      {item.submission?.feedback && (
                                        <div className="flex items-start gap-2">
                                          <MessageSquare className="w-4 h-4 text-green-600 mt-0.5" />
                                          <p className="text-green-700 text-sm">{item.submission.feedback}</p>
                                        </div>
                                      )}
                                      <div className="text-xs text-green-600 mt-2">
                                        Reviewed on {new Date(item.submission?.reviewedAt!).toLocaleString()} by {item.submission.reviewedBy}
                                      </div>
                                    </div>
                                  )}
                                  {item.submission?.status === 'rejected' && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="w-4 h-4 text-red-600" />
                                        <span className="font-medium text-red-800">
                                          Rejected
                                        </span>
                                      </div>
                                      {item.submission?.feedback && (
                                        <div className="flex items-start gap-2">
                                          <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                                          <p className="text-red-700 text-sm">{item.submission.feedback}</p>
                                        </div>
                                      )}
                                      <div className="text-xs text-red-600 mt-2">
                                        Reviewed on {item.submission?.reviewedAt ? new Date(item.submission.reviewedAt).toLocaleString() : '—'} by {item.submission?.reviewedBy || '—'}
                                      </div>
                                    </div>
                                  )}
                                  {item.submission?.status === 'resubmitted' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium text-blue-800">
                                          Resubmitted
                                        </span>
                                      </div>
                                      <div className="text-xs text-blue-600 mt-2">
                                        Resubmitted on {item.submission?.submittedAt ? new Date(item.submission.submittedAt).toLocaleString() : '—'}
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (item.status === 'rejected' || item.status === 'resubmitted') ? (
                                <>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {item.status === 'rejected' ? 'Rejected:' : 'Resubmitted:'} {item.submission?.submittedAt ? new Date(item.submission.submittedAt).toLocaleString() : '—'}
                                    </div>
                                  </div>

                                  {/* Files */}
                                  <div className="mb-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted Files:</h4>
                                    <div className="space-y-1">
                                      {(() => {
                                        const files = getSubmissionFiles(item.submission);
                                        if (!files || files.length === 0) {
                                          return <div className="text-sm text-gray-500">No files uploaded</div>;
                                        }
                                        return files.map((file: any) => (
                                          <div key={file.id} className="flex items-center gap-2 text-sm">
                                            <FileText className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{file.name}</span>
                                            <span className="text-gray-500">({formatFileSize(file.size || 0)})</span>
                                            <button
                                              onClick={() => file?.url && window.open(file.url, '_blank')}
                                              className="text-blue-600 hover:text-blue-700 ml-auto"
                                            >
                                              <Download className="w-4 h-4" />
                                            </button>
                                          </div>
                                        ));
                                      })()}
                                    </div>
                                  </div>

                                  {item.status === 'rejected' && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="w-4 h-4 text-red-600" />
                                        <span className="font-medium text-red-800">
                                          Rejected
                                        </span>
                                      </div>
                                      {item.submission?.feedback && (
                                        <div className="flex items-start gap-2">
                                          <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                                          <p className="text-red-700 text-sm">{item.submission.feedback}</p>
                                        </div>
                                      )}
                                      <div className="text-xs text-red-600 mt-2">
                                        Reviewed on {item.submission?.reviewedAt ? new Date(item.submission.reviewedAt).toLocaleString() : '—'} by {item.submission?.reviewedBy || '—'}
                                      </div>
                                    </div>
                                  )}

                                  {item.status === 'resubmitted' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium text-blue-800">
                                          Resubmitted
                                        </span>
                                      </div>
                                      <div className="text-xs text-blue-600 mt-2">
                                        Resubmitted on {item.submission?.submittedAt ? new Date(item.submission.submittedAt).toLocaleString() : '—'}
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
                                    const filesToOpen = getSubmissionFiles(item.submission);
                                    filesToOpen.forEach((f: any) => f?.url && window.open(f.url, '_blank'));
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>

                                {(item.status === 'submitted' || item.status === 'resubmitted') && (
                                  <button
                                    onClick={() => handleAssessment(item.submission!)}
                                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                  >
                                    Review
                                  </button>
                                )}

                                {(item.status === 'reviewed' || item.status === 'rejected' || item.status === 'resubmitted') && (
                                  <button
                                    onClick={() => handleAssessment(item.submission!)}
                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                                    disabled={isUpdatingSubmission}
                                    type="button"
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Review Submission</h3>
                  <p className="text-gray-600">{selectedSubmission.studentName}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubmission(null);
                    setIsUpdatingSubmission(false); // Reset updating state
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {selectedSubmission.status === 'reviewed' && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ This submission has been reviewed
                </div>
              )}
              {selectedSubmission.status === 'rejected' && (
                <div className="mt-2 text-sm text-red-600">
                  ✕ This submission was rejected
                </div>
              )}
              {selectedSubmission.status === 'resubmitted' && (
                <div className="mt-2 text-sm text-blue-600">
                  ↻ This submission was resubmitted
                </div>
              )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubmission(null);
                    setIsUpdatingSubmission(false); // Reset updating state
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={submitAssessment}
                  disabled={isUpdatingSubmission}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    isUpdatingSubmission 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : assessmentData.action === 'accept'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                    }`}
                  type="button"
                >
                  {isUpdatingSubmission 
                    ? 'Updating...' 
                    : assessmentData.action === 'accept' ? 'Submit Review' : 'Reject Submission'}
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
                        className="mr-       2"
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
                  disabled={isUpdatingSubmission}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
                    isUpdatingSubmission 
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={submitBulkReview}
                  disabled={isUpdatingSubmission}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    isUpdatingSubmission
                      ? 'bg-gray-400 cursor-not-allowed'
                      : bulkReviewData.action === 'accept'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  {isUpdatingSubmission 
                    ? 'Updating...' 
                    : `Apply to ${bulkSelectedIds.size} Submissions`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};