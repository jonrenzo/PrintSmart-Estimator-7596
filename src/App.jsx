import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from './components/FileUpload';
import PriceCalculator from './components/PriceCalculator';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileSelect = (newFiles) => {
    setFiles(newFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Print Cost Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Compute printing costs in Philippine Peso (₱)
          </p>
        </div>

        <FileUpload onFileSelect={handleFileSelect} />
        {files.length > 0 && <PriceCalculator files={files} />}
      </motion.div>
    </div>
  );
}

export default App;