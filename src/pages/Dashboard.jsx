import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { analyticsService, projectService, issueService } from '../services/authService';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [projects, setProjects] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
        setError(null);
        
        const [analyticsRes, projectsRes, issuesRes] = await Promise.all([
          analyticsService.getIssueAnalytics(),
          projectService.getAll({ limit: 5 }),
          issueService.getAll({ limit: 5 })
        ]);

        console.log('Analytics:', analyticsRes);
        console.log('Projects:', projectsRes);
        console.log('Issues:', issuesRes);

        setAnalytics(analyticsRes.data?.data || { totalIssues: 0, openIssues: 0, inProgressIssues: 0 });
        setProjects(projectsRes.data?.data || []);
        setIssues(issuesRes.data?.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="dashboard-container"><p>Loading dashboard...</p></div>;

  return (
    <div className="dashboard-container" data-testid="dashboard-container">
      <h1>Dashboard</h1>
      
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c33', 
          padding: '1rem', 
          borderRadius: '4px', 
          marginBottom: '1rem',
          border: '1px solid #c33'
        }}>
          {error}
        </div>
      )}
      
      <div className="analytics-section" data-testid="analytics-container">
        <h2>Issue Analytics</h2>
        <div className="analytics-grid">
          <div className="total-issues-card" data-testid="total-issues-card">
            <h3>Total Issues</h3>
            <p className="metric">{analytics?.totalIssues || 0}</p>
          </div>
          <div className="open-issues-card">
            <h3>Open Issues</h3>
            <p className="metric">{analytics?.openIssues || 0}</p>
          </div>
          <div className="in-progress-card">
            <h3>In Progress</h3>
            <p className="metric">{analytics?.inProgressIssues || 0}</p>
          </div>
          <div className="resolved-card">
            <h3>Resolved</h3>
            <p className="metric">{analytics?.resolvedIssues || 0}</p>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <h2>Active Projects</h2>
        <div className="active-projects-card" data-testid="active-projects-card">
          <div className="projects-list">
            {projects && projects.length > 0 ? (
              projects.map(project => (
                <div key={project._id} className="project-item">
                  <h4>{project.title}</h4>
                  <p>{project.description || 'No description'}</p>
                  <small>Status: {project.status}</small>
                </div>
              ))
            ) : (
              <p style={{ color: '#999', fontStyle: 'italic' }}>No projects yet. Create one to get started!</p>
            )}
          </div>
        </div>
      </div>

      <div className="issues-section">
        <h2>Recent Issues</h2>
        <div className="recent-issues-card">
          <div className="issues-list">
            {issues && issues.length > 0 ? (
              issues.map(issue => (
                <div key={issue._id} className="issue-item">
                  <h4>{issue.title}</h4>
                  <p>{issue.description || 'No description'}</p>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                    <span style={{ background: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                      Status: <strong>{issue.status}</strong>
                    </span>
                    <span style={{ background: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                      Priority: <strong>{issue.priority}</strong>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#999', fontStyle: 'italic' }}>No issues yet. Create one from the Issues page!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
