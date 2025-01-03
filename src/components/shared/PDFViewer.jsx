import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "../ui/Button";
import { StepBack, StepForward } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDFViewer = ({ file }) => {
  const getPageWidth = () => {
    return window.innerWidth;
  };
  const getPageHeight = () => {
    return window.innerHeight;
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const [pageWidth, setPageWidth] = useState(getPageWidth());
  const [pageHeight, setPageHeight] = useState(getPageHeight());

  console.log(
    (window.innerHeight - 246) /
      (window.innerWidth >= 768
        ? window.innerWidth - 400
        : window.innerWidth - 50) >
      1.141
      ? "set width"
      : "set height"
  );

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(getPageWidth());
      setPageHeight(getPageHeight());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error("Failed to load PDF:", err.message);
    setError("Failed to load the PDF. Please check the file.");
  };

  if (!file) {
    return <p className="text-red-600 text-center my-4">No file provided.</p>;
  }

  return (
    <div className="flex min-w-0 overflow-auto">
      {error && <p className="text-red-600 text-center my-4">{error}</p>}
      <Button
        variant="outline"
        className={`mx-0.5`}
        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
        disabled={pageNumber <= 1}
        padding=""
      >
        <StepBack />
      </Button>
      <div>
        <hr className="border border-neutral-black/70 mb-1" />
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page
            pageNumber={pageNumber}
            width={
              (window.innerHeight - 246) /
                (window.innerWidth >= 768
                  ? window.innerWidth - 400
                  : window.innerWidth - 50) >
              1.141
                ? window.innerWidth >= 768
                  ? window.innerWidth - 520
                  : window.innerWidth - 140
                : null
            }
            height={
              (window.innerHeight - 246) /
                (window.innerWidth > 768
                  ? window.innerWidth - 400
                  : window.innerWidth - 50) >
              1.141
                ? null
                : window.innerHeight - 300
            }
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
        {numPages && (
          <p className="text-center mt-1">
            Page {pageNumber} of {numPages}
          </p>
        )}
        <hr className="border border-neutral-black/70 mt-1" />
      </div>
      <Button
        variant="outline"
        className={"mx-0.5"}
        onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
        disabled={pageNumber >= numPages}
        padding=""
      >
        <StepForward />
      </Button>
    </div>
  );
};

export default PDFViewer;
