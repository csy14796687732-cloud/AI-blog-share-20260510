import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { LoadingSpinner } from '../../components/common/Loading.jsx';
import { projectsAPI } from '../../utils/api.js';

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/login'); return; }
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await projectsAPI.getAll({ limit: 100 });
      setProjects(res.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这个项目吗？')) return;
    try {
      await projectsAPI.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <AdminLayout title="项目管理">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">共 {projects.length} 个项目</p>
        <Link to="/admin/projects/new" className="glass-btn-primary glass-btn text-sm !py-2 !px-4">
          <Plus className="w-4 h-4" /> 添加项目
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner text="加载项目列表..." />
      ) : (
        <div className="space-y-3">
          {projects.map(project => (
            <div key={project.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === 'active' ? 'text-green-400 bg-green-400/10' :
                    project.status === 'archived' ? 'text-gray-400 bg-gray-400/10' : 'text-yellow-400 bg-yellow-400/10'
                  }`}>
                    {project.status === 'active' ? '进行中' : project.status === 'archived' ? '已归档' : '计划中'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{project.techStack?.slice(0, 3).join(', ')}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/admin/projects/${project.id}`)} className="glass w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="glass w-9 h-9 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
