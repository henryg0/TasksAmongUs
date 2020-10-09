import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function Highlights() {
  return (
    <Card 
      variant="outlined"
      style={{
        overflow: "auto",
        maxHeight: "450px",
        height: "450px",
      }}
    >
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Ali Connors" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Ali Connors"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Successfully PASSED Drivers Test!!! • 10/1/20 
                </Typography>
                {/* {" — I'll be in your neighborhood doing errands this…"} */}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="William Jones" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="William Jones"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  FAILED to wash the dishes • 10/1/20 
                </Typography>
                {/* {" — Wish I could come, but I'm out of town this…"} */}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Reynolds" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Reynolds"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  FINISHED college application!! • 10/1/20 
                </Typography>
                {/* {' — Do you have Paris recommendations? Have you ever…'} */}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Squirtle" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Squirtle"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  USED hyperbeam!! • 10/1/20 
                </Typography>
                {/* {' — Do you have Paris recommendations? Have you ever…'} */}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
}