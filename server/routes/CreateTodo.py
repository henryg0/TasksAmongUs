from flask import Blueprint, request, jsonify
from ..database.database import db
import uuid
from datetime import date

createTodo = Blueprint("createTodo", __name__)

@createTodo.route("/api/user/<userId>/todo/create", methods=["POST"])
def createTodoRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)    

  data = request.get_json()

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  todoName = data.get("todoName")
  description = data.get("description")
  dueDate = data.get("dueDate")
  imageUrl = data.get("imageUrl")

  error_log = {
    "todoName":todoName,
    "dueDate":dueDate,
    "imageUrl":imageUrl
  }

  for key in error_log:
    if not error_log[key]:
      return (jsonify({"error": "Missing {}".format(key)}), 400)

  addedDate = date.today()
  addedDate.strftime('%y-%m-%d')
  
  todoId = str(uuid.uuid4())
  status = False

  data["addedDate"] = str(addedDate)
  data["todoId"] = todoId
  data["status"] = status
  data["userId"] = userId
  
  db.collection("Todo").document(todoId).set(data)
  return data