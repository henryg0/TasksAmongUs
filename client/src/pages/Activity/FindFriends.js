import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';  
import Card from '@material-ui/core/Card';

export default function FindFriends() {
  const [groupCode, setGroupCode] = useState("");

  return (
    <div>
      <h2>Friends</h2>
      <form className="mb-2">
        <Grid container direction="row" justify="flex-end">
          <Grid container item xs="12" md="9" className="mr-1 mb-1">
            <TextField
              id="groupCodeForm"
              size="small"
              fullWidth
              label="Send Friend Request" 
              variant="outlined"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
            />
          </Grid>
          <Grid container item xs className="mb-1">
            <Button 
              fullWidth
              id="find-group-form" 
              color="primary"
              variant="contained"
            >
              Find
            </Button>
          </Grid>
        </Grid>
      </form>
      <Paper className="mb-2"><h5>Requests</h5></Paper>
      <Card className="mb-2"></Card>
      <Paper className="mb-2"><h5>Pending</h5></Paper>
      <Card className="mb-2"></Card>
      <Paper className="mb-2"><h5>Friends</h5></Paper>
      <Card className="mb-2"></Card>
    </div>
  );
}
