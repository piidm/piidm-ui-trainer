import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { Assignment, Batch, AssignmentSubmission } from '../../types';

interface StudentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  batch: Batch | undefined;
  onSubmit: (submission: Omit<AssignmentSubmission, 'id'>) => void;
  currentStudentId?: string;
}

export const StudentSubmissionModal: React.FC<StudentSubmissionModalProps> = ({ 
  isOpen, 
  onClose, 
  assignment, 
  batch,
  onSubmit,
  currentStudentId = '1' // Mock current student ID
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if current student has already submitted
  const existingSubmission = assignment.submissions.find(s => s.studentId === currentStudentId);
  const canSubmit = !existingSubmission && new Date(assignment.dueDate) > new Date();
  const isOverdue = new Date(assignment.dueDate) < new Date();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF, DOC, or DOCX file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !canSubmit) return;
    
    setIsSubmitting(true);
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const submission: Omit<AssignmentSubmission, 'id'> = {
      studentId: currentStudentId,
      studentName: 'John Doe', // Mock student name
      assignmentId: assignment.id,
      submittedAt: new Date().toISOString(),
      document: selectedFile.name, // Store filename in document field
      marks: 0, // Initial marks
      status: 'submitted',
      files: [{
        id: '1',
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile), // Mock URL
        type: selectedFile.type,
        size: selectedFile.size
      }]
    };
    
    onSubmit(submission);
    setIsSubmitting(false);
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
            <p className="text-gray-600">{batch?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Assignment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Assignment Details</h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              <pre className="whitespace-pre-wrap font-sans">{assignment.details}</pre>
            </div>
            
            <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {new Date(assignment.dueDate).toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Total Marks: {assignment.totalMarks}
              </div>
            </div>
          </div>

          {/* Submission Status */}
          {existingSubmission && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Submission Status</h3>
              </div>
              <p className="text-blue-800 mb-2">
                You have already submitted this assignment on {new Date(existingSubmission.submittedAt).toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">
                File: {existingSubmission.files?.[0]?.name || existingSubmission.document || 'Unknown file'}
              </p>
              
              {existingSubmission.status === 'reviewed' && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Graded: {existingSubmission.marks}/{assignment.totalMarks} 
                      ({Math.round((existingSubmission.marks! / assignment.totalMarks) * 100)}%)
                    </span>
                  </div>
                  {existingSubmission.feedback && (
                    <p className="text-green-700 text-sm mt-2">
                      <strong>Feedback:</strong> {existingSubmission.feedback}
                    </p>
                  )}
                </div>
              )}
              
              {existingSubmission.status === 'rejected' && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Submission Rejected</span>
                  </div>
                  {existingSubmission.feedback && (
                    <p className="text-red-700 text-sm mt-2">
                      <strong>Reason:</strong> {existingSubmission.feedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Overdue Warning */}
          {isOverdue && !existingSubmission && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Assignment Overdue</h3>
              </div>
              <p className="text-red-800 mt-1">
                The submission deadline has passed. You can no longer submit this assignment.
              </p>
            </div>
          )}

          {/* File Upload Section */}
          {canSubmit && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Submit Assignment</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm">
                  <strong>Supported formats:</strong> PDF, DOC, DOCX (Max size: 10MB)
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  You can only submit once before the deadline.
                </p>
              </div>

              {/* File Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : selectedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                    <p className="font-medium text-green-800">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">
                      Drag and drop your file here, or{' '}
                      <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile || isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Submit Assignment
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};