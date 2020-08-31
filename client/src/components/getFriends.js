import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  
  card: {
    maxWidth: '100%',
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: 80, // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    marginTop: -20,
    border: '1px solid',
  },
  headCard: {
    padding: '0px 0px 0px 10px',
  },
  name: {
    fontSize: 10,
    textAlign: 'left',
    paddingLeft: 17,
  },
  screenName: {
    fontSize: 7,
    textAlign: 'left',
    paddingLeft: 17,
  },
  desc: {
    fontSize: 10,
    textAlign: 'left'
  },
  smallIcon: {
    fontSize: 15,
  },
  smallIconText: {
    fontSize: 10,
  },
  smallIcon0: {
    fontSize: 15,
    paddingLeft: 20,
  },
  smallIconText0: {
    fontSize: 10,
    paddingLeft: 2,
  },
  buttonsDiv: {
    padding: '0 0 13px 13px',
  },
  descDiv: {
    padding: '8px 8px 8px 16px',
  },


}));



function Friends() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const classes = useStyles();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`http://localhost:8081/followers`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.users);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {items.map(item => (
          <Card className={classes.card} key={item.id}>

            <CardMedia
              className={classes.media}
              image={item.profile_banner_url}
              title="Banner"
            />
            <CardHeader className={classes.headCard}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={item.profile_image_url}></Avatar>
              }
            />
            <Typography className={classes.name}>{item.name}</Typography>
            <Typography className={classes.screenName}>@{item.screen_name}</Typography>

            <CardContent className={classes.descDiv}>
              <Typography className={classes.desc}>{item.description}</Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.buttonsDiv}>
              <LocationOnOutlinedIcon className={classes.smallIcon} color="primary" />
              <Typography className={classes.smallIconText}>
                {item.location? item.location: "Undisclosed"}
              </Typography>
              <SupervisorAccountOutlinedIcon className={classes.smallIcon0} color="primary" />
              <Typography className={classes.smallIconText0}>
                {
                  new Intl.NumberFormat('en-US', {style: 'decimal'}).format(item.followers_count)
                }
                </Typography>
              <PeopleOutlineOutlinedIcon className={classes.smallIcon0} color="primary" />
              <Typography className={classes.smallIconText0}>
                {
                  new Intl.NumberFormat('en-US', {style: 'decimal'}).format(item.friends_count)
                }
              </Typography>
            </CardActions>

          </Card>
        ))}
      </>
    );
  }
}


export default Friends;