import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

export default function SendFriendRequest() {
  const [friendEmail, setFriendEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  
  function send() {
    enqueueSnackbar("Friend Request Sent", {variant: "success"})
  }

  return (
    <form className="mb-2">
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} className="mb-2">
          <TextField
            size="small"
            fullWidth
            label="Enter Friend's Email" 
            variant="outlined"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            fullWidth
            id="find-group-form" 
            color="primary"
            variant="contained"
            onClick={send}
          >
            Send Friend Request
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
