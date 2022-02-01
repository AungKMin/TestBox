import React, { Component, useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { updatePost } from '../../actions/posts';
import { UPDATEDFALSE } from '../../constants/actionTypes';

export default ({ readOnly = true }) => {

    const { post, updated } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState( null );

    const onEditorStateChange = (newEditorState) => { 
        if (updated) { 
            dispatch({type: UPDATEDFALSE});
        }
        setEditorState(newEditorState);
    }

    const setEditorReference = (ref) => {
      ref?.current?.focus(); 
    }

    useEffect(() => {
        if (post.body) {
            const contentState = convertFromRaw(post.body);
            setEditorState(EditorState.createWithContent(contentState)); // create editor state from database's raw state
        } else { 
            setEditorState( EditorState.createEmpty() );
        }
    }, []); // load body from database on mount

    const handleClick = (event) => { 
        const rawState = convertToRaw(editorState.getCurrentContent());

        dispatch(updatePost(post._id, { ...post, body: rawState }));
    }

    return (
        <div>
            <Editor 
                editorStyle={{minHeight: '10rem', maxHeight: '20rem'}}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                readOnly = {readOnly}
                toolbarHidden = {readOnly}
            />
            { !readOnly ? 
                <Button style={{ margin: '10px', backgroundColor: updated ? "#4caf50" : "#1976d2", color: "white" }} size="small" variant="contained" onClick={handleClick} >
                    Update Post
                </Button>
            : null }
        </div>
    );
}