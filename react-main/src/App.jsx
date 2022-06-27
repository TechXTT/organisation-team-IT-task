import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <main className="min-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
