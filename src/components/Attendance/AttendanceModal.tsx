import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Users,
  Clock,
  Calendar,
  MapPin,
  User,
  Check,
  CheckSquare,
  Square,
  Save,
  UserCheck,
} from "lucide-react";
import { LiveSession, Batch, Student } from "../../types";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: LiveSession;
  batch: Batch | undefined;
  onSaveAttendance: (
    sessionId: string,
    attendanceData: Array<{
      studentId: string;
      status: "present" | "absent";
    }>
  ) => void;
  canEdit: boolean;
}

interface StudentAttendance {
  studentId: string;
  studentName: string;
  attendanceId: number;
  status: "present" | "absent" | "no attendance";
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  session,
  batch,
  onSaveAttendance,
  canEdit,
}) => {
  const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingIds, setUpdatingIds] = useState<Record<number, boolean>>({});

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";


  // Mock students data - in real app, this would come from props or API

  // const mockStudents: Student[] = [
  //   { id: '1', name: 'John Doe', email: 'john@example.com', enrollmentDate: '2024-01-15', overallAttendance: 92, overallGrade: 85, batchId: '1' },
  //   { id: '2', name: 'Jane Smith', email: 'jane@example.com', enrollmentDate: '2024-01-15', overallAttendance: 88, overallGrade: 91, batchId: '1' },
  //   { id: '5', name: 'Alex Brown', email: 'alex@example.com', enrollmentDate: '2024-01-15', overallAttendance: 87, overallGrade: 89, batchId: '1' },
  //   { id: '6', name: 'Emily Davis', email: 'emily@example.com', enrollmentDate: '2024-01-15', overallAttendance: 94, overallGrade: 93, batchId: '1' },
  //   { id: '7', name: 'Michael Chen', email: 'michael@example.com', enrollmentDate: '2024-01-15', overallAttendance: 89, overallGrade: 87, batchId: '1' },
  //   { id: '8', name: 'Sarah Wilson', email: 'sarah.w@example.com', enrollmentDate: '2024-01-15', overallAttendance: 91, overallGrade: 90, batchId: '1' },
  //   { id: '9', name: 'David Rodriguez', email: 'david@example.com', enrollmentDate: '2024-01-15', overallAttendance: 85, overallGrade: 82, batchId: '1' },
  //   { id: '10', name: 'Lisa Thompson', email: 'lisa@example.com', enrollmentDate: '2024-01-15', overallAttendance: 96, overallGrade: 95, batchId: '1' },
  //   { id: '3', name: 'Mike Johnson', email: 'mike@example.com', enrollmentDate: '2024-02-01', overallAttendance: 95, overallGrade: 88, batchId: '2' },
  //   { id: '11', name: 'Anna Garcia', email: 'anna@example.com', enrollmentDate: '2024-02-01', overallAttendance: 92, overallGrade: 89, batchId: '2' },
  //   { id: '12', name: 'James Lee', email: 'james@example.com', enrollmentDate: '2024-02-01', overallAttendance: 88, overallGrade: 86, batchId: '2' },
  //   { id: '13', name: 'Maria Martinez', email: 'maria@example.com', enrollmentDate: '2024-02-01', overallAttendance: 90, overallGrade: 91, batchId: '2' },
  //   { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', enrollmentDate: '2024-01-20', overallAttendance: 90, overallGrade: 92, batchId: '3' },
  //   { id: '14', name: 'Robert Taylor', email: 'robert@example.com', enrollmentDate: '2024-01-20', overallAttendance: 87, overallGrade: 84, batchId: '3' },
  //   { id: '15', name: 'Jennifer White', email: 'jennifer@example.com', enrollmentDate: '2024-01-20', overallAttendance: 93, overallGrade: 88, batchId: '3' }
  // ];

  const [attendenceStudents, setattendenceStudents] = useState<any[]>([]);

  // Utility function to fetch and update attendance data
  const fetchAttendanceData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3002/api/lecture/attendance/" + Number(session.id), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setattendenceStudents(resData);
      // Update attendanceData state as well
      const batchStudents = resData.filter(
        (s: any) => Number(s.student.batch_id) === Number(session.batchId)
      );
      const initialData = batchStudents.map((s: any) => {
        let status: "present" | "absent" | "no attendance";
        if (s.attendance_status === 2) status = "present";
        else if (s.attendance_status === 1) status = "absent";
        else status = "no attendance";
        return {
          studentId: s.student.student_id,
          studentName: s.student.name,
          attendanceId: s.attendance_id,
          status
        };
      });
      setAttendanceData(initialData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAttendanceData();
    }
  }, [isOpen, session.id]);

  const batchStudents = useMemo(() => {
    return attendenceStudents.filter(
      (s) => Number(s.student.batch_id) === Number(session.batchId)
    );
  }, [attendenceStudents, session.batchId]);

  useEffect(() => {
    if (isOpen && batchStudents.length > 0) {
      const initialData = batchStudents.map((s) => {
        let status: "present" | "absent" | "no attendance";
        if (s.attendance_status === 2) status = "present";
        else if (s.attendance_status === 1) status = "absent";
        else status = "no attendance";
        return {
          studentId: s.student.student_id,
          studentName: s.student.name,
          attendanceId: s.attendance_id,
          status,
        };
      });

      // Only update state if the data has changed
      setAttendanceData((prevData) => {
        const isSameData = JSON.stringify(prevData) === JSON.stringify(initialData);
        return isSameData ? prevData : initialData;
      });
    }
  }, [isOpen, batchStudents]);

  // Initialize attendance data
  useEffect(() => {
    if (isOpen && batchStudents.length > 0) {
      const initialData = batchStudents.map((s) => {
        let status: "present" | "absent" | "no attendance";
        if (s.attendance_status === 2) status = "present";
        else if (s.attendance_status === 1) status = "absent";
        else status = "no attendance";
        return {
          studentId: s.student.student_id,
          studentName: s.student.name,
          attendanceId: s.attendance_id,
          status
        };
      });
      setAttendanceData(initialData);
    }
  }, [isOpen, session.batchId, batchStudents]);

  // Filter students based on search
  const filteredStudents = attendanceData.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  // adding attendance stats
  const totalStudents = attendanceData.length;
  const presentCount = attendanceData.filter(
    (student) => student.status === "present"
  ).length;
  const absentCount = totalStudents - presentCount;
  const attendancePercentage =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  const handleStatusChange = async (
    studentId: string,
    newStatus: "present" | "absent" | "no attendance"
  ) => {
    if (!canEdit) return;

    const student = attendanceData.find((s) => s.studentId === studentId);
    if (!student) return;
    if (student.status === newStatus) return;

    const attendanceId = student.attendanceId;
    if (attendanceId == null) return;
    if (updatingIds[attendanceId]) return;

    const prevStatus = student.status;
    const attendance_status =
      newStatus === "present" ? 2 : newStatus === "absent" ? 1 : 0;

    // Optimistic UI update
    setAttendanceData((prev) =>
      prev.map((s) =>
        s.studentId === studentId ? { ...s, status: newStatus } : s
      )
    );
    setUpdatingIds((prev) => ({ ...prev, [attendanceId]: true }));

    try {
      const res = await fetch(
        "http://127.0.0.1:3002/api/lecture/attendance/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attendance_id: attendanceId,
            attendance_status: attendance_status,
          }),
        }
      );

      const updatedRecord = await res.json();

      if (!res.ok) throw new Error(updatedRecord?.message || "Update failed");

      // ✅ Directly patch updated student in UI using API response
      setAttendanceData((prev) =>
        prev.map((s) =>
          s.attendanceId === attendanceId
            ? {
              ...s,
              status:
                updatedRecord.attendance_status === 2
                  ? "present"
                  : updatedRecord.attendance_status === 1
                    ? "absent"
                    : "no attendance",
            }
            : s
        )
      );

      // 🔄 Also re-fetch from backend after a short delay

    } catch (err) {
      console.error("Error updating status:", err);
      // Rollback
      setAttendanceData((prev) =>
        prev.map((s) =>
          s.studentId === studentId ? { ...s, status: prevStatus } : s
        )
      );
    } finally {
      setUpdatingIds((prev) => {
        const copy = { ...prev };
        delete copy[attendanceId];
        return copy;
      });
    }
  };




  const handleMarkAllPresent = () => {
    if (!canEdit) return;

    setAttendanceData((prev) =>
      prev.map((student) => ({
        ...student,
        status: "present" as "present" | "absent",
      }))
    );
  };

  const handleMarkAllAbsent = () => {
    if (!canEdit) return;

    setAttendanceData((prev) =>
      prev.map((student) => ({
        ...student,
        status: "absent" as "present" | "absent",
      }))
    );
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const attendanceToSave = attendanceData
        .filter((student) => student.status === "present" || student.status === "absent")
        .map((student) => ({
          studentId: student.studentId,
          status: student.status as "present" | "absent",
        }));

      onSaveAttendance(session.id, attendanceToSave);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Mark Attendance
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Session Info */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {session.topic}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>{batch?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>
                  {session.mode === "classroom"
                    ? "Classroom"
                    : session.mode === "online"
                      ? "Online"
                      : "Hybrid"}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalStudents}
              </div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {presentCount}
              </div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">
                {absentCount}
              </div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {attendancePercentage}%
              </div>
              <div className="text-sm text-gray-600">Attendance</div>
            </div>
          </div>

          {!canEdit && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Attendance editing is disabled. You can only edit attendance
                within 24 hours of the session.
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bulk Actions */}
            {canEdit && (
              <div className="flex gap-2">
                <button
                  onClick={handleMarkAllPresent}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Mark All Present
                </button>
                <button
                  onClick={handleMarkAllAbsent}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Mark All Absent
                </button>
              </div>
            )}
          </div>
        </div>


        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No students found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((student, index) => (
                <div
                  key={student.studentId}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${student.status === "present"
                    ? "bg-green-50 border-green-200"
                    : student.status === "absent"
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {student.studentName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Student ID: {student.studentId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Status Display */}
                    <select
                      value={
                        student.status === "present"
                          ? "2"
                          : student.status === "absent"
                            ? "1"
                            : "0"
                      }
                      onChange={async (e) => {
                        const newStatus =
                          e.target.value === "2"
                            ? "present"
                            : e.target.value === "1"
                              ? "absent"
                              : "no attendance";

                        // Optimistic update
                        setAttendanceData((prev) =>
                          prev.map((s) =>
                            s.studentId === student.studentId ? { ...s, status: newStatus } : s
                          )
                        );

                        // Build API payload in required array format
                        const payload = [
                          {
                            attendance_id: student.attendanceId,
                            attendance_status:
                              newStatus === "present" ? 2 : newStatus === "absent" ? 1 : 0,
                          },
                        ];

                        try {
                          await fetch("http://127.0.0.1:3002/api/lecture/attendance/update", {
                            method: "PUT", // If backend uses PUT/PATCH, change here
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          });

                          // Refresh list from GET API
                          const res = await fetch(
                            ` http://127.0.0.1:3002/api/lecture/attendance/${session.id}`,
                            {
                              headers: {
                                 method: "get", 
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          const updatedList = await res.json();
                          setattendenceStudents(updatedList);

                          const batchStudents = updatedList.filter(
                            (s: any) => Number(s.student.batch_id) === Number(session.batchId)
                          );
                          const mappedData = batchStudents.map((s: any) => ({
                            studentId: s.student.student_id,
                            studentName: s.student.name,
                            attendanceId: s.attendance_id,
                            status:
                              s.attendance_status === 2
                                ? "present"
                                : s.attendance_status === 1
                                  ? "absent"
                                  : "no attendance",
                          }));
                          setAttendanceData(mappedData);
                        } catch (err) {
                        }
                      }}
                    >
                      <option value="0">No Attendance</option>
                      <option value="1">Absent</option>
                      <option value="2">Present</option>
                    </select>

                    <div>
                      {student.status === "present"
                        ? "Present"
                        : student.status === "absent"
                          ? "Absent"
                          : "No Attendance"}
                    </div>

                    {/* Toggle Buttons */}
                    {canEdit && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(student.studentId, "present")
                          }
                          className={`p-2 rounded-lg transition-all ${student.status === "present"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-green-100"
                            }`}
                          title="Mark Present"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(student.studentId, "absent")
                          }
                          className={`p-2 rounded-lg transition-all ${student.status === "absent"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-red-100"
                            }`}
                          title="Mark Absent"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {presentCount} of {totalStudents} students marked present (
              {attendancePercentage}% attendance)
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              {canEdit && (
                <button
                  onClick={handleSaveAttendance}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Attendance
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3 text-green-600">
                <Check className="w-6 h-6" />
                <span className="font-medium">
                  Attendance saved successfully!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
