import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';

import useStyles from './styles';

function useQuery () { 
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const user = localStorage.getItem("profile");
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; // query string's page parameter; if not populated, we must be on the first page
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (event) => { 
        if (event.key === 'Enter') { 
            searchPost();
        }
    }

    const handleAdd = (tag) => {setTags(tags.concat(tag))};

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () => { 
        if (search.trim() || tags.length) { 
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else { 
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl" style={{overflow: 'hidden'}}>
                <Grid container justify="space-between" alignItems="stetch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                autoComplete="off"
                                name="search" 
                                variant="outlined" 
                                label="Search Submissions"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={ (event) => setSearch(event.target.value) }
                            />
                            <ChipInput 
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Source Control"
                                variant="outlined"
                                newChipKeys={[' ']}
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" disabled={!user}>Search</Button>
                        </AppBar> 
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        { (!searchQuery && !tags.length) ? 
                            <Paper elevation={6} className={classes.pagination} >
                                <Pagination page={page} />
                            </Paper> : null
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
