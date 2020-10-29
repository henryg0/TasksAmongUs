import React, { useState } from 'react';
import Layout from '../components/Layout';
import getPostcards from '../utils/get.postcards';
import authenticate from '../utils/authenticate';
import checkAchievements from '../utils/check.achievements';
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
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

export default function Create() {
  let user = authenticate();
  const { enqueueSnackbar } = useSnackbar();
  const postcards = getPostcards();
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(postcards[0]);

  function displayBackgrounds() {
    let result = [];
    for (let i=0; i < postcards.length; i++) {
      result.push(<FormControlLabel value={postcards[i]} control={<Radio />} key={i} label={<Image style={{width: "200px"}} src={postcards[i]} rounded></Image>} />)
    }
    return result;
  }

  function createTodo(e) {
    e.preventDefault();
    e.stopPropagation();

    if (dueDate.getTime() < new Date().getTime()) {
      enqueueSnackbar("Date/Time invalid", {variant: "error"})
      return;
    }
    
    let data = {
      todoName: todoName,
      dueDate: Date.UTC(dueDate),
      description: description,
      imageUrl: imageUrl
    }
    
    axios.post(`/api/user/${user.id}/todo/create`, data)
    .then((res) => {
      console.log(res);
      checkAchievements(user.id, enqueueSnackbar, {
        todoDescription: todoName + " " + description,
        todoImageUrl: imageUrl,
        todoDate: new Date(),
      });
      enqueueSnackbar("Todo Created", {variant: "success"})
    })
    .catch((err) => {
      console.log(err);
    })

    setTodoName("");
    setDueDate(new Date());
    setDescription("");
    setImageUrl(postcards[0]);
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
                        label="Todo Name"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        fullWidth
                        inputProps={{ maxLength: 50 }}
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Modal msg={"Change Postcard"} component={
                      ({onClose}) => {
                        return (
                          <Card 
                            className="p-2 text-center"
                            style={{
                              width: "90%",
                              height: "85vh",
                              overflowY: "auto",
                            }}
                          >
                            <Grid container direction="column" justify="space-between" style={{height: "100%"}}>
                              <h3>Change Postcard {" "}<Tooltip title="Postcard for your friends if you fail the todo"><HelpIcon /></Tooltip></h3>
                              <Grid container alignItems="stretch">
                                <Card
                                  style={{
                                    overflowY: "auto",
                                    height: "65vh",
                                  }}
                                  variant="outlined"
                                  className="p-2 bg-light"
                                >
                                  <Grid container direcion="row" justify="center">
                                    <RadioGroup required value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} onClick={onClose}>
                                      <Grid item>{displayBackgrounds()}</Grid>
                                    </RadioGroup>
                                  </Grid>
                                </Card>
                              </Grid>
                              <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                            </Grid>
                          </Card>
                        )
                      }
                    }/>
                  </Grid>
                  <Image style={{width: "100%"}} src={imageUrl} rounded/>
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