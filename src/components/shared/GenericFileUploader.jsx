import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "../ui/Button";

const GenericFileUploader = ({
  onFileChange,
  initialFileUrl = "",
  acceptedFileTypes = { "*": ["*"] },
  enableImageCropping = false,
  cropAspectRatio = 1,
  cropperStyle = { height: 400, width: "100%" },
}) => {
  const [fileUrl, setFileUrl] = useState(initialFileUrl);
  const [cropping, setCropping] = useState(false);
  const cropperRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFileUrl(newFileUrl);
      if (enableImageCropping && file.type.startsWith("image/")) {
        setCropping(true);
      } else {
        onFileChange(file);
      }
    }
  }, [enableImageCropping, onFileChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  });

  const cropImage = () => {
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    croppedCanvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "cropped-image.jpg", {
            type: blob.type,
          });
          const croppedFileUrl = URL.createObjectURL(file);
          setFileUrl(croppedFileUrl);
          setCropping(false);
          onFileChange(file);
        }
      },
      "image/jpeg",
      1
    );
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
            style={cropperStyle}
            aspectRatio={cropAspectRatio}
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
          <hr className="w-full" />
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
                {enableImageCropping ? (
                  <img
                    src={fileUrl}
                    alt="Uploaded file"
                    className="file_uploader-img"
                    loading="lazy"
                  />
                ) : (
                  <p className="file_uploader-label">File uploaded successfully {fileUrl}</p>
                )}
              </div>
              <p className="file_uploader-label">
                Click or drag files here to replace
              </p>
            </>
          ) : (
            <div className="file_uploader-box text-neutral-black">
              <h3 className="base-medium mt-2">Drag files here</h3>
              <p className="small-regular mt-2 mb-3">
                {Object.values(acceptedFileTypes).flat().join(", ")}
              </p>
              <Button variant="outline">Select from device</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenericFileUploader;
