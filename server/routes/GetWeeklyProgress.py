from flask import request, Blueprint, jsonify
from ..database.database import db
from firebase_admin import firestore
import datetime
import time

getWeeklyProgress = Blueprint("getWeeklyProgress", __name__)

@getWeeklyProgress.route("/api/user/<userId>/weekly", methods=["GET"])
def getWeeklyProgressRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
  
  # each week: 604800000
  lowerBound = int(time.time()*1000) - 604800000
  
  # each day: 86400000 ms
  currentTime = int(time.time()*1000)
  today = datetime.datetime(currentTime).get_weekday()

  docs = db.collection("Todo").orderBy("completedDate", firebase.Query.ASCENDING).start_at({u'completedDate' : lowerBound}).end_at({u'completedDate' : currentTime}).stream()
  docDict = [docs.to_dict() for doc in docs]

  weekdays = {
    0 : "Monday",
    1 : "Tuesday",
    2 : "Wednesday",
    3 : "Thursday",
    4 : "Friday", 
    5 : "Saturday",
    6 : "Sunday"
  }
  
  todoDates = {
    "Monday": [[], []],
    "Tuesday": [[], []],
    "Wednesday": [[], []],
    "Thursday": [[], []],
    "Friday": [[], []],
    "Saturday": [[], []],
    "Sunday": [[], []]
  }
  
  for todo in docDict:
    weekday = datetime.datetime(todo["completedDate"]).get_weekday()
    day = weekdays[weekday]
    if todo.get("status"):
      todoDates[day][0].append(todo)
    else:
      if currentTime > todo["completedDate"]:
        todoDates[day][1].append(todo)
  
  return {"todos": todoDates}