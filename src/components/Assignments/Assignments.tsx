import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AssignmentForm } from './AssignmentForm';
import { AssignmentList } from './AssignmentList';
import { SubmissionManagement } from './SubmissionManagement';
import { AssignmentDashboard } from './AssignmentDashboard';
import { useTrainerData } from '../../hooks/useTrainerData';
import { Assignment } from '../../types';

export const Assignments: React.FC = () => {
  const {
    assignments,
    batches,
    students,
    fetchAssignments,
    fetchBatches,
    fetchStudents,
    assignmentStats,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    reviewSubmission,
    bulkReviewSubmissions
  } = useTrainerData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);


  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetchAssignments(controller.signal);
      fetchBatches(controller.signal);
      fetchStudents(controller.signal);
    }, 500);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    }
  }, []);


  const handleCreateAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    addAssignment(assignmentData);
    // Show success notification
    console.log('Assignment created successfully!');
  };

  const handleEditAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, assignmentData);
      setEditingAssignment(null);
      // Show success notification
      console.log('Assignment updated successfully!');
    }
  };

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmissionModalOpen(true);
  };

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    deleteAssignment(assignmentId);
    // Show success notification
    console.log('Assignment deleted successfully!');
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAssignment(null);
  };

  const handleCloseSubmissionModal = () => {
    setIsSubmissionModalOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Assignment Management</h2>
          <p className="text-gray-600 mt-1">Create, manage, and review student assignments</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      {/* Dashboard Stats */}
      <AssignmentDashboard stats={assignmentStats} />

      {/* Assignment List */}
      <AssignmentList
        assignments={assignments}
        batches={batches}
        onViewSubmissions={handleViewSubmissions}
        onEditAssignment={handleEditClick}
        onDeleteAssignment={handleDeleteAssignment}
      />

      {/* Modals */}
      <AssignmentForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingAssignment ? handleEditAssignment : handleCreateAssignment}
        batches={batches}
        assignment={editingAssignment || undefined}
        isEditing={!!editingAssignment}
      />

      {selectedAssignment && (
        <SubmissionManagement
          isOpen={isSubmissionModalOpen}
          onClose={handleCloseSubmissionModal}
          assignment={selectedAssignment}
          batch={batches.find(b => b.id === selectedAssignment.batchId)}
          students={students}
          onReviewSubmission={reviewSubmission}
          onBulkReview={bulkReviewSubmissions}
        />
      )}
    </div>
  );
};