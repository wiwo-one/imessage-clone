import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./BottomSheet.module.css";

import { gsap } from "gsap";

const defaultStyle = {
  // transition: `all 500ms ease-in-out`,
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
  //transform: "translateY(1000px)",
  opacity: 1,
};

const BottomSheet = React.forwardRef(({ open, handleClose, children, ...props }, ref) => {
  const childrenRef = useRef([]);

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  useEffect(() => {
    console.log("ZMIANA OPEN: ", open);
    setBottomSheetOpen(open);
    return () => {};
  }, [open]);

  // useEffect(() => {
  //   console.log("REF BOTTOM");
  //   console.dir(ref?.current);
  //   gsap.to(ref?.current, { opacity: 1, duration: 1 });
  //   console.log("Animuje...");
  // }, [ref]);

  return (
    // <AnimatePresence>
    <>
      {/* {bottomSheetOpen && ( */}
      <div
        // initial={{ opacity: 1, y: "100vh" }}
        // animate={{
        //   opacity: 1,
        //   y: "0%",
        //   transition: {
        //     type: "tween",
        //     ease: "easeInOut",
        //     delay: 0.5,
        //     duration: 2,
        //   },
        // }}
        // exit={{ opacity: 0, y: "100%" }}
        style={defaultStyle}
        ref={ref}>
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
      {/* )} */}
    </>
    // </AnimatePresence>
  );
});

export default BottomSheet;
