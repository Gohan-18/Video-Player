import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../features/watchlist-slice';

const Alert = () => {

  const { alert } = useSelector((state) => state.watchlistSl);
  const dispatch = useDispatch();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeAlert());
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;