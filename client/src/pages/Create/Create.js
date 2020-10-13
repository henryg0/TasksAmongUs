import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Toast from '../../components/Toast';
import getBackgrounds from '../../utils/get.backgrounds';
import authenticate from '../../utils/authenticate';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
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
import axios from "axios";

export default function Create() {
  let user = authenticate();
  const backgrounds = getBackgrounds();
  const [createTitle, setcreateTitle] = useState();
  const [createDueDateTime, setCreateDueDateTime] = useState(new Date());
  const [createDescription, setCreateDescription] = useState();
  const [createBackground, setCreateBackground] = useState(backgrounds[0]);

  function getBackground() {
    let result = []
    for (let i=0; i < backgrounds.length; i++) {
      result.push(<FormControlLabel value={backgrounds[i]} control={<Radio />} label={<Image style={{width: "100%"}} src={backgrounds[i]} rounded></Image>} />)
    }
    return result
  }

  function createTodo(e) {
    e.preventDefault();
    setcreateTitle("");
    setCreateDueDateTime(new Date());
    setCreateDescription("");
    setCreateBackground(backgrounds[0]);

    let data = {
      userId: user.id,
      todoTitle: createTitle,
      todoDueDateTime: createDueDateTime,
      todoDescription: createDescription,
      todoBackground: createBackground,
    }

    console.log(data);

    axios.post("/api/group/create", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10} sm={9}>
            <h2>
              <Button className="mb-2 mr-2" variant="contained" color="primary" href="/profile" size="small">
                <div className="text-white">
                  &#x3c;
                </div>
              </Button>
              Create
            </h2>
            <Card
              className="p-2 mb-2"
              variant="outlined"
            >
              <Form onSubmit={createTodo}>
                <Grid container spacing={1} direction="column">
                  <Grid container item spacing={1}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Event Name" 
                        variant="outlined"
                        value={createTitle}
                        onChange={(e) => setcreateTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                    <Grid item xs={12} md={3}>
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
                      fullWidth
                      label="Event Desciption" 
                      variant="outlined"
                      multiline
                      rows={4}
                      rowsMax={10}
                      value={createDescription}
                      onChange={(e) => setCreateDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid container item>
                    <Image style={{width: "100%"}} src={createBackground} rounded></Image>
                  </Grid>
                  {/* <Grid container item>
                    <a href={d["Background" + background]} download="da-meme.jpg" style={{width:"100%"}}>
                      <Button className="mb-2" variant="contained" color="primary" fullWidth>Download</Button>
                    </a>
                  </Grid> */}
                  <Grid container item>
                    <Toast type="submit" className="mb-2" variant="contained" color="primary" fullWidth msg="Todo Created">Submit</Toast>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>
          <Grid item xs={10} sm={3}>
            <h2>Backgrounds
          </h2>
            <Card
              className="mb-2 p-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "600px",
                height: "600px",
              }}
            >
              <RadioGroup value={createBackground} onChange={(e) => setCreateBackground(e.target.value)}>
                {getBackground()}
              </RadioGroup>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}