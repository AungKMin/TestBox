import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import notesLogo from '../../images/notesLogo.png';
import notesText from '../../images/notesText.png';
import { LOGOUT, REMOVE } from '../../constants/actionTypes';
import { PAPER_COLOR } from '../../constants/colors';

const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.flash);
    const history = useHistory();
    const location = useLocation();

    const logout = () => { 
        dispatch({ type: LOGOUT });

        history.push('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        // check if user's token has expired
        if (token) { 
            const decodedToken = decode(token); 

            if (decodedToken.exp * 1000 < new Date().getTime()) { 
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
            <AppBar style={{position: 'relative'}} className={classes.appBar} position="static" color="inherit">
                <Link to="/" onClick={ ()=> dispatch({ type: REMOVE }) } className={classes.brandContainer}>
                    {/* <Typography height="30px" style={{fontSize: 30, height: '30px', textDecoration:'none'}}>CodeBox</Typography> */}
                    <img src={notesText} alt="logo" height="30px" />
                    <img className={classes.image} src={notesLogo} alt="notes" height="40px" />
                </Link>
                <Button component={Link} to="/posts" variant="contained">View Submissions</Button>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up</Button>
                    )}
                </Toolbar>
            </AppBar>
            {
                error ? 
                <Alert style={ {marginBottom: '1rem'}} severity="error">{message}</Alert>
                : null
            }
        </>
    );
};

export default Navbar
