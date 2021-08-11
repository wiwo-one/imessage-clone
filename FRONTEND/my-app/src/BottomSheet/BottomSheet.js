import React, { useEffect, useState } from "react";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";

import Transition from "react-transition-group/Transition";

import { motion } from "framer-motion";

import styles from "./BottomSheet.module.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 2, 3),
    outline: "none",
    "&:focus-visible": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "14px 14px 0 0",
    overflow: "hidden",
    width: "98vw",
    position: "absolute",
    //height: "100%",
    top: "20px",
    bottom: "0px",
  },
}));

const duration = 500;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1, height: "100%", transform: "translateY(100%)" },
  entered: { opacity: 1, height: "100%", transform: "translateY(0%)" },
  exiting: { opacity: 1, height: "100%", transform: "translateY(0%)" },
  exited: { opacity: 1, height: "100%", transform: "translateY(100%)" },
};

const BottomSheet = ({ open, handleClose, ...props }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus="true"
      keepMounted="true"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Transition in={open} timeout={100}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className={`${classes.paper}`}>
            <div className={styles.Container}>
              <div onClick={handleClose} className={styles.Top}>
                <h4>Done</h4>
              </div>
              <div className={styles.Content}>{props.children}</div>
            </div>
          </div>
        )}
      </Transition>
    </Modal>
  );
};

export default BottomSheet;
