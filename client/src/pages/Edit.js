import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router';

export default function Edit() {
  let user = authenticate();
  const { enqueueSnackbar } = useSnackbar();
  const backgrounds = getBackgrounds();
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(backgrounds[0]);
  const { todoId } = useParams();

  useEffect(() => {
    axios.get(`/api/todo/${todoId}`)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            setTodoName(res.data.todo.todoName)
            setDueDate(res.data.todo.dueDate)
            setDescription(res.data.todo.description)
            setImageUrl(res.data.todo.imageUrl)
          }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function getBackground() {
    let result = []
    for (let i=0; i < backgrounds.length; i++) {
      result.push(<FormControlLabel value={backgrounds[i]} control={<Radio />} key={i} label={<Image style={{width: "200px"}} src={backgrounds[i]} rounded></Image>} />)
    }
    return result
  }

  function submitEditTodo(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let data = {
      todoName: todoName,
      dueDate: dueDate,
      description: description,
      imageUrl: imageUrl
    }

    axios.patch(`/api/user/${user.id}/todo/${todoId}/update`, data)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data.todo);
            enqueueSnackbar("Todo Edited", {variant: "success"})
          }
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
              Edit
            </h2>
            <Card
              className="p-2 mb-2"
              variant="outlined"
            >
              <Form onSubmit={submitEditTodo}>
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
                      onChange={(e) => setDescription(e.target.value)}
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
                            }}
                          >
                            <h2>Choose a New Background</h2>
                            <Card
                              style={{
                                overflowY: "auto",
                                maxHeight: "600px",
                                height: "600px",
                              }}
                            >
                              <Grid container direcion="row">
                                <RadioGroup required value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} onClick={onClose}>
                                  <Grid item>{getBackground()}</Grid>
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
                    <Button type="submit" className="mb-2" variant="contained" color="primary" fullWidth>Finish Editing</Button>
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