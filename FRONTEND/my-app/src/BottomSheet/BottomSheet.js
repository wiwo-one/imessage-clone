import React, { useEffect, useState } from "react";

import styles from "./BottomSheet.module.css";

const defaultStyle = {
  transition: `all 500ms ease-in-out`,
  backgroundColor: "white",

  borderRadius: "14px 14px 0 0",
  overflow: "hidden",
  width: "96vw",
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
  marginLeft: "auto",
  marginRight: "auto",
};

const BottomSheet = ({ open, handleClose, ...props }) => {
  return (
    <div style={defaultStyle}>
      <div className={styles.Container}>
        <div onClick={handleClose} className={styles.Top}>
          <h4>Done</h4>
        </div>
        <div className={styles.Content}>
          {/* content */}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
