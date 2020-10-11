import React, { useState } from 'react';
import axios from "axios";
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import Form from 'react-bootstrap/Form';
import Container from '@material-ui/core/Container';
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

import ItsFine from '../../images/bg/ItsFine.jpg';
import DeadAmongUs from '../../images/bg/DeadAmongUs.jpg';
import KillAmongUs from '../../images/bg/KillAmongUs.jpg';
import CryingCat from '../../images/bg/CryingCat.jpg';
import Anakin from '../../images/bg/Anakin.jpg';
import FallingFallGuys from '../../images/bg/FallingFallGuys.jpg';
import FallingAmongUs from '../../images/bg/FallingAmongUs.png';
import SabotageAmongUs from '../../images/bg/SabotageAmongUs.jpg';
import Spongebob from '../../images/bg/Spongebob.jpg';
import ImposterAmongUs from '../../images/bg/ImposterAmongUs.jpg';
import EmergencyAmongUs from '../../images/bg/EmergencyAmongUs.jpg';
import CryingMJMeme from '../../images/bg/CryingMJMeme.jpg';
import ManCryingMeme from '../../images/bg/ManCryingMeme.jpeg';
import Zuckerberg from '../../images/bg/Zuckerberg.jpg';

export default function Create() {
  let user = authenticate();
  const [createTitle, setcreateTitle] = useState();
  const [createDueDateTime, setCreateDueDateTime] = useState(new Date());
  const [createDescription, setCreateDescription] = useState();
  const [createBackground, setCreateBackground] = useState("ItsFine");

  let d = {
    "ItsFine": ItsFine,
    "DeadAmongUs": DeadAmongUs,
    "KillAmongUs": KillAmongUs,
    "CryingCat": CryingCat,
    "Anakin": Anakin,
    "FallingFallGuys": FallingFallGuys,
    "FallingAmongUs": FallingAmongUs,
    "SabotageAmongUs": SabotageAmongUs,
    "Spongebob": Spongebob,
    "ImposterAmongUs": ImposterAmongUs,
    "EmergencyAmongUs": EmergencyAmongUs,
    "CryingMJMeme": CryingMJMeme,
    "ManCryingMeme": ManCryingMeme,
    "Zuckerberg": Zuckerberg,
  }

  function createTodo(e) {
    e.preventDefault();
    setcreateTitle("");
    setCreateDueDateTime(new Date());
    setCreateDescription("");
    setCreateBackground("ItsFine");

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
          <Grid item xs="10" md="9">
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
                    <Grid item xs="12" md="6">
                      <TextField
                        size="small"
                        fullWidth
                        label="Event Name" 
                        variant="outlined"
                        value={createTitle}
                        onChange={(e) => setcreateTitle(e.target.value)}
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
                    <Image style={{width: "100%"}} src={d[createBackground]} rounded></Image>
                  </Grid>
                  {/* <Grid container item>
                    <a href={d["Background" + background]} download="da-meme.jpg" style={{width:"100%"}}>
                      <Button className="mb-2" variant="contained" color="primary" fullWidth>Download</Button>
                    </a>
                  </Grid> */}
                  <Grid container item>
                    <Button type="submit" className="mb-2" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>
          <Grid item xs="10" md="3">
            <h2>Backgrounds
          </h2>
            <Card
              className="mb-2 p-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "450px",
                height: "450px",
              }}
            >
              <RadioGroup value={createBackground} onChange={(e) => setCreateBackground(e.target.value)}>
                <FormControlLabel value="ItsFine" control={<Radio />} label={<Image style={{width: "100%"}} src={ItsFine} rounded></Image>} />
                <FormControlLabel value="DeadAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={DeadAmongUs} rounded></Image>} />
                <FormControlLabel value="KillAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={KillAmongUs} rounded></Image>} />
                <FormControlLabel value="Anakin" control={<Radio />} label={<Image style={{width: "100%"}} src={Anakin} rounded></Image>} />
                <FormControlLabel value="CryingCat" control={<Radio />} label={<Image style={{width: "100%"}} src={CryingCat} rounded></Image>} />
                <FormControlLabel value="FallingFallGuys" control={<Radio />} label={<Image style={{width: "100%"}} src={FallingFallGuys} rounded></Image>} />
                <FormControlLabel value="FallingAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={FallingAmongUs} rounded></Image>} />
                <FormControlLabel value="SabotageAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={SabotageAmongUs} rounded></Image>} />
                <FormControlLabel value="Spongebob" control={<Radio />} label={<Image style={{width: "100%"}} src={Spongebob} rounded></Image>} />
                <FormControlLabel value="ImposterAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={ImposterAmongUs} rounded></Image>} />
                <FormControlLabel value="EmergencyAmongUs" control={<Radio />} label={<Image style={{width: "100%"}} src={EmergencyAmongUs} rounded></Image>} />
                <FormControlLabel value="CryingMJMeme" control={<Radio />} label={<Image style={{width: "100%"}} src={CryingMJMeme} rounded></Image>} />
                <FormControlLabel value="ManCryingMeme" control={<Radio />} label={<Image style={{width: "100%"}} src={ManCryingMeme} rounded></Image>} />
                <FormControlLabel value="Zuckerberg" control={<Radio />} label={<Image style={{width: "100%"}} src={Zuckerberg} rounded></Image>} />
              </RadioGroup>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}