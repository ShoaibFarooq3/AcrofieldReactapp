// import React, { useState } from 'react';
// import PdfViewer from './PdfViewer';

// const UploadPdf = () => {
//     const [file, setFile] = useState(null);

//     function onFileChange(event) {
//         const selectedFile = event.target.files[0];
//         const reader = new FileReader();

//         reader.onload = function (event) {
//             setFile(event.target.result);
//         };

//         reader.readAsArrayBuffer(selectedFile);
//     }

//     function renderPdfViewer() {
//         if (file) {
//             return <PdfViewer file={file} />;
//         } else {
//             return <p>No file selected</p>;
//         }
//     }

//     return (
//         <div>
//             <input type="file" onChange={onFileChange} />
//             {renderPdfViewer()}
//         </div>
//     );
// };

// export default UploadPdf;
