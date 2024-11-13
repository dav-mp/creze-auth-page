import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Grid2, Backdrop } from '@mui/material';

import SnackBarMessage, { ServerityLevelSnackbar } from '../../components/SnackBar/snackBar';
import { SnackBarProps } from '../../components/SnackBar/snackBar';
import OtpInput from '../../components/OTPinput/OtpInput';
import { UserConfirmApplication } from '../../../application/authUser/authUser.application';
import { getCookiesData } from '../../../utils/CookiesData';
import useNavigationUtil from '../../../utils/GotoPath';

const UserConfirm: React.FC = () => {

    const { goTo } = useNavigationUtil()

    // const [isLoading, setIsLoading] = useState(false);
    const [openLoading, setopenLoading] = useState(false)
    const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
        isOpen: false,
        severity: ServerityLevelSnackbar.INFO,
        text: ''
    })

    const { isOpen, severity, text } = snackBarContent

    const handleConfirm = ( code: string ) => {

        const user = {
            email: getCookiesData( "email" )!,
            confirmationCode: code
        }

        UserConfirmApplication( user )
            .then(() => {
                setsnackBarContent({
                    isOpen: true,
                    severity: ServerityLevelSnackbar.SUCCESS,
                    text: "User confirm successfully."
                })
                // goTo( "/userConfirm" )
                goTo('/login')
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

        setopenLoading( true )

    };

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
                <CardContent sx={{ gap: 2 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Confirm Your Account
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Please enter the confirmation code sent to your email.
                </Typography>
                <Grid2>
                    <OtpInput handleConfirm={handleConfirm}/>
                </Grid2>
                <Box mt={2}>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => goTo('/')}
                    >
                    {/* {isLoading ? <CircularProgress size={24} /> : 'Confirm'} */}
                     Back to Register
                    </Button>
                </Box>
                </CardContent>
            </Card>
            </Box>
        </>
    );
};

export default UserConfirm;
