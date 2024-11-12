import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
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
import { AuthRegisterApplication } from '../../../application/authUser/authUser.application'

import { useForm } from 'react-hook-form';
import { UserRegister as UserRegisterInterface } from '../../../core/interfaces/authInterfaces.interface';
import SnackBarMessage, { ServerityLevelSnackbar } from '../../components/SnackBar/snackBar';
import { SnackBarProps } from '../../components/SnackBar/snackBar';
import { setCookiesData } from '../../../utils/CookiesData';
import useNavigationUtil from '../../../utils/GotoPath';


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

const UserRegister = () => {

    const { goTo } = useNavigationUtil()

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
            name: ""
        },
    });

    const { email, password: passwordValue, name } = watch()

    const password = useRef("");
    password.current = watch("password", "");

    const onSubmit = handleSubmit((data: UserRegisterInterface) => {

        setopenLoading(true)

        AuthRegisterApplication( data )
            .then(user => {
                console.log(user);
                setsnackBarContent({
                    isOpen: true,
                    severity: ServerityLevelSnackbar.SUCCESS,
                    text: "User created successfully."
                })
                setCookiesData( data.email )
                goTo( "/userConfirm" )
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
            })


    })
  
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
                    Sign up
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} >
                    <Stack spacing={3}>

                        <TextField 
                        required
                        label="name"
                        value={name} 
                        {...register("name", { 
                            required: "name is mandatory",
                        })}/>
                        {errors.name && <Typography variant='body1' color={'red'}>{errors.name.message}</Typography>}

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
                        >
                            Sign In
                        </Button>
                        <Grid container spacing={3}>
                            <Grid item >
                                <Link href="/" variant="body2">
                                    {"Do you already have an account? Log in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Stack>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}

export default UserRegister