const express = require('express');
const firebase = require('firebase');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;


// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.post("/api/user/:userId/todo/create", (req, res) => {
  var date;
  const {userId} = req.params;
  const {todoName, description, dueDate, imageUrl} = req.body;
  
  if (userId == null || userId.length === 0) {
    return res.status(400).json({error: "Missing userId"});
  }

  let data = {
    "todoName" : todoName,
    "description" : description,
    "dueDate" : dueDate,
    "imageUrl" : imageUrl
  }

  date = Date.parse(data["dueDate"]);
  data["dueDate"]  = date;

  console.log(date)

  todoId = 123123123;
  data["todoId"] = todoId;

  console.log(data);

  db.collection("Todo").doc(todoId).set(data);

  for (let item in data) {
    if (!data[item] ) {
      return res.status(400).json({error: "Missing " + item})
    }
  }

  return res.status(200).json({msg: "worked"})
  
});

// app.use(express.json({limit: "50mb"}));
// app.use(express.urlencoded({extended: true}));



app.listen(port, function () {
  console.log(`Server listening on ${port}`)
})