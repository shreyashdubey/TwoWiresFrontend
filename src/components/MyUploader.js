// FileUploaderViewer.js
import React, { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { Worker, Viewer } from '@react-pdf-viewer/core';

const FileUploaderViewer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append('file', file);
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
    return { url: 'dummy-url', body };
  };

  return (
    <div>
        <h1>Hi</h1>
      <Dropzone
        getUploadParams={getUploadParams}
        accept="image/*, .pdf"
        styles={{
          dropzone: { minHeight: 200, maxHeight: 200 },
        }}
      />
      {selectedFile && (
        <>
          {selectedFile.includes('.pdf') ? (
            <div>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <Viewer fileUrl={selectedFile} />
              </Worker>
            </div>
          ) : (
            <img src={selectedFile} alt="Image" style={{ maxWidth: '100%' }} />
          )}
        </>
      )}
    </div>
  );
};

export default FileUploaderViewer;
