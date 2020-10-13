import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Toast from '../../components/Toast';

export default function AddNewFriendForm() {
  const [friendEmail, setFriendEmail] = useState("");

  function print() {
    console.log("yeeet")
  }

  return (
    <form className="mb-2">
      <Grid container direction="row" justify="flex-end">
        <Grid item xs="12" className="mb-2">
          <TextField
            size="small"
            fullWidth
            label="Enter Friend's Email" 
            variant="outlined"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs="12">
          <Toast 
            fullWidth
            id="find-group-form" 
            color="primary"
            variant="contained"
            onClick={print}
            msg = "Friend request sent!"
          >
            Send Friend Request
          </Toast>
        </Grid>
      </Grid>
    </form>
  );
}
