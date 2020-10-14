import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from "@material-ui/core/Divider";

export default function PendingRequests() {
  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Pending</h5>
        <Divider />
        <Grid container>
          <Grid item xs className="mt-3">
            Honbon's Twin
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" component="span">
              <CheckIcon />
            </IconButton>
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
