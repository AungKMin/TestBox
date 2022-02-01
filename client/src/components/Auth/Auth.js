import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import dotenv from 'dotenv';

import Icon from './icon';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth'; 
import { AUTH } from '../../constants/actionTypes';
import notesLogo from '../../images/notesLogo.png';

dotenv.config();

const initialStateFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const defaultGooglePassword = process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD ? process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD : 'development';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState(initialStateFormData);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (event) => { 
        event.preventDefault();

        if (isSignup) { 
            dispatch(signup(formData, history));
        } else { 
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (event) => { 
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const switchMode = () => { 
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => { 
        const result = res?.profileObj; // don't throw error if res is undefined
        const token = res?.tokenId;

        try { 

            let googleFormData = { firstName: result.givenName, lastName: result.familyName, email: result.email, password: defaultGooglePassword, confirmPassword: defaultGooglePassword };

            if (isSignup) { 
                dispatch(signup(googleFormData, history));
            } else { 
                dispatch(signin(googleFormData, history));
            }

            // dispatch({ type: AUTH, data: { result, token }});

            // history.push('/');
        } catch (error) { 
            console.log(error);
        }
    };

    const googleFailure = () => { 
        console.log("Google Sign In unsuccessful. Try again later.")
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <img style={{display: 'inline'}} src={notesLogo} alt="notes" height="50px" />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign up" : "Sign in"}
                    </Button>
                    <GoogleLogin
                        clientId="341067776893-7e6548p61ujt83popdrkfp6pe7o85eo3.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Sign {isSignup ? "Up" : "In"} with Google                      
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already a user? Sign in here" : "Don't have an account? Sign up here"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
