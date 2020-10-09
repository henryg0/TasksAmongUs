import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function ConfirmedRequests() {
  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Friends</h5>
        <hr/>
        <Grid container justify="space between">
          <Grid item xs className="mt-3">
            Vincent Tieu
          </Grid>
          <Grid item xs="2">
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        <hr/>
        <Grid container justify="space between">
          <Grid item xs className="mt-3">
            Henry Gip
          </Grid>
          <Grid item xs="2">
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        <hr/>
        <Grid container justify="space between">
          <Grid item xs className="mt-3">
            Maxwell Wong
          </Grid>
          <Grid item xs="2">
            <IconButton color="primary" component="span">
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
