import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '12%',
  },
  buttonTwit:{
    minWidth: '230px',
    background: 'linear-gradient(45deg, #00ACEE, #36D8FF)',
  },
  buttonFace:{
    minWidth: '230px',
    background: 'linear-gradient(120deg, #3b5998)',
  },
  buttonInst:{
    minWidth: '230px',
    background: 'linear-gradient(45deg, #405de6,#5851db,#833ab4,#c13584,#e1306c,#fd1d1d)',
  }


}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">

      <Paper className={classes.paper} elevation={3}>
        <List>
          <ListItem>
            <Button variant="contained" color="primary" className={classes.buttonTwit} startIcon={<TwitterIcon />}>
              Login with twitter
            </Button>
          </ListItem>

          <ListItem>
            <Button variant="contained" color="primary" className={classes.buttonFace} startIcon={<FacebookIcon />}>
              Login with facebook
            </Button>
          </ListItem>

          <ListItem>
            <Button variant="contained" color="primary" className={classes.buttonInst} startIcon={<InstagramIcon />}>
              Login with instagram
            </Button>
          </ListItem>

        </List>

      </Paper>

    </Grid>
  );
}
