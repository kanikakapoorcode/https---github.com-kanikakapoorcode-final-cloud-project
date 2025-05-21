import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = ({ message, onClose }) => {
  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity="warning" elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;