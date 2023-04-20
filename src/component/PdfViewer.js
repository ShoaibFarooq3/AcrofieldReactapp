

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from 'pdf-lib/dist/pdf-lib.esm.js';
// import jsonPdf from "../utils/jsonPdf.js";

function PdfUploader() {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const data = {
        "Printed name OwnerOccupant": "John Smith",
        "Property Address": "123 Main St.",
        // "Arizona Department of Housing Weatherization Program_2": "Program XYZ",
        // "Form Revised 4202023_2": "Form 123",
        // "Pamplet Receipt Signature Owner/Occupant": "John Smith",
        // "Pamplet Receipt Signature Date_af_date": "2023-04-21",
        // "Date of Energy Audit_af_date": "2023-04-20",
        // "No mold growth": true,
        // "Identiﬁed mold growth in Living/Bedroom": false,
        // "Identified mold growth in Laundry": true,
        // "Identified mold growth in Crawlspace": false,
        // "Identified mold growth in Basement": false,
        // "Identified mold growth in Bathroom": true,
        // "Identified mold growth in Combustion": false,
        // "Identified mold growth in Attic": false,
        // "Identified mold growth in Other": true,
        // "Identified mold growth in Other explanation": "Some description of the identified mold growth",
        // "Moldy or Musty odors are present": true,
        // "Moldy or Musty odors are not present": false,
        // "We will take the following measures": [
        //     "Clean affected areas",
        //     "Use mold-resistant materials for future repairs",
        //     "Improve ventilation in the property"
        // ],
        // "Identiﬁed mold growth": [
        //     "Laundry",
        //     "Bathroom",
        //     "Other"
        // ],
        // "Deferral Disclaimer Signature Owner/Occupant": "John Smith",
        // "Deferral Disclaimer Signature Owner/Occupant Date": "2023-04-21",
        // "Moisture/Mold Disclaimer": "Some disclaimer text",
        // "Deferral Disclaimer": "Some deferral disclaimer text",
        // "EPA consumer's guide": "Some EPA consumer's guide text",
        // "EPA consumer's guide to radon Signature": "John Smith",
        // "EPA consumer's guide to radon Signature Date": "2023-04-21",
        // "Pamplet Receipt copy received": true
    }
    // console.log("Data file json ", data)

    const onDrop = async (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setPageNumber(1);

        // Load the uploaded PDF file using pdf-lib
        const pdfBytes = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Fill the AcroForm fields
        const form = pdfDoc.getForm();

        form.getTextField('Property Address').setText('123 Main St.');
        form.getTextField('Printed name OwnerOccupant').setText('John Doe');
        form.getTextField('Pamplet Receipt Signature Date_af_date').setText('2023-04-21');
        form.getTextField('Date of Energy Audit_af_date').setText('2023-04-21');

        // Generate a new PDF file with the filled fields
        const pdfBytesFilled = await pdfDoc.save();
        const pdfFileFilled = new File([pdfBytesFilled], `${selectedFile.name}_filled.pdf`, { type: "application/pdf" });
        setFile(pdfFileFilled);
        console.log(file)
        const fields = form.getFields();
        const fieldNames = form.getFields().map((field) => field.getName());
        // console.log(fieldNames);
        console.log(`Field value: ${fieldNames}`);
        // form.getTextField('Property Address').setText('123 Main St.');

        for (const [fieldName, field] of Object.entries(fields)) {
            console.log(`Field name: ${fieldName}`);
        }
        for (const key in data) {
            const value = data[key];
            // form.getTextField('Printed name OwnerOccupant').setText('John Doe');

            // console.log("key", key)
            // console.log(value)
            // form.getTextField(key).setText(value);
        }



    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: ".pdf",
        onDrop,
    });

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    // Set the workerSrc for react-pdf
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    return (
        <div className="container">
            <div {...getRootProps()} className="mt-5 p-5">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the PDF file here</p>
                ) : (
                    <p>Drag and drop a PDF file here, or click to select a file</p>
                )}
            </div>
            {file && (
                <div>
                    <div>
                        <Document
                            file={file}
                            onLoadSuccess={handleDocumentLoadSuccess}
                            style={{ width: '100%', height: '800px' }}

                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                        <button
                            disabled={pageNumber <= 1}
                            onClick={() => handlePageChange(pageNumber - 1)}
                        >
                            Previous
                        </button>
                        <button
                            disabled={pageNumber >= numPages}
                            onClick={() => handlePageChange(pageNumber + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PdfUploader;
