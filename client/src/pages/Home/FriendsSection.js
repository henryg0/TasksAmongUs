import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Modal from '../../components/Modal';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

export default function FriendsSection(props) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [sendFriendEmail, setSendFriendEmail] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/user/${user.id}/friend/pending`)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            // console.log(res.data.pending);
            setPendingRequests(res.data.pending);
          }
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`/api/user/${user.id}/friend/request`)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            // console.log(res.data.friends);
            setFriendRequests(res.data.friends);
          }
      })
      .catch((err) => {
        console.log(err);
      })
    
    axios.get(`/api/user/${user.id}/friend`)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            // console.log(res.data.friends);
            setFriendsList(res.data.friends);
          }
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  function sendFriendRequest() {
    let data = {
      "userId": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "fullName": user.fullName,
      "imageUrl": user.imageUrl,
      "friendId": "116465095581499993123",
      "friendFirstName": "Vincent",
      "friendLastName": "Tieu",
      "friendFullName": "Vincent Tieu",
      "friendImageUrl": "https://lh3.googleusercontent.com/a-/AOh14GgjemiWQMzd61kB2omYeJQ2kRLse_yCsauN7fpa=s96-c",
    }

    axios.post("/api/friend/request", data)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error); // for future put error
        } else {
          renderInPendingRequest();
          enqueueSnackbar("Friend Request Sent", {variant: "success"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function renderInFriend(friend) {
    let newFriendsList = [...friendsList];
    newFriendsList.push(friend);
    setFriendsList(newFriendsList);
  }

  function acceptRequest(idx, requestId) {
    axios.post(`/api/friend/request/${requestId}/accept`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          renderInFriend(res.data.friend);
          renderOutFriendRequest(idx);
          enqueueSnackbar("Friend Request Accepted", {variant: "success"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function denyFriendRequest(idx, requestId) {
    axios.delete(`/api/friend/request/${requestId}/delete`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          enqueueSnackbar("Friend Request Denied", {variant: "success"});
          renderOutFriendRequest(idx);
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

  const renderOutFriendRequest = (idx) => {
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
                        denyFriendRequest(idx, requestId); 
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

  function renderInPendingRequest() {
    let newPendingRequests = [...pendingRequests];
    let friend = {
      friendFullName: "Jimmy",
      friendImageUrl: "https://lh4.googleusercontent.com/-GMCM6cpY3T8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl03Fy45UTtf4YqH6hlYAaIFH1agA/s96-c/photo.jpg",
    }
    newPendingRequests.push(friend);
    setPendingRequests(newPendingRequests);
  }

  function cancelPendingRequest(idx, requestId) {
    axios.delete("/api/friend/request/" + requestId + "/delete")
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          enqueueSnackbar("Friend Request Canceled", {variant: "success"});
          renderOutPendingRequest(idx);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getPendingRequests() {
    console.log(pendingRequests);
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

  const renderOutPendingRequest = (idx) => {
    let newPendingRequests = [...pendingRequests];
    newPendingRequests.splice(idx, 1);
    setPendingRequests(newPendingRequests);
  }

  function removeFriend(idx, userFriendIdOne, userFriendIdTwo) {
    axios.delete(`/api/friend/${userFriendIdOne}/${userFriendIdTwo}/delete`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          enqueueSnackbar("Friend Removed", {variant: "success"});
          renderOutFriend(idx);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getFriendsList() {
    let result = [];
    for (let idx = 0; idx < friendsList.length; idx++) {
      result.push(
        <Friend 
          fullName={friendsList[idx].fullName}
          imageUrl = {friendsList[idx].imageUrl}
          key={idx}
          idx={idx}
          userFriendIdOne={friendsList[idx].userFriendIdOne}
          userFriendIdTwo={friendsList[idx].userFriendIdTwo}
        />
      );
    }
    return result;
  }

  const renderOutFriend = (idx) => {
    let newFriendsList = [...friendsList];
    newFriendsList.splice(idx, 1);
    setFriendsList(newFriendsList);
  }

  function Friend(props) {
    const {idx, fullName, imageUrl, userFriendIdOne, userFriendIdTwo} = props;
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
                  <Card className="p-2">
                    <h2>Confirm To Unfriend</h2>
                    <Button 
                      fullWidth variant="contained" 
                      color="secondary" 
                      onClick={() => {
                        removeFriend(idx, userFriendIdOne, userFriendIdTwo); 
                        onClose()}
                      }>
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
                        cancelPendingRequest(idx, requestId); 
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
      <form className="mb-2">
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={12} className="mb-2">
            <TextField
              size="small"
              fullWidth
              label="Enter Friend's Email" 
              variant="outlined"
              value={sendFriendEmail}
              onChange={(e) => setSendFriendEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              fullWidth
              id="find-group-form" 
              color="primary"
              variant="contained"
              onClick={sendFriendRequest}
            >
              Send Friend Request
            </Button>
          </Grid>
        </Grid>
      </form>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Requests</h5>
        {getFriendRequests()}
      </Card>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Pending</h5>
        {getPendingRequests()}
      </Card>
      <Card className="mb-2 p-2" variant="outlined">
        <h5 className="text-center">Friends</h5>
        {getFriendsList()}
      </Card>
    </div>
  );
}
