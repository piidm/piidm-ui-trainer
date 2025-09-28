import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Users, Monitor, Link2, Video, Edit } from 'lucide-react';
import { SessionForm } from './SessionForm';
import { useTrainerData } from '../../hooks/useTrainerData';
import { LiveSession } from '../../types';

export const LiveSessions: React.FC = () => {
  const { sessions, batches, allBatches, fetchBatches, fetchAllBatches, fetchSessions, addSession } = useTrainerData();

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      await fetchBatches(controller.signal);
      await fetchAllBatches(controller.signal);
      await fetchSessions(controller.signal);

    }, 500);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const upcomingSessions = filteredSessions.filter(session => {
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    return sessionDateTime > new Date();
  }).sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  const pastSessions = filteredSessions.filter(session => {
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    return sessionDateTime <= new Date();
  }).sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeB.getTime() - dateTimeA.getTime();
  });

  const handleJoinSession = (session: any) => {
    if (session.lectureLink) {
      window.open(session.lectureLink, '_blank');
    }
  };

  const handleScheduleSession = async (session: Omit<LiveSession, 'id'>) => {
    try {
      await addSession(session);
      await fetchSessions();
      setIsFormOpen(false);
    } catch (err) {
      alert("Failed to schedule session. Please check your network or backend.");
      setIsFormOpen(false); // Optionally close the form even on error
    }
  };

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


  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'classroom': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return Monitor;
      case 'hybrid': return Monitor;
      case 'classroom': return Users;
      default: return Users;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {

      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalStudentsByBatchId = (batchId: string) => {
    if (!batchId || !allBatches?.length) return 0;

    // Handle comma-separated IDs like "91,92"
    const ids = batchId.toString().replace(/[\[\]\s"]/g, "").split(",").filter(Boolean);

    // Sum totalStudents for all matching batches
    const total = ids.reduce((sum, id) => {
      const match = allBatches.find(b => b.id === id.toString());
      return sum + (match?.totalStudents || 0);
    }, 0);

    return total;
  };


  const SessionTable = ({ sessions, title }: { sessions: any[], title: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {title} ({sessions.length})
        </h3>
      </div>

      {sessions.length === 0 ? (
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No sessions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">


              {sessions.map((session) => {

                const ModeIcon = getModeIcon(session.mode);
                const isToday = session.date === new Date().toISOString().split('T')[0];
                const isUpcoming = new Date(`${session.date}T${session.time}`) > new Date();

                return (
                  <tr key={session.id} className="hover:bg-gray-50 transition-colors  ">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {session.topic}
                          </div>
                          {isToday && (
                            <div className="text-xs text-green-600 font-medium">Today's session!</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {session.displayTime || session.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getModeColor(session.mode)}`}>
                        <ModeIcon className="w-3 h-3" />
                        {session.mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {getBatchName(session.batchId).split("\n")
                          .map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </span>
                      <div className="text-xs text-gray-500">
                        {getTotalStudentsByBatchId(session.batchId)} Students
                      </div>

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.lectureLink ? (
                        <a
                          href={session.lectureLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Link2 className="w-4 h-4" />
                          Join Link
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No link</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        {isUpcoming && session.lectureLink && (
                          <button
                            onClick={() => handleJoinSession(session)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${isToday
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                          >
                            <Video className="w-3 h-3" />
                            {isToday ? 'Join Now' : 'Join'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Sessions</h2>
          <p className="text-gray-600">Schedule and manage your training sessions</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Schedule Session
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sessions</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Upcoming Sessions Table */}
      {upcomingSessions.length > 0 && (
        <SessionTable sessions={upcomingSessions} title="Upcoming Sessions" />
      )}

      {/* Past Sessions Table */}
      {pastSessions.length > 0 && (
        <SessionTable sessions={pastSessions} title="Past Sessions" />
      )}

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Schedule your first training session to get started'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule First Session
            </button>
          )}
        </div>
      )}

      {/* Session Form Modal */}
      <SessionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleScheduleSession}
        batches={batches}
      />
    </div>
  );
};