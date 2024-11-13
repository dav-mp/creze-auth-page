import { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
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
  
  

  return (
    <Snackbar open={isOpen} autoHideDuration={1000} >
        <Alert
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