from flask import request, Blueprint, jsonify
from ..database.database import db


getAllFriends = Blueprint("getAllFriends", __name__)

@getAllFriends.route("/api/user/<userId>/friend", methods = ["GET"])
def getAllFriendsRoute(userId):
  # add a checking method where only user can accept their own todo
  if not userId:
    return (jsonify({"msg": "Missing requestId"}), 400)


  docs = db.collection('Friends')
  result = docs.where("userId", "==", userId).stream()
  res = []
  for doc in result:
    doc = doc.to_dict()
    del doc["userId"]
    res.append(doc)

  docs = db.collection('Friends')
  result = docs.where("friendId", "==", userId).stream()
  
  res = []
  for doc in result:
    doc = doc.to_dict()
    del doc["userId"]
    res.append(doc)

  return {"friends": res}