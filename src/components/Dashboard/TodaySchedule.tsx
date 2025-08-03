import React, { useEffect, useState } from "react";
import { Clock, Users, Video, Monitor } from "lucide-react";
import { LiveSession, Batch } from "../../types";

interface TodayScheduleProps {
  sessions: LiveSession[];
  batches: Batch[];
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({
  sessions,
  batches,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const todaySessions = sessions
    .filter((session) => session.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const getBatchName = (batchId: string) => {
    return (
      batches.find((batch) => batch.id === batchId)?.name || "Unknown Batch"
    );
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "online":
        return Monitor;
      case "hybrid":
        return Monitor;
      case "classroom":
        return Users;
      default:
        return Users;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "online":
        return "text-green-600";
      case "hybrid":
        return "text-purple-600";
      case "classroom":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Today's Schedule
        </h3>
      </div>


      <div className="p-6">
        {todaySessions.length === 0 ? (
          <div className="text-center py-8">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No sessions scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todaySessions.map((session) => {
              const ModeIcon = getModeIcon(session.mode);
              return (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-2 h-16 bg-blue-500 rounded-full">
                 
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {session.topic}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {getBatchName(session.batchId)}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {batches.find((b) => b.id === session.batchId)
                          ?.totalStudents || 0}{" "}
                        students
                      </div>
                      <div
                        className={`flex items-center gap-1 ${getModeColor(
                          session.mode
                        )}`}
                      >
                        <ModeIcon className="w-4 h-4" />
                        {session.mode}
                      </div>
                    </div>
                  </div>
                  {session.lectureLink ? (
                    <button
                      onClick={() => window.open(session.lectureLink, "_blank")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Join
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">
                      Classroom
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
