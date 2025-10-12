import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Calendar, Users, FileText, Eye, Edit, Trash2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { AllBatches, Assignment, Batch, Student, AssignmentSubmission } from '../../types';
import { useTrainerData } from '../../hooks/useTrainerData';

interface AssignmentListProps {
  assignments: Assignment[];
  batches: Batch[];
  allBatches: AllBatches[];
  onViewSubmissions: (assignment: Assignment, batch: Batch | null, students: Student[]) => void;
  onEditAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
}

export const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  batches,
  allBatches,
  onViewSubmissions,
  onEditAssignment,
  onDeleteAssignment
}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'dueDate' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { fetchBatchById, fetchAssignmentSubmissions} = useTrainerData();


  const getAssignmentStatus = (assignment: Assignment) => {
    const now = new Date();
    const due = new Date(assignment.dueDate);

    if (assignment.status === "draft") {
      return "draft";
    }

    return due >= now ? "active" : "expired";
  };


  // Helper to check batch filter
  const matchesBatchFilter = (assignmentBatchId: string, selectedBatch: string) => {
    if (selectedBatch === 'all') return true;
    // If batchId is a stringified array, e.g. '[1,2,3]'
    if (assignmentBatchId.startsWith('[')) {
      try {
        const ids = JSON.parse(assignmentBatchId);
        // Ensure all ids are strings for comparison
        return Array.isArray(ids) && ids.map(String).includes(selectedBatch);
      } catch {
        // fallback: try substring match
        return assignmentBatchId.includes(selectedBatch);
      }
    }
    // Otherwise, direct match (as string)
    return assignmentBatchId.toString() === selectedBatch;
  };

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBatch = matchesBatchFilter(assignment.batchId, filterBatch);
      const status = getAssignmentStatus(assignment);
      const matchesStatus = filterStatus === 'all' || status === filterStatus;
      return matchesSearch && matchesBatch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [assignments, searchTerm, filterBatch, filterStatus, sortBy, sortOrder]);


  const paginatedAssignments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedAssignments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedAssignments, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedAssignments.length / itemsPerPage);

  const getBatchName = (batchId: string) => {
    if (!batchId) return "Unknown Batch";

    try {
      //Clean and split the comma-separated string
      const ids = batchId
        .toString()
        .replace(/[\[\]\s"]/g, "") // remove [ ], spaces, and quotes
        .split(",")
        .filter(Boolean);
      if (!ids.length) return "Unknown Batch";

      const names = ids
        .map((id) => {
          const batch = allBatches.find((b) => b.id === id.toString());
          return batch?.name || null;
        })
        .filter(Boolean);
      return names.length > 0 ? names.join(",\n ") : "Unknown Batch";
    } catch (err) {
      console.error("Batch name error:", err);
      return "Unknown Batch";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: 'title' | 'dueDate' | 'createdAt') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteClick = (assignment: Assignment) => {
    if (window.confirm(`Are you sure you want to delete "${assignment.title}"? This action cannot be undone.`)) {
      onDeleteAssignment(assignment.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header with Filters */}
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Batches</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id.toString()}>{batch.name}</option>
                ))}
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {paginatedAssignments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-600">
            {searchTerm || filterBatch !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first assignment to get started'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center gap-1">
                      Assignment Title
                      {sortBy === 'title' && (
                        <span className="text-blue-500">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('dueDate')}
                  >
                    <div className="flex items-center gap-1">
                      Due Date
                      {sortBy === 'dueDate' && (
                        <span className="text-blue-500">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {paginatedAssignments.map((assignment) => {
                  const submittedCount = assignment.submissions.length;
                  const pendingCount = assignment.submissions.filter(s => s.status === 'submitted').length;
                  const reviewedCount = assignment.submissions.filter(s => s.status === 'reviewed').length;

                  return (
                    <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {assignment.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            Created {new Date(assignment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          <span>
                          {getBatchName(assignment.batchId).split("\n")
                          .map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                          </span>
                           
                          
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(assignment.dueDate).toLocaleDateString()}
                          <div className="text-xs text-gray-500 ml-2">
                            {new Date(assignment.dueDate).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FileText className="w-4 h-4 mr-2 text-gray-400" />
                          {assignment.totalMarks}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const status = getAssignmentStatus(assignment);
                          return (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                              {status}
                            </span>
                          );
                        })()}

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{submittedCount}</span>
                            <span className="text-gray-500">total</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {pendingCount} pending, {reviewedCount} reviewed
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              try {
                                
                                // 1. Resolve batchId
                                let batchId = assignment.batchId;
                                console.log("🔵 [VIEW] Raw batchId:", batchId);
                                
                                if (batchId.startsWith("[")) {
                                  try {
                                    const ids = JSON.parse(batchId);
                                    batchId = Array.isArray(ids) ? ids[0].toString() : batchId;
                                    console.log("🔵 [VIEW] Parsed batchId:", batchId);
                                  } catch (e) {
                                    console.error("🔴 [VIEW] Failed to parse batchId:", e);
                                  }
                                }
                          
                                // 2. Fetch batch
                                const batchData = await fetchBatchById(batchId);
                                console.log("🔵 [VIEW] Fetched batch data:", batchData);
                                
                                const batch: Batch | null = batchData ? {
                                  id: batchData.batch_id?.toString() || batchId,
                                  length: 1,
                                  name: batchData.name || `Batch ${batchData.batch_num || "Unknown"}`,
                                  timing: batchData.batch_time?.name || "Unknown" as any,
                                  students: [],
                                  courseMode: "online",
                                  startDate: batchData.batch_date || batchData.start_date || "1970-01-01",
                                  endDate: batchData.batch_date || batchData.end_date || "1970-01-01",
                                  courseTitle: batchData.course?.name || `Course #${batchData.course_id}`,
                                  totalStudents: batchData.seats_occupied || batchData.total_seats || 0,
                                  isActive: batchData.deleted === 0 || batchData.is_active !== false,
                                } : null;
                          
                                console.log("🔵 [VIEW] Transformed batch:", batch);
                          
                                // 3. Fetch submissions
                                const submissions = await fetchAssignmentSubmissions(assignment.id);
                                console.log("🔵 [VIEW] Fetched submissions from API:", submissions);
                                console.log("🔵 [VIEW] Submissions count:", Array.isArray(submissions) ? submissions.length : 0);
                              
                                // 4. Transform API submissions into AssignmentSubmission[] format
                                const assignmentSubmissions: AssignmentSubmission[] = Array.isArray(submissions) 
                                  ? submissions
                                      .filter((s: any) => s && s.student)
                                      .map((s: any) => {
                                        const submission: AssignmentSubmission = {
                                          id: s.submission_id?.toString() || `sub-${s.student?.student_id}`,
                                          studentId: String(s.student?.student_id || ""),
                                          studentName: s.student?.name || "Unnamed Student",
                                          assignmentId: assignment.id,
                                          submittedAt: s.updated_at || "",
                                          status: s.submission_status === 1 ? "submitted" : s.marks_obtained ? "reviewed" : "pending",
                                          marks: s.marks_obtained || undefined,
                                          feedback: s.feedback || undefined,
                                          reviewedAt: s.updated_at || undefined,
                                          reviewedBy: s.reviewed_by || undefined,
                                          document: s.document_uploaded_path || "https://drive.google.com/file/d/1CNCKZBogTHvySBn8CuuIhiYcmYdjVsRo/view?usp=sharing" || undefined,
                                        };
                                        return submission;
                                      })
                                  : [];
                          
                          
                                // 5. Create updated assignment with merged submissions
                                const updatedAssignment: Assignment = {
                                  ...assignment,
                                  submissions: assignmentSubmissions,
                                };
                          
                          
                                // 6. Transform submissions into Student[] for compatibility
                                const students = assignmentSubmissions.map((sub) => ({
                                  id: sub.studentId,
                                  name: sub.studentName,
                                  email: "", // Email not available in submission data
                                  batchId: batchId,
                                  enrollmentDate: "N/A",
                                  overallAttendance: 0,
                                  overallGrade: sub.marks || 0,
                                  assignment: "N/A",
                                  exam: "N/A",
                                  certificate: "Pending",
                                  mockInterview: "Not Attempted",
                                  placementStatus: "Not Placed",
                                }));
                          
                                // 7. Pass updated assignment with full submission data
                                onViewSubmissions(updatedAssignment, batch, students);
                              } catch (error) {
                                onViewSubmissions(assignment, null, []);
                              }
                            }}
                          
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                          >
                            <Eye className="w-3 h-3" />
                            View {submittedCount}
                          </button>

                          <div className="relative">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === assignment.id ? null : assignment.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeDropdown === assignment.id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <button
                                  onClick={() => {
                                    onEditAssignment(assignment);
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="w-3 h-3" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteClick(assignment);
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedAssignments.length)} of {filteredAndSortedAssignments.length} assignments
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};