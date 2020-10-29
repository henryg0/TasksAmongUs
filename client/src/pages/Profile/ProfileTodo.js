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
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Image from 'react-bootstrap/Image';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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

export default function ProfileTodo(props) {
  const { user, todoId, todoName, dueDate, description, imageUrl, handleDelete, idx, renderInCounter, 
    selectedBadge, selectedBorder, selectedCelebration,
  } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  let displayDate = new Date(dueDate - new Date().getTimezoneOffset()*60*1000);
  const [expanded, setExpanded] = React.useState(false);
  const badges = getBadges();
  const borders = getBorders();
  const celebrations = getCelebrations();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteTodo() {
    enqueueSnackbar("Todo Deleted", {variant: "success"}) 
    axios.delete("/api/todo/" + todoId + "/delete")
      .then((res) => {
        console.log(res);
        console.log("in todo " + idx)
        handleDelete(idx);
      })
      .then((err) => {
        console.log(err);
      })
  }

  function completeTodo() {
    axios.patch(`/api/user/${user.id}/todo/${todoId}/status/complete`)
      .then((res) => {
        if (res.data.err) {
          enqueueSnackbar("Todo Didn't Complete", {variant: "error"});
        } else {
          handleDelete(idx);
          enqueueSnackbar(
            <Grid container direction="column">
              {renderInCounter()}
              <h3 className="text-center">Todo Completed!</h3>
              <video autoPlay loop playsInline muted width="300px">
                <source src={celebrations[selectedCelebration]} type="video/mp4" />
              </video>
              <Button className="text-white" onClick={() => closeSnackbar()}>Close</Button>
            </Grid>
          );
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div className={borders[selectedBorder].root}>
            <Avatar src={user.imageUrl} style={{width: "50px", height: "50px"}} />
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
            <Grid item xs={6}>
              {user.fullName}{" "}
              {badges[selectedBadge]}
              <br/>
              {todoName}
            </Grid>
            <Grid item xs={6} className="text-secondary text-right">
              {displayDate.toLocaleDateString()} <br/> {displayDate.toLocaleTimeString([], {timeStyle: 'short'})}
            </Grid>
          </Grid>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="text-center">
          <Typography variant="body2" color="textSecondary">
            {description ? description : "- empty description -"}
          </Typography>
          <Grid container direction="row" justify="center">
            <Modal icon={DoneIcon} component={
              ({onClose}) => {
                return (
                  <Card className="p-2" style={{maxWidth: "80%"}}>
                    <h2>Confirm That Todo Is Complete</h2>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => {completeTodo(); onClose()}}>Confirm</Button>
                    <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                  </Card>
                )
              }
            }/>
            <div>
              <IconButton href={`/edit/${todoId}`}>
                <EditIcon color="primary" />
              </IconButton>
            </div>
            <Modal icon={DeleteIcon} component={
              ({onClose}) => {
                return (
                  <Card className="p-2" style={{maxWidth: "80%"}}>
                    <h2>Confirm To Delete Todo</h2>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => {deleteTodo(); onClose()}}>Confirm</Button>
                    <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                  </Card>
                )
              }
            }/>
          </Grid>
          <Image
            style={{maxWidth:"300px"}}
            width="100%"
            src={imageUrl}
          />
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}