from flask import request, Blueprint, jsonify
from ..database.database import db


getAllFriends = Blueprint("getAllFriends", __name__)

@getAllFriends.route("/api/user/<userId>/friend", methods = ["GET"])
def getAllFriendsRoute(userId):
  # add a checking method where only user can accept their own todo
  if not userId:
    return (jsonify({"error": "Missing requestId"}), 400)


  docs = db.collection('Friends')
  result = docs.where("userId", "==", userId).stream()
  res = [doc.to_dict() for doc in result]
  return {"friends": res}