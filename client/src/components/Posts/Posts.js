import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => { 
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    if (!user) { 
        return (
            <Alert severity="info">
                <AlertTitle> You're not logged in </AlertTitle>
                <strong>Create an account or log in!</strong>
            </Alert>
        );
    }

    if (!posts.length && !isLoading) { 
        return (
            <Alert severity="info">
                <AlertTitle> No notes </AlertTitle>
                <strong>Create a note!</strong>
            </Alert>
        );
    }

    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;