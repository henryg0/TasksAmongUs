import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getBadges from '../../utils/get.badges';
import getBorders from '../../utils/get.borders';
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
import Badge from 'react-bootstrap/Badge';
import Border from '../../components/Border';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { blue } from '@material-ui/core/colors';

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
}));

export default function FinishedTodo(props) {
  const { 
    fullName, profileUrl, selectedBadge, selectedBorder,
    todoName, dueDate, description, imageUrl 
  } = props;
  const badges = getBadges();
  const borders = getBorders(); 
  const displayDate = new Date(dueDate);
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
              <br/>
              <FiberManualRecordIcon style={{ color: blue[500], fontSize:"12"}} className="mb-1" /> 
              {" "}
              {"ONGOING"}
            </Grid>
          </Grid>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="text-center">
          <Typography variant="body2" color="textSecondary">
            {description ? description : "- empty description -"}
          </Typography>
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}