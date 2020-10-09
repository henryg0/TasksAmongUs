import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export default function Activity() {
  return (
    <div>
      <Card style={{height:"500px"}} variant="outlined">
        <Grid container direction="row">
          <Grid item>
            <List>
              {['Maxwell Wong', 'Vincent Tieu', 'Henry Gip', 'Vincent Tieu'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Divider style={{height:"500px"}} orientation="vertical" flexItem />
          <Grid className="m-2" item>
              this is a testing!
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
