from flask import request, Blueprint, jsonify
from ..database.database import db


acceptFriendRequest = Blueprint("acceptFriendRequest", __name__)

@acceptFriendRequest.route("/api/friend/request/<requestId>/accept", methods = ["POST"])
def acceptFriendRequestRoute(requestId):
  # add a checking method where only user can accept their own todo
  if not requestId:
    return (jsonify({"msg": "Missing requestId"}), 400)

  requestInfo = db.collection('Request').document(requestId).get()
  if not requestInfo.exists:
    return (jsonify({"error": "Friend request not found"}), 404)
  requestInfo = requestInfo.to_dict()

  db.collection("Friends").document(requestId).set(requestInfo)

  db.collection('Request').document(requestId).delete()
  
  return ({"msg": "Friend request accepted"})