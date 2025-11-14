import React, { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AssignmentForm } from './AssignmentForm';
import { AssignmentList } from './AssignmentList';
import { SubmissionManagement } from './SubmissionManagement';
import { AssignmentDashboard } from './AssignmentDashboard';
import { useTrainerData } from '../../hooks/useTrainerData';
import { Assignment, Batch, Student } from '../../types';

export const Assignments: React.FC = () => {
  const {
    assignments,
    batches,
    allBatches,
    students,
    fetchAssignments,
    fetchBatches,
    fetchAllBatches,
    fetchStudents,
    fetchAllLectureTimes,
    fetchAssignmentSubmissions,
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
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchAssignments();
    fetchAllLectureTimes();
    fetchBatches();
    fetchAllBatches();
    fetchStudents();
    
    // Trigger a refresh of submission counts when component mounts
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleCreateAssignment = async (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    try {
      await addAssignment(assignmentData);
      await fetchAssignments();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleEditAssignment = async (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    if (editingAssignment) {
      try {
        await updateAssignment(editingAssignment.id, assignmentData);
        setEditingAssignment(null);
        setIsFormOpen(false);
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
    }
  };

  const handleReviewSubmission = (assignmentId: string, submissionId: string, reviewData: any) => {
    reviewSubmission(assignmentId, submissionId, reviewData);
  };

  const handleViewSubmissions = (assignment: Assignment, batch: Batch | null, students: Student[]) => {
    setSelectedAssignment(assignment);
    setSelectedBatch(batch);
    setSelectedStudents(students);
    setIsModalOpen(true);
  };

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    deleteAssignment(assignmentId);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAssignment(null);
  };

  const handleCloseSubmissionModal = () => {
    setIsSubmissionModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmissionUpdated = useCallback(() => {
    // Refresh assignments to update submission counts
    fetchAssignments();
    // Force AssignmentList to refresh by incrementing trigger
    setRefreshTrigger(prev => prev + 1);
  }, [fetchAssignments]);

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
      <AssignmentDashboard assignments={assignments} />

      {/* Assignment List */}
      <AssignmentList
        assignments={assignments}
        batches={batches}
        allBatches={allBatches}
        onViewSubmissions={handleViewSubmissions}
        onEditAssignment={handleEditClick}
        onDeleteAssignment={handleDeleteAssignment}
        refreshTrigger={refreshTrigger}
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
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assignment={selectedAssignment!}
          batch={selectedBatch || undefined}
          students={selectedStudents}
          onReviewSubmission={reviewSubmission}
          onBulkReview={bulkReviewSubmissions}
          onSubmissionUpdated={handleSubmissionUpdated}
        />
      )}
    </div>
  );
};