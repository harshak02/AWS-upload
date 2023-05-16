import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (pdfFile) {
      formData.append('pdf', pdfFile);
    }

    try {
      await axios.post('http://localhost:5000/upload', formData);
      console.log('Files uploaded successfully');
      // Reset form after successful upload
      setPdfFile(null);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      <div>
        <h2>Upload PDF</h2>
        <input type="file" accept=".pdf" onChange={handlePdfUpload} />
        {pdfFile && <p>Selected PDF: {pdfFile.name}</p>}
        <button onClick={() => setPdfFile(null)}>Clear PDF</button>
      </div>
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
