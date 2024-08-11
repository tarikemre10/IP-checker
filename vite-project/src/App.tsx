import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IpListPage from './pages/IpListPage';
import HomePage from "./pages/HomePage";
import FileUploadPage from './pages/FileUploadPage';


const App: React.FC = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ip-list" element={<IpListPage />} />
            <Route path="/upload-file" element={<FileUploadPage />} />
        </Routes>
      </Router>
  );
};

export default App;