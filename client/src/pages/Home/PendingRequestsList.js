import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

export default function PendingRequests(props) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios.get("/api/user/" + user.id + "/friend/pending")
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data.pending);
            setPendingRequests(res.data.pending);
          }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function cancelRequest(idx, requestId) {
    axios.delete("/api/friend/request/" + requestId + "/delete")
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          enqueueSnackbar("Friend Request Canceled", {variant: "success"});
          handleDelete(idx);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getPendingRequests() {
    let result = [];
    for (let idx = 0; idx < pendingRequests.length; idx++) {
      result.push(
        <PendingRequest 
          fullName = {pendingRequests[idx].friendFullName}
          imageUrl = {pendingRequests[idx].friendImageUrl}
          requestId = {pendingRequests[idx].requestId}
          key = {idx}
          idx = {idx}
        />
      );
    }
    return result;
  }

  const handleDelete = (idx) => {
    let newPendingRequests = [...pendingRequests];
    newPendingRequests.splice(idx, 1);
    setPendingRequests(newPendingRequests);
  }

  function PendingRequest(props) {
    const { fullName, imageUrl, requestId, idx } = props;

    return (
      <div>
        <Divider />
        <Grid container>
          <Avatar style={{height: "34px", width: "34px"}} className="mr-1 mt-2" src={imageUrl} />
          <Grid item xs className="mt-3">
            {fullName}
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              ({onClose}) => {
                return (
                  <Card className="p-2" style={{maxWidth: "80%"}}>
                    <h2>Confirm To Cancel Friend Request</h2>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => {
                        cancelRequest(idx, requestId); 
                        onClose();
                    }}>
                      Confirm
                    </Button>
                    <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                  </Card>
                )
              }
            }/>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Pending</h5>
        {getPendingRequests()}
      </Card>
    </div>
  );
}
