import React, { useEffect, useState } from 'react';
import { issueService } from '../services/authService';
import '../styles/Tasks.css';

const Tasks = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await issueService.getAll(filters);
      setIssues(response.data.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <div className="tasks-container">
      <h1>Issues</h1>
      
      <div className="filters">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="testing">Testing</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="issues-grid">
          {issues.map(issue => (
            <div key={issue._id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <div className="issue-info">
                <span>Priority: {issue.priority}</span>
                <span>Status: {issue.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
