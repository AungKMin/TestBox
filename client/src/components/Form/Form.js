import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles.js';
import { createPost, updatePost } from '../../actions/posts'; 

const Form = ({ currentId, setCurrentId}) => { 
    const [postData, setPostData] = useState({ title: '', message: '', tags: [], team: '', selectedFile: '' }); 
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId ) : null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (event) => { 
        event.preventDefault();
        if (currentId) { 
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, history));
        } else { 
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        }

        clear();
    }

    if (!user?.result?.name) { 
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create submissions.
                </Typography>
            </Paper>
        )
    } 

    const clear = () => { 
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: [], selectedFile: ''});
    }

    // functions for chip input
    const handleAdd = (tag) => { setPostData({ ...postData, tags: postData.tags.concat(tag)}) };
    const handleDelete = (tagToDelete) => setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Submission</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Name" 
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Email" 
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                />
                <TextField 
                    name="team" 
                    variant="outlined" 
                    label="How many people work on your team?" 
                    fullWidth
                    value={postData.team}
                    onChange={(event) => setPostData({ ...postData, team: event.target.value })}
                />
                {/* <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })}
                /> */}
                <ChipInput 
                    style={{width: '96%', margin: '10px 0'}}
                    name="tags" 
                    variant="outlined" 
                    label="Favorite source control tools" 
                    value={postData.tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    newChipKeys={[' ']}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;