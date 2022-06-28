import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Logout from './pages/Auth/Logout';
import Workspaces from './pages/Workspaces';

function App() {
  const [name, setName] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:8000/api/get/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.name) {
        setName(data.name);
        setLogged(true);
      }
    }

    fetchUser();
  }, [])



  return (
    <div className="App dark:bg-slate-900 ">

      <main className="flex flex-col h-screen w-full max-w-md ">
        <Navbar logged={logged} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
          <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
          <Route path="/logout" element={<Logout logged={logged} setLogged={setLogged} />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/todo" element={<Home />} />
          <Route path="/calendar" element={<Home />} />
          <Route path="/settings" element={<Home />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
