import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LiveSessions } from './components/Sessions/LiveSessions';
import { Assignments } from './components/Assignments/Assignments';
import { Attendance } from './components/Attendance/Attendance';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'sessions': return 'Live Sessions';
      case 'assignments': return 'Assignments';
      case 'exams': return 'Examinations';
      case 'attendance': return 'Attendance';
      case 'batches': return 'Batch Management';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sessions':
        return <LiveSessions />;
      case 'assignments':
        return <Assignments />;
      case 'attendance':
        return <Attendance />;
      case 'exams':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Examinations</h2>
            <p className="text-gray-600">Examination system coming soon...</p>
          </div>
        );
      case 'batches':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Batch Management</h2>
            <p className="text-gray-600">Batch management features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getViewTitle()} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;