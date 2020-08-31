import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Feed from '../components/getFeed';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    divSpace: {
        marginTop: '5%'
    }
}));


function Home() {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.divSpace}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} >
                        
                            <Feed />
                        
                    </Grid>
                    
                </Grid>
            </Container>
        </>
    );
}

export default Home;