import React, { useEffect } from "react";
import { useSnackbar } from 'notistack';
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Layout from "../components/Layout";
import authenticate from "../utils/authenticate";

export default function FriendLink() {
  const user = authenticate();
  const { email } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  let sendFriendEmail = email;

  useEffect(() => {
    if (sendFriendEmail === user.email) {
      enqueueSnackbar("Can't Friend Yourself! (╯°□°)╯︵ ┻━┻", {variant: "error"});
      return
    }

    let friend;
    axios.get("/api/user/search", {
      params: {
        email: sendFriendEmail
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
          enqueueSnackbar("Invalid Email! (╯°□°)╯︵ ┻━┻", {variant: "error"});
        } else {
          friend = res.data.user;
          let data = {
            "userId": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "fullName": user.fullName,
            "imageUrl": user.imageUrl,
            "friendId": friend.userId,
            "friendFirstName": friend.firstName,
            "friendLastName": friend.lastName,
            "friendFullName": friend.fullName,
            "friendImageUrl": friend.imageUrl
          }
      
          axios.post("/api/friend/request", data)
            .then((res) => {
              if (res.data.error) {
                console.log(res.data.error);
              } else {
                enqueueSnackbar("Friend Request Sent!", {variant: "success"});
                window.location.replace("/")
              }
            })
            .catch((err) => {
              console.log(err);
              enqueueSnackbar("Friend Request Failed! (╯°□°)╯︵ ┻━┻", {variant: "failed"});
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  });

  return (
    <Layout user={user}>
      <Container className="text-center">
        <h3>Processing Friend Request For...</h3>
        <h5>{email}</h5>
        <a href="/">
          <Button
            color="primary"
            variant="contained"
          >Return</Button>
        </a>
      </Container>
    </Layout>
  )
}