import React from "react";
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";

export default function PendingRequests() {
  const { enqueueSnackbar } = useSnackbar();

  function cancelRequest() {
    enqueueSnackbar("Friend Request Canceled", {variant: "success"}) 
  }

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
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return <Card className="p-2">
                  <h2>Confirm To Cancel Friend Request</h2>
                  <Button fullWidth variant="contained" color="secondary" onClick={() => {cancelRequest(); onClose()}}>Yes</Button>
                </Card>
              }
            }/>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
