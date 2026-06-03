import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/SyncData.css';

const SyncData = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [error, setError] = useState(null);
  const [syncHistory, setSyncHistory] = useState([]);

  // Check if user is admin
  if (auth.user?.role !== 'admin') {
    return (
      <div className="sync-container">
        <div className="error-message">
          ⛔ Access Denied - Only admins can sync external data
        </div>
      </div>
    );
  }

  const handleSync = async () => {
    setLoading(true);
    setError(null);
    setSyncResult(null);

    try {
      console.log('Starting data sync from external API...');
      const response = await api.post('/sync');
      
      if (response.data.success) {
        const result = response.data.data;
        setSyncResult(result);
        
        // Add to history
        setSyncHistory(prev => [{
          timestamp: new Date().toLocaleString(),
          result: result
        }, ...prev]);

        console.log('Sync completed:', result);
      } else {
        setError(response.data.message || 'Sync failed');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Sync error occurred';
      setError(message);
      console.error('Sync error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sync-container">
      <h1>🔄 External Data Sync</h1>
      
      <div className="sync-card">
        <h2>Sync Dataset from External API</h2>
        <p className="description">
          Connect to external API (https://t4e-testserver.onrender.com/api) 
          and synchronize data to your local database.
        </p>

        <div className="sync-info">
          <div className="info-item">
            <strong>API URL:</strong>
            <span>https://t4e-testserver.onrender.com/api</span>
          </div>
          <div className="info-item">
            <strong>Student ID:</strong>
            <span>E0423030</span>
          </div>
          <div className="info-item">
            <strong>Status:</strong>
            <span className="status-badge">Ready</span>
          </div>
        </div>

        <button 
          onClick={handleSync} 
          disabled={loading}
          className="sync-button"
        >
          {loading ? '⏳ Syncing...' : '▶️ Start Sync'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {syncResult && (
        <div className="result-card">
          <h3>✅ Sync Results</h3>
          <div className="result-grid">
            <div className="result-item">
              <strong>Total Fetched</strong>
              <span className="result-value">{syncResult.totalFetched || 0}</span>
            </div>
            <div className="result-item">
              <strong>Inserted</strong>
              <span className="result-value success">{syncResult.inserted || 0}</span>
            </div>
            <div className="result-item">
              <strong>Duplicates</strong>
              <span className="result-value warning">{syncResult.duplicates || 0}</span>
            </div>
            <div className="result-item">
              <strong>Rejected</strong>
              <span className="result-value error">{syncResult.rejected || 0}</span>
            </div>
          </div>
          <p className="sync-time">Synced at: {new Date().toLocaleString()}</p>
        </div>
      )}

      {syncHistory.length > 0 && (
        <div className="history-card">
          <h3>📜 Sync History</h3>
          <div className="history-list">
            {syncHistory.slice(0, 5).map((entry, idx) => (
              <div key={idx} className="history-item">
                <div className="history-time">{entry.timestamp}</div>
                <div className="history-stats">
                  Fetched: {entry.result.totalFetched} | 
                  Inserted: {entry.result.inserted} | 
                  Duplicates: {entry.result.duplicates}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>ℹ️ How It Works</h3>
        <ol>
          <li>Click "Start Sync" to fetch data from the external API</li>
          <li>Data is validated and checked for duplicates</li>
          <li>New records are inserted into your database</li>
          <li>You can then view and manage this data in other pages</li>
        </ol>
      </div>
    </div>
  );
};

export default SyncData;
