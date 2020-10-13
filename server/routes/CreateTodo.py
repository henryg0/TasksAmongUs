from flask import Blueprint, request, jsonify
from ..database.database import session
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
  duedate = data.get("duedate")
  imageUrl = data.get("imageUrl")

  error_log = {
    "taskName":taskName,
    "description":description,
    "duedate":duedate,
    "imageUrl":imageUrl
  }

  for key in error_log:
    if not error_log[key]:
      return jsonify({f"error: missing {key}"}, 400)

  addedDate = date.today()
  addedDate.strftime('%y-%m-%d')
  addedDate = datetime.datetime(addedDate).date()

  todoId = uuid.uuid4()
  status = False
  print (todoId)
  print (type(addedDate))
  query = (f"INSERT INTO todo.UserTodo (userId, todoId, status, addedDate, duedate, taskName, description, imageUrl) VALUES ({userId}, '{todoId}', {status}, '{addedDate}', {duedate}, '{taskName}', '{description}', '{imageUrl}')")
  print (query)
  result = session.execute(query).one()
  print (result)
  return {"msg": "Todo created"}