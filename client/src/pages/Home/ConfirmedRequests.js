import React from "react";
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";

export default function ConfirmedRequests() {
  const { enqueueSnackbar } = useSnackbar();

  function unFriend() {
    enqueueSnackbar("Friend Removed", {variant: "success"}) 
  }

  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Friends</h5>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Vincent Tieu
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm To Unfriend?</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {unFriend(); onClose()}}>Yes</Button>
                </Card>
              }
            }/>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Henry Gip
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm To Unfriend?</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {unFriend(); onClose()}}>Yes</Button>
                </Card>
              }
            }/>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Maxwell Wong
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm to Unfriend?</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {unFriend(); onClose()}}>Yes</Button>
                </Card>
              }
            }/>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
