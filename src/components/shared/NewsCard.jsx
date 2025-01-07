import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "../ui/Button";
import { downloadFile } from "../../lib/appwrite/api";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const NewsCard = ({ newsLetter, showActions = true }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (!newsLetter.fileUrl) {
    return <p className="text-red-600 text-center my-4">No file provided.</p>;
  }

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadFile(newsLetter.fileId, newsLetter.title);
  };

  return (
    <div className="flex overflow-auto p-5">
      <div className="w-full flex flex-col lg:flex-row bg-accent-gray">
        <Document
          file={newsLetter.fileUrl}
          onClick={() => navigate(`/newsletter/${newsLetter.$id}`)}
          className={"cursor-pointer"}
        >
          <Page
            width={isDesktop ? 300 : window.innerWidth - 140}
            pageNumber={1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
        {showActions && (
          <div className="max-w-md min-w-96 flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold px-5 pt-5">
              {newsLetter.title}
            </h3>
            <hr className="w-full border border-neutral-black/10" />
            <div className="flex flex-1"></div>
            <div className="flex-center w-full py-5">
              <Button onClick={handleDownload}>Download Newsletter</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
