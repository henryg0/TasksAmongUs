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
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import getBackgrounds from '../utils/get.backgrounds';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Border from './Border';

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
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const backgrounds = getBackgrounds();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Border>
              <Avatar aria-label="recipe" className={classes.avatar}>
                V
              </Avatar>
            </Border>
          </div>
        }
        action={
          <CardActions>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
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
          <Image
            style={{maxWidth: "400px"}}
            width="100%"
            src="https://i.imgur.com/HLkruVA.jpg"
          >

          </Image>
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}