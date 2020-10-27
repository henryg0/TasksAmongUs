from flask import request, Blueprint, jsonify
from ..database.database import db
from firebase_admin import firestore
import datetime
import time

getFinishedTodo = Blueprint("getFinishedTodo", __name__)

@getFinishedTodo.route("/api/user/<userId>/todo/finish", methods=["GET"])
def getFinishedTodoRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
  
  friends = db.collection("Friends").where("userId", "==", userId).stream()

  idDict = {doc.to_dict["friendId"]:True for doc in friends}
  idDict[userId] = True

  currentTime = time.time() * 1000

  docs = db.collection('Todo').where('completedDate', '<', currentTime).order_by(u'completedDate', direction=firestore.Query.ASCENDING).stream()
  
  sortedResults = [doc.to_dict() for doc in docs]
  
  res = []

  for todo in sortedResults:
    if idDict.get(todo["userId"]):
      res.append(todo)

  return {"todos": res}