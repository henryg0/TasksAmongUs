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
import getBackgrounds from '../utils/get.backgrounds';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Border from './Border';
import Blur from 'react-blur';
import Grid from '@material-ui/core/Grid';
import Modal from './Modal';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

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

export default function Todo() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const backgrounds = getBackgrounds();
  const { enqueueSnackbar } = useSnackbar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteTodo() {
    enqueueSnackbar("Todo Deleted", {variant: "success"}) 
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Border>
              <Avatar aria-label="recipe" className={classes.avatar}>
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
            Ali Conners{" "}
            <Badge variant="info">NORMIE</Badge>
            <br/>
            Brunch this weekend
          </div>
        }
        subheader="Sep 14, 2016, 5 PM"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container direction="row">
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                I'll be in your neighborhood doing errands this weekend
                and I was thinking about trolling your garden…
              </Typography>
            </Grid>
            <Grid container item xs={1} direction="column" className="mr-3">
              <IconButton item xs>
                <EditIcon color="primary"/>
              </IconButton>
              <Modal icon={DeleteIcon} component={
                ({onClose}) => {
                  return <Card className="p-2">
                    <h2>Confirm To Delete Todo?</h2>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => {deleteTodo(); onClose()}}>Yes</Button>
                  </Card>
                }
              }/>
            </Grid>
          </Grid>
          <br/>
          {/* <Blur img="https://i.imgur.com/HLkruVA.jpg" style={{maxWidth:"400px"}} blurRadius={40}/> */}
          <Image
            style={{maxWidth:"400px"}}
            width="100%"
            src="https://i.imgur.com/HLkruVA.jpg"
          />
        </CardContent>
      </Collapse>
      <Divider />
    </Card>
  );
}