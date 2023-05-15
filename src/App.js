import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [permUrl,setPermUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get a pre-signed URL for uploading the file
    axios.get('http://localhost:8800/upload-url', { params: { filename: file.name } })
      .then(response => {
        const url = response.data.url;
        setUrl(url);

        // Use the pre-signed URL to upload the file
        axios.put(url, file, {
          headers: {
            'Content-Type': file.type,
          },
        }).then(res => {

          console.log('File uploaded successfully!');
          axios.get('http://localhost:8800/perm-url',{ params: { filename: file.name } }).then(res =>{
            setPermUrl(res.data);
          }).catch(error => {
            console.log(error);
          });

        }).catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Upload File to Scan</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {url && (
          <p>File uploaded to bucket : {url}</p>
        )}
        {permUrl && (
          <p>File's permanent Url is : {permUrl}</p>
        )}
      </form>
    </div>
  );
}

export default UploadForm;
