  import { makeStyles } from '@material-ui/core/styles';
import { PAPER_COLOR } from '../../constants/colors';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    backgroundColor: PAPER_COLOR
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
    backgroundColor: PAPER_COLOR
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));