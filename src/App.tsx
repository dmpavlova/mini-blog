import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetail from './pages/PostDetail';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;