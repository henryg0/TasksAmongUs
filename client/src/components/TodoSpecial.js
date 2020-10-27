import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import getPostcards from '../utils/get.postcards';
import Badge from 'react-bootstrap/Badge';
import Border from './Border';
import Vincent from '../images/vincent.jpg';
import Blur from 'react-blur';

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "black",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const backgrounds = getPostcards();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Border>
              <Avatar aria-label="recipe" className={classes.avatar} src={Vincent} />
            </Border>
          </div>
        }
        action={
          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        }
        title={
          <div>
            Vincent Tieu{" "}
            <Badge variant="dark">MOD</Badge>
            <br/>
            Coming for da memes
          </div>
        }
        subheader="Sep 14, 2016, 5 PM"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            I'll be in your neighborhood doing errands this weekend
            and I was thinking about trolling your garden…
          </Typography>
          <br/>
          <Blur img="https://i.imgur.com/HLkruVA.jpg" style={{maxWidth:"400px"}} blurRadius={40}/>
          {/* <Image
            style={{maxWidth: "400px"}}
            width="100%"
            src="https://i.imgur.com/HLkruVA.jpg"
          /> */}
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}