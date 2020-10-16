from flask import request, Blueprint, jsonify
from ..database.database import db


getPendingFriendRequest = Blueprint("getPendingFriendRequest", __name__)

@getPendingFriendRequest.route("/api/user/<userId>/friend/pending", methods=["GET"])
def getPendingFriendRequestRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
  
  docs = db.collection('Request')
  result = docs.where("userId", "==", userId).stream()
  res = [doc.to_dict() for doc in result]
  
  return {"pending" : res}