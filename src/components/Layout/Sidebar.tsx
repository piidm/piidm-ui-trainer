import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  GraduationCap, 
  Users, 
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sessions', label: 'Live Sessions', icon: Video },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'exams', label: 'Examinations', icon: GraduationCap },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'batches', label: 'Batch Management', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          Trainer Panel
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};