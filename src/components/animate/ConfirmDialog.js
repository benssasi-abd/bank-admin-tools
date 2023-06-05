import PropTypes from 'prop-types';
// @mui
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
//
import { DialogAnimate } from './../animate';
// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  children: PropTypes.node.isRequired,
  setOpen: PropTypes.func,
  onConfirm: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default function ConfirmDialog({ title, children, open, setOpen, setClose, onConfirm }) {
  return (
    <DialogAnimate open={open} onClose={setOpen}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={setClose}>Disagree</Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </DialogAnimate>
  );
}
