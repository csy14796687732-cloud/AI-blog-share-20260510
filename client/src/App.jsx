import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Pages
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminPosts from './pages/admin/Posts.jsx';
import AdminPostEdit from './pages/admin/PostEdit.jsx';
import AdminProjects from './pages/admin/Projects.jsx';
import AdminProjectEdit from './pages/admin/ProjectEdit.jsx';
import AdminComments from './pages/admin/Comments.jsx';
import AdminSettings from './pages/admin/Settings.jsx';

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="animated-bg" />
      <Navbar />
      <main className="relative z-10 pt-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/posts/new" element={<AdminPostEdit />} />
            <Route path="/admin/posts/:id" element={<AdminPostEdit />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/projects/new" element={<AdminProjectEdit />} />
            <Route path="/admin/projects/:id" element={<AdminProjectEdit />} />
            <Route path="/admin/comments" element={<AdminComments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
