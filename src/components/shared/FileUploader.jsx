import { Images } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../ui/Button";

const FileUploader = ({ onFileChange, mediaUrl }) => {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFileUrl(newFileUrl);
      onFileChange(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center flex-col bg-accent-gray rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-2 lg:p-4">
            <img
              src={fileUrl}
              alt="image"
              className="file_uploader-img"
              loading="lazy"
            />
          </div>
          <p className="file_uploader-label">
            {" "}
            Click or drag photos here to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box text-neutral-black">
          <Images />
          <h3 className="base-medium mt-2">Drag photos here</h3>
          <p className="small-regular mt-2 mb-3">SVG, PNG, JPG</p>
          <Button variant="outline">Select from device</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
