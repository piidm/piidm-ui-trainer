import React from 'react';
import { Calendar, Clock, Users, Video, Link2, Monitor } from 'lucide-react';
import { LiveSession, Batch } from '../../types';

interface SessionCardProps {
  session: LiveSession;
  batch: Batch | undefined;
  onJoin?: (session: LiveSession) => void;
  onEdit?: (session: LiveSession) => void;
  
}


export const SessionCard: React.FC<SessionCardProps> = ({ session, batch, onJoin, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const isUpcoming = new Date(`${session.date}T${session.time}`) > new Date();
  const isToday = session.date === new Date().toISOString().split('T')[0];
  const ModeIcon = getModeIcon(session.mode);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.topic}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(session.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {session.time}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {batch?.totalStudents || 0} students
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getModeColor(session.mode)}`}>
                <ModeIcon className="w-3 h-3" />
                {session.mode}
              </span>
              {batch && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                  {batch.name}
                </span>
              )}
            </div>

            {isToday && (
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium mb-2">
                <Video className="w-4 h-4" />
                Today's session!
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            {session.lectureLink && (
              <a
                href={session.lectureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Link2 className="w-4 h-4" />
                Session Link
              </a>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(session)}
                className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
            )}
            {isUpcoming && session.lectureLink && onJoin && (
              <button
                onClick={() => onJoin(session)}
                className={`px-4 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                  isToday
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Video className="w-4 h-4 inline mr-1" />
                {isToday ? 'Join Now' : 'Join Session'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};