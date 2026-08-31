import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// --- MAIN DASHBOARD PAGE ---
const MainDashboard = ({ handleLogout, token }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // API Call headers-la token-a anuppanum
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos', authConfig);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!task) return;
    try {
      const res = await axios.post('http://localhost:5000/api/todos', { text: task }, authConfig);
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, authConfig);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f5ff', padding: '50px' }}>
      
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#1a1a1a' }}>📝 My Tasks</h2>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>

        <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?" 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none' }}
          />
          <button type="submit" className="primary-btn" style={{ marginTop: '0', padding: '12px 20px' }}>Add</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No tasks yet. Add a new one!</p>
          ) : (
            todos.map(todo => (
              <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#333' }}>{todo.text}</span>
                <span onClick={() => deleteTask(todo._id)} style={{ cursor: 'pointer', color: '#ff4d4f' }}>🗑️</span>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
};

// --- LOGIN / REGISTER PAGE ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`http://localhost:5000${endpoint}`, { email, password });
      
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    const currentToken = localStorage.getItem('token');
    return <MainDashboard handleLogout={handleLogout} token={currentToken} />;
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <span className="brand-icon">☑️</span> Todo
        </div>
        
        <h1 className="hero-text">
          Organize your tasks and actions.<br />
          Stay <span className="highlight">productive.</span>
        </h1>
        <p className="hero-subtext">
          Todo helps you plan your day, manage your tasks and get things done efficiently.
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <div className="icon">☑️</div>
            <div className="feature-text">
              <h3>Create & Manage Tasks</h3>
              <p>Add, edit, and organize tasks easily.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon">📅</div>
            <div className="feature-text">
              <h3>Stay Organized</h3>
              <p>Set due dates, priorities and never miss important things.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon">📈</div>
            <div className="feature-text">
              <h3>Track Progress</h3>
              <p>Monitor your completed tasks and achieve your goals.</p>
            </div>
          </div>
        </div>

        <div className="quote">
          "The secret of getting ahead is getting started."<br />
          <span>- Mark Twain</span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p className="subtitle">Login to your account to continue</p>

          <div className="tabs">
            <button 
              className={activeTab === 'login' ? 'tab active' : 'tab'}
              onClick={() => { setActiveTab('login'); setMessage(''); }}
            >
              Login
            </button>
            <button 
              className={activeTab === 'register' ? 'tab active' : 'tab'}
              onClick={() => { setActiveTab('register'); setMessage(''); }}
            >
              Register
            </button>
          </div>

          {message && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>{message}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {activeTab === 'login' && (
              <div className="form-actions">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="primary-btn">
              {activeTab === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="switch-account">
            {activeTab === 'login' ? (
              <p>Don't have an account? <span className="link" onClick={() => { setActiveTab('register'); setMessage(''); }}>Register here</span></p>
            ) : (
              <p>Already have an account? <span className="link" onClick={() => { setActiveTab('login'); setMessage(''); }}>Login here</span></p>
            )}
          </div>
        </div>
        
        <div className="footer-copyright">
          © 2026 Todo. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;