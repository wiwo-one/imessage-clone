import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./BottomSheet.module.css";

import { gsap } from "gsap";

const defaultStyle = {
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
  opacity: 1,
};

const BottomSheet = React.forwardRef(({ open, handleClose, children, ...props }, ref) => {
  const childrenRef = useRef([]);

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  useEffect(() => {
    setBottomSheetOpen(open);
    return () => {};
  }, [open]);

  return (
    <div style={defaultStyle} ref={ref}>
      <div className={styles.Container}>
        <div onClick={handleClose} className={styles.Top}>
          <h4>Done</h4>
        </div>
        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  );
});

export default BottomSheet;
