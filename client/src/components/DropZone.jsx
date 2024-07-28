import PropTypes from "prop-types";
import { useState } from "react";
import blueArrow from "../assets/arrow-blue.svg";
import whiteArrow from "../assets/arrow-white.svg";
import FileInput from "./FileInput";

export default function DropZone({ onFileChange }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    onFileChange(droppedFile);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const borderStyle = isDragOver
    ? "border-blue-500 bg-blue-500 border-white"
    : "border-gray-300";

  const outerStyle = isDragOver ? "bg-blue-500" : "bg-white";

  const show = isDragOver ? "hidden" : "block";

  return (
    <div className={`flex flex-col items-center justify-center h-4/6`}>
      <div className={`rounded-lg p-3 ${outerStyle} w-3/5 h-full`}>
        <div className="w-full h-full flex flex-col">
          <h1 className={`font-semibold text-center text-md ${isDragOver ? "text-white" : "text-blue-500"} w-full pb-2 flex-none md:text-left`}>
            Upload your file :
          </h1>
          <div
            className={`flex-1 border-2 rounded-lg border-dashed  ${borderStyle} w-full h-full justify-center flex items-center`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          >
            <div className="justify-center flex flex-col items-center">
              <img src={isDragOver ? whiteArrow : blueArrow} alt="arrow" className="h-16 w-16" />
              <p className={`text-md text-center text-white ${isDragOver ? "block" : "hidden"}`}>
                Drop!
              </p>
              <p className={`text-md text-center text-gray-500 ${show}`}>
                Drag and drop or{" "}
                <FileInput onFileChange={onFileChange}/>
              </p>
              <p className={`text-sm text-center text-gray-500 font-medium ${show}`}>
                Supports: PDF, JPG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DropZone.propTypes = {
  onFileChange: PropTypes.func.isRequired
};
