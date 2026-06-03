import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-meta">
        <span className={`priority-${task.priority}`}>{task.priority}</span>
        <span className={`status-${task.status}`}>{task.status}</span>
      </div>
    </div>
  );
};

export default TaskCard;
