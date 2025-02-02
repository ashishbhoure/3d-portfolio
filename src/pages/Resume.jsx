import React, { useState } from "react";
import resume from "../assets/Resume Ashish Bhoure.pdf";
import resumeImg from "../assets/Ashish Bhoure Resume.jpg";
import { download } from "../assets/icons";
import { Link } from "react-router-dom";
import { Document, Page } from "react-pdf";
import CTA from "../components/CTA";
import { Helmet } from "react-helmet";

// pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
export default function Resume() {
  // const [numPages, setNumPages] = useState(null); // Initialize numPages state to null
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  return (
    <section className="max-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Resume - Ashish Bhoure</title>
        <meta name="description" content="See the Achivment into my Resume" />
        <meta name="google-adsense-account" content="ca-pub-1210200290803283" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      {/* <h1>REsume</h1> */}
      <Link
        to={resume}
        download="Ashish_Bhoure_Resume"
        target="_blank"
        className=" w-1/4 h-10 p-5 max-sm:w-1/2 m-auto rounded-lg bg-gradient-to-r from-blue-400 to-sky-300  items-center flex font-bold shadow-md  justify-center  "
      >
        Download RESUME
        <img
          src={download}
          alt="download"
          className="flex w-5 h-5 object-contain"
        />
      </Link>
      <br />
      <div className="w-full shadow-lg">
        <img src={resumeImg} alt="Resume Image" />
        {/* <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
         {numPages && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}  */}
      </div>
      <Link
        to={resume}
        download="Ashish_Bhoure_Resume"
        target="_blank"
        className="mt-5 p-5 m-auto w-1/4 max-sm:w-1/2 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-sky-300 items-center justify-center flex font-bold shadow-md"
      >
        Download RESUME
        <img
          src={download}
          alt="download"
          className="flex w-5 h-5 object-contain"
        />
      </Link>
      <hr className="mt-5 border-slate-200" />
      {/* <CTA /> */}
    </section>
  );
}
