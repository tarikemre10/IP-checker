import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FileUploadPage from './pages/FileUploadPage';
import FileCheckPage from "./pages/FileCheckPage";
import FileDeletePage from "./pages/FileDeletePage";


const App: React.FC = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload-file" element={<FileUploadPage />} />
            <Route path="/check-file" element={<FileCheckPage />} />
            <Route path="/delete-inactive-files" element={<FileDeletePage />} />
        </Routes>
      </Router>
  );
};

export default App;