import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Math from './pages/Math';
import Quest from './pages/Quest';

import Exam from './pages/Exam';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800">
          <ul className='flex justify-center items-center gap-4 py-4'>
            <li>
              <Link to="/" className="text-white hover:text-gray-300 transition-colors">首頁</Link>
            </li>
            <li>
              <Link to="/math" className="text-white hover:text-gray-300 transition-colors">數學天地</Link>
            </li>
            <li>
              <Link to="/quest" className="text-white hover:text-gray-300 transition-colors">題目</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-300 transition-colors">關於我們</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<Math />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/about" element={<About />} />

          <Route path="/exam/:questId" element={<Exam />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
