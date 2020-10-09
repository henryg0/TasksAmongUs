import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function AddNewFriendForm() {
  const [groupCode, setGroupCode] = useState("");

  return (
    <form className="mb-2">
      <Grid container direction="row" justify="flex-end">
        <Grid item xs="12" className="mb-2">
          <TextField
            id="AddNewFriend"
            size="small"
            fullWidth
            label="Enter Friend's Email" 
            variant="outlined"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
        </Grid>
        <Grid item xs="12">
          <Button 
            fullWidth
            id="find-group-form" 
            color="primary"
            variant="contained"
          >
            Send Friend Request
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
