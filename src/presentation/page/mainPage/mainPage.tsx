import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { UserLogoutApplication } from '../../../application/authUser/authUser.application';
import { deleteCookiesData, getCookiesData } from '../../../utils/CookiesData';
import useNavigationUtil from '../../../utils/GotoPath';
import SnackBarMessage, { ServerityLevelSnackbar, SnackBarProps } from '../../components/SnackBar/snackBar';

const MainPage: React.FC = () => {
  
  const { goTo } = useNavigationUtil()

  const session = getCookiesData( "AccessToken" ) ?? ''

  const [openLoading, setopenLoading] = useState(false)
  const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
      isOpen: false,
      severity: ServerityLevelSnackbar.INFO,
      text: ''
  })
  const { isOpen, severity, text } = snackBarContent

  const logout = () => {

    setopenLoading(true)

    UserLogoutApplication( session )
      .then(() => {
        setsnackBarContent({
          isOpen: true,
          severity: ServerityLevelSnackbar.SUCCESS,
          text: "User logout successfully."
        })
        deleteCookiesData( "AccessToken" )
        setTimeout(() => {
            goTo( "/login" )
        }, 2000);
      })
      .catch(err => {
          setsnackBarContent({
              isOpen: true,
              severity: ServerityLevelSnackbar.ERROR,
              text: err.error
          })
      })
      .finally(() => {
          setopenLoading(false)
          setTimeout(() => {
              setsnackBarContent({
                  ...snackBarContent,
                  isOpen: false,
              })
          }, 6000);
      })

  }

  return (
    <>
      <SnackBarMessage isOpen={isOpen} severity={severity} text={text} />
      <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={openLoading}
      >
          <CircularProgress color="inherit" />
      </Backdrop> 
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <Card sx={{ maxWidth: 400, padding: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom textAlign="center">
              Welcome to the App
            </Typography>
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="warning"
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default MainPage;
