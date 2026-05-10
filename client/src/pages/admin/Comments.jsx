import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { LoadingSpinner } from '../../components/common/Loading.jsx';
import { commentsAPI } from '../../utils/api.js';

export default function AdminComments() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/login'); return; }
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const res = await commentsAPI.getAll({});
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatus = async (id, status) => {
    try {
      await commentsAPI.update(id, { status });
      setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这条评论吗？')) return;
    try {
      await commentsAPI.delete(id);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  return (
    <AdminLayout title="评论管理">
      {loading ? (
        <LoadingSpinner text="加载评论..." />
      ) : (
        <div className="space-y-3">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">暂无评论</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        comment.status === 'approved' ? 'text-green-400 bg-green-400/10' :
                        comment.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10'
                      }`}>
                        {comment.status === 'approved' ? '已通过' : comment.status === 'pending' ? '待审核' : '已拒绝'}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {comment.entityType === 'post' ? '文章' : '项目'} ID: {comment.entityId}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {comment.status !== 'approved' && (
                      <button onClick={() => handleStatus(comment.id, 'approved')} className="glass w-8 h-8 rounded-lg flex items-center justify-center text-green-400 hover:text-green-300">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {comment.status !== 'rejected' && (
                      <button onClick={() => handleStatus(comment.id, 'rejected')} className="glass w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(comment.id)} className="glass w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </AdminLayout>
  );
}
