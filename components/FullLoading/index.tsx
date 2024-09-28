import React from "react";
import "./style.css";
import LinearDeterminate from "../LinearDeterminate";

const FullLoading = ({ progress }: { progress?: number }) => {
  return (
    <div className="full-loading">
      <div className="spinner"></div>
      {progress !== undefined && (
        <div className="progress">
          <LinearDeterminate progress={progress} />
        </div>
      )}
    </div>
  );
};

export default FullLoading;
