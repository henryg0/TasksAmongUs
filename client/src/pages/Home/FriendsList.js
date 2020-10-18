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

export default function FriendsList(props) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    axios.get("/api/user/" + user.id + "/friend")
      .then((res) => {
        console.log(res)
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data.friends);
            setFriendsList(res.data.friends);
          }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function unFriend() {
    enqueueSnackbar("Friend Removed", {variant: "success"}) 
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
        />
      );
    }
    return result;
  }

  const handleDelete = (idx) => {
    let newFriendsList = [...friendsList];
    newFriendsList.splice(idx, 1);
    setFriendsList(newFriendsList);
  }

  function Friend(props) {
    const {idx, fullName, imageUrl} = props;
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
                    <Button fullWidth variant="contained" color="secondary" onClick={() => {unFriend(); onClose()}}>Confirm</Button>
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
        <h5 className="text-center">Friends</h5>
        {getFriendsList()}
      </Card>
    </div>
  );
}
