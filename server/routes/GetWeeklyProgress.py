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

  docs = db.collection("Todo").order_by("completedDate", direction=firestore.Query.ASCENDING).start_at({u'completedDate' : lowerBound}).end_at({u'completedDate' : currentTime}).stream()
  docDict = [doc.to_dict() for doc in docs]

  weekdays = {
    0 : "Monday",
    1 : "Tuesday",
    2 : "Wednesday",
    3 : "Thursday",
    4 : "Friday", 
    5 : "Saturday",
    6 : "Sunday"
  }
  
  todoDates = {datetime.datetime.fromtimestamp(todo["completedDate"]/1000).strftime("%m/%d/%Y") : [[], []] for todo in docDict}
    
  
  for todo in docDict:
    # weekday = datetime.datetime(todo["completedDate"]).get_weekday()
    day = datetime.datetime.fromtimestamp(todo["completedDate"]/1000).strftime("%m/%d/%Y")

    # day = weekdays[weekday]
    if todo.get("status"):
      todoDates[day][0].append(todo)
    else:
      if currentTime > todo["completedDate"]:
        todoDates[day][1].append(todo)
  print(todoDates)
  
  completed = [{int(datetime.datetime.strptime(dateCompleted, "%m/%d/%Y").timestamp()) : {"completed":len(todoDates[dateCompleted][0]), "failed":len(todoDates[dateCompleted][1])} for dateCompleted in todoDates}]

  return {"todos": completed}