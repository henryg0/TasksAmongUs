import React, { useState } from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

export default function SendFriendRequest(props) {
  const { user } = props;
  const [friendEmail, setFriendEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  
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
    console.log("send request")
    axios.post("/api/friend/request", data)
      .then((res) => {
        console.log("lmfao")
        if (res.data.error) {
          console.log(res.data.error); // for future put error
        } else {
          enqueueSnackbar("Friend Request Sent", {variant: "success"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <form className="mb-2">
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} className="mb-2">
          <TextField
            size="small"
            fullWidth
            label="Enter Friend's Email" 
            variant="outlined"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
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
  );
}
