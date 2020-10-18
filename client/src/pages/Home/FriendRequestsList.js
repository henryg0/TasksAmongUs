import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

export default function FriendRequestsList(props) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    axios.get("/api/user/" + user.id + "/friend/request")
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data.friends);
            setFriendRequests(res.data.friends);
          }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function acceptRequest(idx, requestId) {
    axios.post("/api/friend/request/" + requestId + "/accept")
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          handleDelete(idx);
          enqueueSnackbar("Friend Request Accepted", {variant: "success"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function denyRequest(idx, requestId) {
    axios.delete("/api/friend/request/" + requestId + "/delete")
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          enqueueSnackbar("Friend Request Denied", {variant: "success"});
          handleDelete(idx);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getFriendRequests() {
    let result = [];
    for (let idx = 0; idx < friendRequests.length; idx++) {
      result.push(
        <FriendRequest 
          fullName = {friendRequests[idx].fullName}
          imageUrl = {friendRequests[idx].imageUrl}
          requestId = {friendRequests[idx].requestId}
          idx={idx}
          key={idx}
        />
      );
    }
    return result;
  }

  const handleDelete = (idx) => {
    let newFriendRequests = [...friendRequests];
    newFriendRequests.splice(idx, 1);
    setFriendRequests(newFriendRequests);
  }

  function FriendRequest(props) {
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
            <IconButton color="primary" onClick={() => (acceptRequest(idx, requestId))}>
              <CheckIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Modal icon={ClearIcon} component={
              (({onClose}) => {
                return (
                  <Card className="p-2" style={{maxWidth: "80%"}}>
                    <h2>Confirm To Reject Friend Request</h2>
                    <Button 
                      fullWidth variant="contained" 
                      color="secondary" 
                      onClick={() => {
                        denyRequest(idx, requestId); 
                        onClose();
                      }}
                    >Confirm
                    </Button>
                    <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                  </Card>
                )
              })}/>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Requests</h5>
        {getFriendRequests()}
      </Card>
    </div>
  );
}
