import React, { useState } from "react";
import resume from "../assets/Resume Ashish Bhoure.pdf";
import { download } from "../assets/icons";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

export default function Resume() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <section className="max-container">
      {/* <h1>REsume</h1> */}
      <Link
        to={resume}
        download="Ashish_Bhoure_Resume"
        target="_blank"
        className=" w-1/4 h-10 rounded-lg bg-sky-300 items-center flex font-bold shadow-md  justify-around  "
      >
        Download RESUME
        <img
          src={download}
          alt="download"
          className="flex w-5 h-5 object-contain"
        />
      </Link>
      <br />
      <div>
        <Document
          file={resume}
          //   options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </section>
  );
}
