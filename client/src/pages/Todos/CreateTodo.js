import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default function CreateTodo() {
  const [createName, setCreateName] = useState();
  const [createDueDateTime, setCreateDueDateTime] = useState(new Date());
  const [createDescription, setCreateDescription] = useState();

  return (
    <Card
      className="p-2"
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
      }}
    >
      <form>
        <Grid container spacing={1} direction="column">
          <Grid container item spacing={1}>
            <Grid item xs="12" md="6">
              <TextField
                size="small"
                fullWidth
                label="Event Name" 
                variant="outlined"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
            </Grid>
            <Grid item xs="12" md="3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  inputVariant="outlined"
                  size="small"
                  label="Due Date"
                  value={createDueDateTime}
                  onChange={setCreateDueDateTime}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs="12" md="3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  inputVariant="outlined"
                  size="small"
                  label="Due Time"
                  value={createDueDateTime}
                  onChange={setCreateDueDateTime}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container item>
            <TextField
              size="small"
              fullWidth
              label="Event Desciption" 
              variant="outlined"
              multiline
              rows={4}
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}