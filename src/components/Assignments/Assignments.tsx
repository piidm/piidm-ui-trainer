import React, { useEffect, useState } from 'react';
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


  useEffect(() => {
    const controller = new AbortController();
    fetchAssignments(controller.signal);
    fetchAllLectureTimes(controller.signal);
    fetchBatches(controller.signal);
    fetchAllBatches(controller.signal);
    fetchStudents(controller.signal);
    // return () => {
    //   controller.abort();
    // }
  }, []);


  const handleCreateAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    addAssignment(assignmentData);
    fetchAssignments();
    setIsFormOpen(false);
    // Show success notification
  };

  const handleEditAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'submissions' | 'status'>) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, assignmentData);
      setEditingAssignment(null);
      // Show success notification
    }
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
    // Show success notification
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
      <AssignmentDashboard assignments={assignments} />

      {/* Assignment List */}
      <AssignmentList
        assignments={assignments}
        batches={batches}
        allBatches={allBatches}
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
         isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assignment={selectedAssignment!}
          batch={selectedBatch || undefined}
          students={selectedStudents}
          onReviewSubmission={reviewSubmission}
          onBulkReview={bulkReviewSubmissions}
        />
      )}
    </div>
  );
};