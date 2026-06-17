import React, { useState } from 'react';
import AdminShell from '../../components/admin/AdminShell';
import BlogManager from '../../components/admin/BlogManager';
import TipsManager from '../../components/admin/TipsManager';
import BioEditor from '../../components/admin/BioEditor';
import SiteSettings from '../../components/admin/SiteSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blog');

  return (
    <AdminShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'blog' && <BlogManager />}
      {activeTab === 'tips' && <TipsManager />}
      {activeTab === 'bio' && <BioEditor />}
      {activeTab === 'settings' && <SiteSettings />}
    </AdminShell>
  );
};

export default AdminDashboard;
