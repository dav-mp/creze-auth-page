import { useEffect, useState } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackBarProps {
  isOpen: boolean;
  severity: ServerityLevelSnackbar;
  text: string
}

export enum ServerityLevelSnackbar {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

const SnackBarMessage = ( props: SnackBarProps ) => {

  const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
    isOpen: false,
    severity: ServerityLevelSnackbar.INFO,
    text: ''
  })

  const { isOpen, severity, text } = snackBarContent

  useEffect(() => {
    setsnackBarContent( props )
  }, [props])
  


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackBarContent({
      ...snackBarContent,
      isOpen: false
    });
  };
  

  return (
    <Snackbar open={isOpen} autoHideDuration={1000} >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          { text }
        </Alert>
    </Snackbar>
  )
}

export default SnackBarMessage