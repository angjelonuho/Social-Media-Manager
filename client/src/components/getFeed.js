import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import ReactTimeAgo from 'react-time-ago';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 1,
  },
  root: {
    maxWidth: 280,
    marginTop: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  mediaHidden: {
    display: 'contents',

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
  },
  CardText: {
    padding: '0 16px 0 16px',
  },
  iconFont: {
    fontSize: '1rem',
  },
  fontFont: {
    fontSize: '.8rem',
    color: '#838587',
  },
  Vicon: {
    height: '1.25em',
    fill: 'rgb(29, 161, 242)',
    verticalAlign: 'text-bottom',
  }
}));


function Feed() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const Vicon =
    <svg viewBox="0 0 24 24" aria-label="Verified account" className={classes.Vicon}>
      <g>
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
      </g>
    </svg>

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`http://localhost:8081/feed`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
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

        <Grid className={classes.gridRoot} container direction="row" justify="space-evenly" alignItems="baseline">
          {items.map(item => {

            if (item.retweeted === false
              && item.is_quote_status === false
              && item.favorited === false
              && item.truncated === false) {
              return (

                <Card className={classes.root} key={item.id}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="avatar" src={item.user.profile_image_url} className={classes.avatar}></Avatar>
                    }
                    title={item.user.verified ? <span aria-label="checkmark">{item.user.name} {Vicon}</span> : item.user.name}
                    subheader={<ReactTimeAgo date={item.created_at} />}
                  />

                  <CardContent className={classes.CardText}>
                    <Typography variant="subtitle2" component="p">
                      {item.text}
                    </Typography>
                  </CardContent>
                  {item.entities.media === undefined ?
                    "" :
                    <CardMedia
                      className={classes.media}

                      image={item.entities.media[0].media_url}
                      title={item.entities.media.media_url}
                    />
                  }
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <ChatBubbleOutlineIcon className={classes.iconFont} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <RepeatIcon className={classes.iconFont} />
                    </IconButton>
                    <Typography className={classes.fontFont}>
                      {new Intl.NumberFormat('en-US', { style: 'decimal' }).format(item.retweet_count)}
                    </Typography>
                    <IconButton aria-label="share">
                      <FavoriteBorderIcon className={classes.iconFont} />
                    </IconButton>
                    <Typography className={classes.fontFont}>
                      {new Intl.NumberFormat('en-US', { style: 'decimal' }).format(item.favorite_count)}
                    </Typography>
                    <IconButton aria-label="share">
                      <BookmarkBorderIcon className={classes.iconFont} />
                    </IconButton>

                  </CardActions>
                </Card>

              );

            }

          })}
        </Grid>

      </>
    );
  }
}
export default Feed;