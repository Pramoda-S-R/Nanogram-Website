import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { useGetNewsById } from "../../lib/react_query/queriesAndMutations";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDFViewer = () => {
  const { id } = useParams();
  const { data: newsLetter } = useGetNewsById(id || "");

  const [numPages, setNumPages] = useState(0);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!newsLetter?.fileUrl) {
    return <p className="text-red-600 text-center my-4">No file provided.</p>;
  }

  return (
    <div className="default-container flex justify-center">
      <div>
        <Document
          file={newsLetter.fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              width={
                isDesktop ? window.innerWidth - 500 : window.innerWidth - 40
              }
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
