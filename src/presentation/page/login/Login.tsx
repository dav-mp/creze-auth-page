import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserLoginApplication } from '../../../application/authUser/authUser.application'

import { useForm } from 'react-hook-form';
import { UserLogin } from '../../../core/interfaces/authInterfaces.interface';
import SnackBarMessage, { ServerityLevelSnackbar } from '../../components/SnackBar/snackBar';
import { SnackBarProps } from '../../components/SnackBar/snackBar';
import { setCookiesData } from '../../../utils/CookiesData';
import useNavigationUtil from '../../../utils/GotoPath';
import { useUserActions } from '../../hooks/store/useUserActionsStore';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));
  
  const SignUpContainer = styled(Stack)(({ theme }) => ({
    minHeight: '90dvh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));

const LoginRegister = () => {

    const { goTo } = useNavigationUtil()
    const { addUserTokenAction, addUserSecretCodeAction, addUserSessionAction } = useUserActions()

    const [allRight, setAllRight] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [openLoading, setopenLoading] = useState(false)
    const [snackBarContent, setsnackBarContent] = useState<SnackBarProps>({
        isOpen: false,
        severity: ServerityLevelSnackbar.INFO,
        text: ''
    })

    const { isOpen, severity, text } = snackBarContent


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        // reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { email, password: passwordValue} = watch()

    const password = useRef("");
    password.current = watch("password", "");

    const onSubmit = handleSubmit((data: UserLogin) => {

        setopenLoading(true)

        UserLoginApplication( data )
            .then(user => {
                setsnackBarContent({
                    isOpen: true,
                    severity: ServerityLevelSnackbar.SUCCESS,
                    text: "User successfully logged in."
                })
                setCookiesData( data.email )
                addUserTokenAction( { token: user.csrf_token } )
                setAllRight(true)
                setTimeout(() => {
                    goToMFA( user.data[0].message, user.data[0]?.session, user.data[0]?.secretode )
                }, 2000)
                // goTo( "/userConfirm" )
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


    })

    const goToMFA = ( type: string, session: string, secretCode: string = '' ) => {
        addUserSessionAction( { session } )
        switch (type) {
            case 'MFA_SETUP':
                
                addUserSecretCodeAction( { secretCode } )

                goTo('/confirmMFA')

                break;
            
            case 'SOFTWARE_TOKEN_MFA':

                goTo('/verifyMFA')

                break;

            default:
                break;
        }

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
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                    Sign in
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} >
                    <Stack spacing={3}>

                        <TextField 
                        required
                        label="Email"
                        value={email} 
                        {...register("email", { 
                            required: "Email is mandatory", 
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "The email is not valid"
                            }
                        })}/>
                        {errors.email && <Typography variant='body1' color={'red'}>{errors.email.message}</Typography>}

                        <TextField
                        required
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordValue}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword
                                    ? <VisibilityIcon/>
                                    : <VisibilityOffIcon/>
                                }
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        {...register("password", {
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: "The password is not valid"
                            },
                            required: {
                            value: true,
                            message: "Password is mandatory",
                            },
                            minLength: {
                            value: 6,
                            message: "Password must be greater than 6 characters",
                            },
                        })}
                        />
                        {errors.password && <Typography variant='body1' color={'red'}>{errors.password.message}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={allRight}
                        >
                            Sign In
                        </Button>
                        <Grid container spacing={3}>
                            <Grid item >
                                <Button variant='text' onClick={() => goTo('/')} >
                                    {"You don't have an account? Register"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}

export default LoginRegister