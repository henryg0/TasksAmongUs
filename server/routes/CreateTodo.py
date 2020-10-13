from flask import Blueprint, request, jsonify
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

  taskName = data.get("taskName")
  description = data.get("description")
  deadline = data.get("deadline")
  duedate = data.get("duedate")
  imageUrl = data.get("imageUrl")

  error_log = {
    "taskName":taskName,
    "description":description,
    "deadline":deadline,
    "duedate":duedate,
    "imageUrl":imageUrl
  }

  for key in error_log:
    if not error_log[key]:
      return jsonify({f"error: missing {key}"}, 400)

  addedDate = date.today()
  addedDate.strftime('%y-%m-%d')

  todoId = uuid.uuid4()

  return {"msg": "Todo created"}