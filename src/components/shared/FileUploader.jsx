import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "../ui/Button";

const FileUploader = ({ onFileChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");
  const [cropping, setCropping] = useState(false);
  const cropperRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFileUrl(newFileUrl);
      setCropping(true);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  const cropImage = () => {
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    croppedCanvas.toBlob((blob) => {
      const croppedFileUrl = URL.createObjectURL(blob);
      setFileUrl(croppedFileUrl);
      setCropping(false); 
      onFileChange(blob);
    }, "image/jpeg", 1);
  };

  const cancelCrop = () => {
    setFileUrl(""); 
    setCropping(false); 
    onFileChange(null);
  };

  return (
    <div className="file-uploader">
      {cropping ? (
        <div className="cropper-container">
          <Cropper
            src={fileUrl}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1} 
            guides={false}
            ref={cropperRef}
            viewMode={1} 
          />
          <div className="cropper-actions flex-center gap-5 my-5">
            <Button onClick={cropImage}>Crop and Save</Button>
            <Button variant="destructive" onClick={cancelCrop}>
              Cancel
            </Button>
          </div>
          <hr className="w-full "/>
        </div>
      ) : (
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
                Click or drag photos here to replace
              </p>
            </>
          ) : (
            <div className="file_uploader-box text-neutral-black">
              <h3 className="base-medium mt-2">Drag photos here</h3>
              <p className="small-regular mt-2 mb-3">PNG, JPG, JPEG</p>
              <Button variant="outline">Select from device</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
