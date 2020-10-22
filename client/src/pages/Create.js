import React, { useState } from 'react';
import Layout from '../components/Layout';
import getBackgrounds from '../utils/get.backgrounds';
import authenticate from '../utils/authenticate';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import 'date-fns';
import { useSnackbar } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import Modal from '../components/Modal';

export default function Create() {
  let user = authenticate();
  const { enqueueSnackbar } = useSnackbar();
  const backgrounds = getBackgrounds();
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDesciption] = useState("");
  const [imageUrl, setImageUrl] = useState(backgrounds[0]);

  function renderBackGround() {
    let result = []
    for (let i=0; i < backgrounds.length; i++) {
      result.push(<FormControlLabel value={backgrounds[i]} control={<Radio />} key={i} label={<Image style={{width: "200px"}} src={backgrounds[i]} rounded></Image>} />)
    }
    return result
  }

  function createTodo(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let data = {
      todoName: todoName,
      dueDate: dueDate,
      description: description,
      imageUrl: imageUrl
    }
        
    setTodoName("");
    setDueDate(new Date());
    setDesciption("");
    setImageUrl(backgrounds[0]);

    axios.post(`/api/user/${user.id}/todo/create`, data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Todo Created", {variant: "success"})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={10} sm={9}>
            <h2>
              <Fab className="mb-1 mr-2" color="primary" href="/profile" size="small">
                <ArrowBackIcon className="white-text" />
              </Fab>
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
                        required
                        size="small"
                        fullWidth
                        label="Event Name" 
                        variant="outlined"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          required
                          inputVariant="outlined"
                          size="small"
                          label="Due Date"
                          value={dueDate}
                          onChange={setDueDate}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          required
                          inputVariant="outlined"
                          size="small"
                          label="Due Time"
                          value={dueDate}
                          onChange={setDueDate}
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
                      value={description}
                      inputProps={{ maxLength: 1000 }}
                      onChange={(e) => setDesciption(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Modal msg={"Change Background"} component={
                      ({onClose}) => {
                        return (
                          <Card 
                            className="p-2 text-center"
                            style={{
                              width: "80%",
                              height: "90vh",
                              overflowY: "auto",
                            }}
                          >
                            <h2>Choose New Background</h2>
                            <Card
                              style={{
                                overflowY: "auto",
                                height: "70vh",
                              }}
                            >
                              <Grid container direcion="row">
                                <RadioGroup required value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} onClick={onClose}>
                                  <Grid item>{renderBackGround()}</Grid>
                                </RadioGroup>
                              </Grid>
                            </Card>
                            <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                          </Card>
                        )
                      }
                    }/>
                  </Grid>
                  <Grid container item>
                    <Image style={{width: "100%"}} src={imageUrl} rounded></Image>
                  </Grid>
                  <Grid container item>
                    <Button type="submit" className="mb-2" variant="contained" color="primary" fullWidth>Create</Button>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}