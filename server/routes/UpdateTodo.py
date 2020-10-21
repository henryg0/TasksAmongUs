from flask import request, Blueprint, jsonify
from ..database.database import db

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
  dueDate = data.get("dueDate")
  imageUrl = data.get("imageUrl")

  dataLog = {
    "todoName":todoName,
    "dueDate":dueDate,
    "imageUrl":imageUrl
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