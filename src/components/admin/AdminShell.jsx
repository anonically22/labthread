import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastProvider } from '../Toast';

const AdminShell = ({ activeTab, onTabChange, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('labthread_admin_session');
    sessionStorage.removeItem('labthread_admin_expiry');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'blog', label: 'Blog posts', icon: 'ti-writing' },
    { id: 'tips', label: 'Email tips', icon: 'ti-bulb' },
    { id: 'bio', label: 'Author bio', icon: 'ti-user' },
    { id: 'settings', label: 'Site settings', icon: 'ti-settings' }
  ];

  return (
    <ToastProvider>
      <div className="flex flex-col h-screen w-full bg-[#FAFAF8] overflow-hidden relative">
        {/* Top bar */}
        <div className="h-[52px] bg-white border-b border-[#E2E2DF] flex items-center justify-between px-6 shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <span className="font-sans font-medium text-[14px] text-foreground">LabThread</span>
            <span className="bg-[#E1F5EE] text-[#0F6E56] font-sans font-medium text-[11px] px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              <i className="ti ti-circle-check text-[14px] text-[#0F6E56]"></i>
              <span className="font-sans text-[12px] text-muted">Logged in</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
              title="Logout"
            >
              <i className="ti ti-logout text-[16px]"></i>
              <span className="font-sans text-[13px] hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-[220px] bg-white border-r border-[#E2E2DF] py-6 shrink-0 h-full overflow-y-auto z-10 relative">
            <nav className="flex flex-col gap-1 px-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-3 h-[40px] px-[16px] rounded-lg font-sans text-[14px] font-medium transition-colors w-full text-left ${
                    activeTab === tab.id 
                      ? 'bg-[#E1F5EE] text-[#0F6E56]' 
                      : 'text-muted hover:bg-[#FAFAF8] hover:text-foreground'
                  }`}
                >
                  <i className={`ti ${tab.icon} text-[18px]`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Top Tab Bar (Mobile) */}
          <div className="md:hidden flex bg-white border-b border-[#E2E2DF] shrink-0 z-10 relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex justify-center items-center h-[48px] ${
                  activeTab === tab.id 
                    ? 'text-[#0F6E56] border-b-2 border-[#0F6E56]' 
                    : 'text-muted'
                }`}
              >
                <i className={`ti ${tab.icon} text-[20px]`}></i>
              </button>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminShell;
