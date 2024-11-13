import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useUserActions } from '../../hooks/store/useUserActionsStore';
import useNavigationUtil from '../../../utils/GotoPath';
import OtpInput from '../../components/OTPinput/OtpInput';
import { UserConfirmMfaApplication } from '../../../application/authUser/authUser.application';
import SnackBarMessage, { ServerityLevelSnackbar, SnackBarProps } from '../../components/SnackBar/snackBar';
import { getCookiesData } from '../../../utils/CookiesData';

const UserConfirmMFA: React.FC = () => {

    const { getSecretCodeAction, getUserSessionAction } = useUserActions()

    const { goTo } = useNavigationUtil()

    const [allRight, setAllRight] = useState(false)
    const [secretCodeQr, setSecretCodeQr] = useState(getSecretCodeAction())
    const [sessionToken] = useState(getUserSessionAction())
    const [openLoading, setopenLoading] = useState(false)
    const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
        isOpen: false,
        severity: ServerityLevelSnackbar.INFO,
        text: ''
    })

    const { isOpen, severity, text } = snackBarContent


    useEffect(() => {

        const email = getCookiesData( "email" ) ?? ''
        
        
        if(secretCodeQr === '' || email === '' || sessionToken === '') {
            goTo('/login')
        }

        setSecretCodeQr(`otpauth://totp/AplicacionAuthCreze:${email}?secret=${secretCodeQr}&issuer=AplicacionAuthCreze`)

    }, [])
    

    const handleConfirm = ( code: string ) => {

        setopenLoading(true)

        const sendData = {
            session: sessionToken,
            userCode: code,
        }

        UserConfirmMfaApplication( sendData )
            .then(() => {
                setsnackBarContent({
                    isOpen: true,
                    severity: ServerityLevelSnackbar.SUCCESS,
                    text: "User confrim MFA successfully."
                })
                setAllRight(true)
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

    };

    const returnLogin = () => {
      goTo('/login')
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
            minHeight="95vh"
            >
            <Card sx={{ maxWidth: 400, padding: 3 }}>
                <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Scan QR code to confirm MFA
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Please scan the QR code with your authentication app and enter the 6-digit code.
                </Typography>
                <Box display="flex" justifyContent="center" my={2}>
                    <QRCodeSVG value={secretCodeQr} size={128} />
                </Box>
                <OtpInput handleConfirm={handleConfirm}/>
                <Box mt={2}>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={returnLogin}
                    disabled={allRight}
                    >
                    {/* {isLoading ? <CircularProgress size={24} /> : 'Confirm'} */}
                    Back to login
                    </Button>
                </Box>
                </CardContent>
            </Card>
            </Box>
        </>
    );
};

export default UserConfirmMFA;
