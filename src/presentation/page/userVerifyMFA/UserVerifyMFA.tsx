import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Backdrop } from '@mui/material';
import useNavigationUtil from '../../../utils/GotoPath';
import OtpInput from '../../components/OTPinput/OtpInput';
import { UserVerifyMfaApplication } from '../../../application/authUser/authUser.application';
import { getCookiesData } from '../../../utils/CookiesData';
import { useUserActions } from '../../hooks/store/useUserActionsStore';
import SnackBarMessage, { ServerityLevelSnackbar, SnackBarProps } from '../../components/SnackBar/snackBar';

const UserVerifyMFA: React.FC = () => {

    const userEmail = getCookiesData( "email" )
    
    const { getUserSessionAction } = useUserActions()

    const { goTo } = useNavigationUtil()

    const [allRight, setAllRight] = useState(false)
    const [userSession, setuserSession] = useState(getUserSessionAction())
    const [openLoading, setopenLoading] = useState(false)
    const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
        isOpen: false,
        severity: ServerityLevelSnackbar.INFO,
        text: ''
    })
    const { isOpen, severity, text } = snackBarContent

    useEffect(() => {
      
        if (userSession === '') {
            goTo('/login')
        }
      
    }, [])
    

    const handleConfirm = ( code: string ) => {
        setopenLoading(true)
        
        const user = {
            email: userEmail ?? '',
            userCode: code,
            session: userSession,
        }


        UserVerifyMfaApplication( user )
            .then(user => {
                console.log(user);
                setsnackBarContent({
                    isOpen: true,
                    severity: ServerityLevelSnackbar.SUCCESS,
                    text: "User verify MFA successfully."
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
                <CardContent sx={{ gap: 2 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Verify Your Identity
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please enter the verification code that appears in your authentication app.
                    </Typography>
                    <OtpInput handleConfirm={handleConfirm}/>
                    <Box mt={2}>
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={returnLogin}
                        disabled={allRight}>
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

export default UserVerifyMFA;
