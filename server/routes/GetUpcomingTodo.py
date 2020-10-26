from flask import request, Blueprint, jsonify
from ..database.database import db
from firebase_admin import firestore
import datetime
import time

getUpcomingTodo = Blueprint("getUpcomingTodo", __name__)

@getUpcomingTodo.route("/api/user/<userId>/todo/upcoming", methods=["GET"])
def getUpcomingTodoRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
  
  friends = db.collection("Friends").where("userId", "==", userId).stream()

  idDict = {doc.to_dict["friendId"]:True for doc in friends}
  idDict[userId] = True

  currentTime = time.time() * 1000

  docs = db.collection('Todo').where('dueDate', '>=', currentTime).order_by(u'dueDate', direction=firestore.Query.ASCENDING).stream()
  
  sortedResults = [doc.to_dict() for doc in docs]
  
  res = []
  
  for todo in sortedResults:
    if idDict.get(todo["userId"]):
      res.append(todo)

  return {"todos": res}