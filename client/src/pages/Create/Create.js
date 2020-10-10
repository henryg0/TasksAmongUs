import React, { useState } from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Image from 'react-bootstrap/Image';
import Background1 from '../../images/memes.templates/dead-among-us.jpg';
import Background2 from '../../images/memes.templates/its-fine.jpg';
import Background3 from '../../images/memes.templates/kill-among-us.jpg';
import Background4 from '../../images/memes.templates/crying-cat.jpg';
import Background5 from '../../images/memes.templates/anakin.jpg';
import Background6 from '../../images/memes.templates/spongebob.jpg';

export default function Create() {
  let user = authenticate();
  const [createName, setCreateName] = useState();
  const [createDueDateTime, setCreateDueDateTime] = useState(new Date());
  const [createDescription, setCreateDescription] = useState();

  const [background, setBackground] = useState("1");

  let d = {
    'Background1': Background1,
    'Background2': Background2,
    'Background3': Background3,
    'Background4': Background4,
    'Background5': Background5,
    'Background6': Background6,
  }

  function getBackground(num) {
    let result = [];
    for (let i=1; i <= Object.keys(d).length; i++) {
      result.push(<FormControlLabel value={i.toString()} control={<Radio />} label={<Image style={{height: "125px", width: "240px"}} src={d["Background"+i]} rounded></Image>} />)
    }
    return result
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs="10" md="9">
            <h2>
              <Button className="mb-2 mr-2" variant="contained" color="primary" href="/todos" size="small">
                <div className="text-white">
                  &#x3c;
                </div>
              </Button>
              Create
            </h2>
            <Card
              className="p-2"
              variant="outlined"
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
                  <Grid container item>
                    <Image style={{width: "100%"}} src={d["Background" + background]} rounded></Image>
                  </Grid>
                  <Grid container item>
                    <Button className="mb-2" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
          <Grid item xs="10" md="3">
            <h2>Postcards</h2>
            <Card
              className="mb-2 p-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "450px",
                height: "450px",
              }}
            >
              <RadioGroup value={background} onChange={(e) => setBackground(e.target.value)}>
                {getBackground(5)}
              </RadioGroup>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}