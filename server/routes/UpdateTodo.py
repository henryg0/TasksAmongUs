from flask import request, Blueprint, jsonify
from ..database.database import db
import datetime

updateTodo = Blueprint("updateTodo", __name__)

@updateTodo.route("/api/user/<userId>/todo/<todoId>/update", methods = ["PATCH"])
def updateTodoRoute(userId, todoId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
      
  if not todoId:
    return (jsonify({"error": "Missing todoId"}), 400)    
  
  data = request.get_json()
  
  if not data:
    return (jsonify({"error": "Missing data"}), 400)

  todoName = data.get("todoName")
  description = data.get("description")
  dueDate = datetime.datetime.strptime(data.get("dueDate"), '%Y-%m-%dT%H:%M:%S.%fZ').timestamp() * 1000
  imageUrl = data.get("imageUrl")
  completedDate = dueDate + 1

  dataLog = {
    "todoName":todoName,
    "dueDate":dueDate,
    "imageUrl":imageUrl,
    "description":description,
    "completedDate":completedDate
  }

  for key in dataLog:
    if not dataLog[key]:
      return (jsonify({"error": "Missing {}".format(key)}), 400)
  
  doc = db.collection("Todo").document(todoId).get()
  
  if not doc.exists:
    return (jsonify({"error": "Todo does not exist"}), 404)

  docDict = doc.to_dict()
  if not (docDict.get("userId") and docDict["userId"] == userId):
    return (jsonify({"error": "User is not allowed to update this field"}), 403)

  for key in dataLog:
    docDict[key] = dataLog[key]

  db.collection("Todo").document(todoId).set(docDict)
      
  return {"todo": docDict}