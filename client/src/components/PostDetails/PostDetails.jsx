import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import TextEditor from './TextEditor';

import { getPost, getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from './CommentSection';

const PostDetails = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id;
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]); 

    useEffect(() => { 
        if (post) { 
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) { 
        return null; // check if the post has been loaded to prevent component from rendering early
    }

    if (isLoading) { 
        return ( 
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em"/>
            </Paper>
        )
    }

    const recommendedPosts = posts.filter( ({ _id }) => _id !== post._id );

    const openPost = (_id) => history.push(`/posts/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post?.title}</Typography>
                    <div className={classes.summaryBox}>
                        <Typography gutterBottom variant="h6" component="p" style={{display: 'inline'}}>{"Favorite Source Control Tools: "}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="p" style={{display: 'inline'}}>{post?.tags.map((tag) => `${tag} `)}</Typography>
                    </div>
                    <div className={classes.summaryBox}>
                        <Typography gutterBottom variant="h6" component="p" style={{display: 'inline'}}>{"Email: "}</Typography>
                        <Typography gutterBottom variant="h6" component="p" style={{display: 'inline'}}>{post.message}</Typography>
                    </div>
                    {/* <TextEditor readOnly = {!(userId === post.creator)}/> */}
                    <div className={classes.byBox}>
                        <Typography variant="h6">Created by: {post?.name}</Typography>
                        <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
                    </div>
                    {/* <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/>
                    <Divider style={{ margin: '20px 0' }} /> */}
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {/* {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">Related notes: </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </Paper>
    )
}

export default PostDetails
