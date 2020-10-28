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
import Badge from 'react-bootstrap/Badge';
import Border from '../../components/Border';
import Image from 'react-bootstrap/Image';
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
    backgroundColor: red[500],
  },
}));

export default function FinishedTodo(props) {
  const { userId, /*todoId,*/ todoName, completedDate, description, imageUrl, /*idx*/ status } = props;
  let displayDate = new Date(completedDate);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // const { enqueueSnackbar } = useSnackbar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // function deleteTodo() {
  //   enqueueSnackbar("Todo Deleted", {variant: "success"}) 
  // }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Border borderColor="black">
            <Avatar className={classes.avatar}>
              A
            </Avatar>
          </Border>
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
          <div>
            {userId}{" "}
            <Badge variant="info">NORMIE</Badge>
            <br/>
            {todoName}
          </div>
        }
        subheader={
          <div>
            {displayDate.toLocaleDateString() + ", " + displayDate.toLocaleTimeString([], {timeStyle: 'short'})}
            {" "}
            {
              status ? 
              <div>{"COMPLETED"}</div> :
              <div>{"FAILED"}</div>
            }
          </div>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <br/>
          { status ?
          <Blur img="https://i.imgur.com/HLkruVA.jpg" style={{maxWidth:"400px"}} blurRadius={40}/> :
          <Image
            style={{maxWidth:"400px"}}
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