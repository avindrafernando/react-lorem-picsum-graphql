import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PostsApi from "../services/PostsApi";

const useStyles = makeStyles({
  card: {
    margin: 20
  },
  media: {
    minWidth: 250,
    minHeight: 375
  },
  hrefLinksNoStyle: {
    color: "inherit",
    cursor: "inherit",
    textDecoration: "none"
  }
});

const getSrc = (id) => {
  const imagePostWidth = 250;
  const imagePostHeight = 375;
  return "https://picsum.photos/" + imagePostWidth + "/" + imagePostHeight + "?image=" + id;
};

const getAuthorUserName = (str) => {
  return str.substring(str.lastIndexOf("@"));
};

const Posts = () => {
  const classes = useStyles();

  const [data, setData] = useState({ posts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await PostsApi.getPosts();

      setData({ posts: result.slice(0, 75) });
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {data.posts.map((post, index) => (
        <Grid item lg key={post.id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={getSrc(post.id)}
                title={post.author}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {getAuthorUserName(post.author_url)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <a className={classes.hrefLinksNoStyle} href={post.author_url} target="_blank" rel="noopener noreferrer">See My Work</a>
              </Button>
              <Button size="small" color="primary">
                <a className={classes.hrefLinksNoStyle} href={post.post_url} target="_blank" rel="noopener noreferrer">Image Source</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

};

export default Posts;

