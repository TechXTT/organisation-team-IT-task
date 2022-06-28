import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Logout from './pages/Auth/Logout';
import Workspaces from './pages/Workspaces';
import CreateWorkspace from './pages/create/Workspace';
import CreateTask from './pages/create/Task';
import EditWorkspace from './pages/edit/Workspace';
import EditTask from './pages/edit/Task';

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
        localStorage.setItem('id', data.id);
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
          <Route path="/todo" element={<Workspaces todo={false} />} />
          <Route path="/done" element={<Workspaces todo={true} />} />
          <Route path="/workspace/create" element={<CreateWorkspace />} />
          <Route path="/workspace/edit/:wsid" element={<EditWorkspace />} />
          <Route path="/task/create" element={<CreateTask />} />
          <Route path="/task/edit/:wsid/:id" element={<EditTask />} />
          <Route path="/settings" element={<Home />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
