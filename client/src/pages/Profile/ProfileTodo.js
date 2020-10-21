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
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Border from '../../components/Border';
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
  const classes = useStyles();
  const { user, todoId, todoName, dueDate, description, imageUrl, handleDelete, idx } = props;
  let displayDate = new Date(dueDate);
  const [expanded, setExpanded] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    enqueueSnackbar(
      <Grid container direction="column">
        <h3 className="text-center">Todo Completed!</h3>
        <video autoPlay loop muted width="300px">
          <source src={"https://i.imgur.com/ooOK2Mn.mp4"} type="video/mp4" />
        </video>
        <Button className="text-white" onClick={() => closeSnackbar()}>Close</Button>
      </Grid>
    ) 
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Border>
            <Avatar className={classes.avatar} src={user.imageUrl} />
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
            {user.fullName}{" "}
            <Badge variant="dark">MOD</Badge>
            <br/>
            {todoName}
          </div>
        }
        subheader={
          displayDate.toDateString()
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <br />
          <Grid container direction="row">
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
          {/* <Blur img={imageUrl} style={{maxWidth:"400px"}} blurRadius={40}/> */}
          <Image
            style={{maxWidth:"400px"}}
            width="100%"
            src={imageUrl}
          />
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}