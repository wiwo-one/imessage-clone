import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  //open, onOpen, onClose
  //const [open, setOpen] = React.useState(false);

  const [channelName, setChannelName] = React.useState("");

  const handleClose = (e) => {
    e.preventDefault();
    props.onClose(channelName);
    setChannelName("");
  };

  const handleChange = (e) => {
    setChannelName(e.target.value);
  };

  useEffect(() => {
    //props.open ? setOpen(true) : setOpen(false);
  });

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleClose}>
          <DialogTitle id="form-dialog-title">Create new chat</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Chat Name"
              type="text"
              value={channelName}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
