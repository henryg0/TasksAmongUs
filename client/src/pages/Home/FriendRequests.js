import React from 'react';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function FriendRequests() {
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
            <Toast color="primary" component="span" msg="Friend Added">
              <CheckIcon />
            </Toast>
          </Grid>
          <Grid item xs={2}>
            <Toast color="primary" component="span" msg="Friend Rejected">
              <ClearIcon />
            </Toast>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
