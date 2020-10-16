from flask import request, Blueprint, jsonify
from ..database.database import db

getFriendRequest = Blueprint("getFriendRequest", __name__)

@getFriendRequest.route("/api/user/<userId>/friend/request", methods=["GET"])
def getFriendRequestRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  docs = db.collection('Request')
  result = docs.where("friendId", "==", userId).stream()
  
  res = [doc.to_dict() for doc in result]
  
  return {"friends": res}