import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    width: "80%"
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    width: "20%"
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: { 
    display: 'flex', justifyContent: 'space-between', flexDirection: 'column'
  },
  commentsInnerContainer: { 
    height: '200px', overflowY: 'auto', marginRight: '30px'
  },
  summaryBox: { 
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  byBox: { 
    marginTop: '1rem'
  }
}));