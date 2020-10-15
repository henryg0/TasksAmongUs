import React from 'react';
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

export default function FriendRequests() {
  const { enqueueSnackbar } = useSnackbar();

  function acceptRequest() {
    enqueueSnackbar("Friend Request Accepted", {variant: "success"})  
  }

  function denyRequest() {
    enqueueSnackbar("Friend Request Denied", {variant: "success"})  
  }

  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Requests</h5>
        <hr/>
        <Grid container>
          <Grid item xs className="mt-3">
            Honbon Boy
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={acceptRequest}>
              <CheckIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm To Reject Friend Request</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {denyRequest(); onClose()}}>Yes</Button>
                </Card>
              }
            }/>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
