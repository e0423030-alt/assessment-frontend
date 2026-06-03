import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">Bug Tracking System</div>
        
        {state.isAuthenticated && (
          <div className="nav-menu">
            <button 
              className="nav-link"
              onClick={() => navigate('/dashboard')}
              data-testid="dashboard-link"
            >
              Dashboard
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/users')}
              data-testid="users-link"
            >
              Users
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/projects')}
              data-testid="project-link"
            >
              Projects
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/issues')}
              data-testid="issues-link"
            >
              Issues
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/comments')}
              data-testid="comments-link"
            >
              Comments
            </button>            {state.user?.role === 'admin' && (
              <button 
                className="nav-link admin-link"
                onClick={() => navigate('/sync')}
                data-testid="sync-link"
              >
                🔄 Sync Data
              </button>
            )}            <button 
              className="nav-link logout"
              onClick={handleLogout}
              data-testid="logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
