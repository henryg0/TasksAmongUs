import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getBadges from '../../utils/get.badges';
import getBorders from '../../utils/get.borders';
import getCelebrations from '../../utils/get.celebrations';
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
import Image from 'react-bootstrap/Image';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { red, green } from '@material-ui/core/colors';

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
  }
}));

export default function FinishedTodo(props) {
  const { /*userId,*/ 
    fullName, profileUrl, selectedBadge, selectedBorder, selectedCelebration, 
    todoName, completedDate, description, imageUrl, status 
  } = props;
  const badges = getBadges();
  const borders = getBorders();
  const celebrations = getCelebrations();
  const displayDate = new Date(completedDate);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div className={borders[selectedBorder].root}>
            <Avatar src={profileUrl} style={{width: "50px", height: "50px"}} />
          </div>
        }
        action={
          <CardActions>
            <IconButton
              fontSize="small"
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
          <Grid container justify="space-between">
            <Grid item xs={6} lg={3}>
              {fullName}{" "}
              {badges[selectedBadge]}
              <br/>
              {todoName}
            </Grid>
            <Grid item xs={6} className="text-secondary text-right">
              {displayDate.toLocaleDateString()}
              <br/>
              {displayDate.toLocaleTimeString([], {timeStyle: 'short'})}
              {
                status ? 
                <div>
                  <FiberManualRecordIcon style={{ color: green[500], fontSize:"12"}} className="mb-1" /> 
                  {" "}
                  {"COMPLETED"}
                </div> :
                <div>
                  <FiberManualRecordIcon style={{ color: red[500], fontSize:"12"}} className="mb-1" /> 
                  {" "}
                  {"FAILED"}
                </div>
              }
            </Grid>
          </Grid>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="text-center">
          <Typography variant="body2" color="textSecondary">
            {description ? description : "- empty description -"}
          </Typography>
          <br />
          { status ?
            <video autoPlay loop playsInline muted style={{width: "100%", maxWidth:"300px"}}>
              <source src={celebrations[selectedCelebration]} type="video/mp4" />
            </video> :
            <Image
              style={{maxWidth:"300px"}}
              width="100%"
              src={imageUrl}
            />
          }
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}