import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from "@material-ui/core/Divider";

export default function ConfirmedRequests() {
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
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Henry Gip
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Maxwell Wong
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
