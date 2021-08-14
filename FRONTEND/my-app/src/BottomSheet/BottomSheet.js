import React, { useEffect, useRef, useState } from "react";

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
  height: "calc(100% - 30px)",
};

const BottomSheet = React.forwardRef(({ open, handleClose, children, ...props }, ref) => {
  const childrenRef = useRef([]);

  useEffect(() => {
    console.log("Form Children", childrenRef.current);
  }, []);
  return (
    <div style={defaultStyle} ref={ref}>
      <div className={styles.Container}>
        <div onClick={handleClose} className={styles.Top}>
          <h4>Done</h4>
        </div>
        <div className={styles.Content}>
          {/* content */}
          {/* <>
            {React.Children.map(children, (child, index) =>
              React.cloneElement(child, {
                ref: (ref) => (childrenRef.current[index] = ref),
              })
            )}
          </> */}
          {children}
        </div>
      </div>
    </div>
  );
});

export default BottomSheet;
