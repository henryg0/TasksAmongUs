from flask import request, Blueprint, jsonify
from ..database.database import db
import uuid


acceptFriendRequest = Blueprint("acceptFriendRequest", __name__)

@acceptFriendRequest.route("/api/friend/request/<requestId>/accept", methods = ["POST"])
def acceptFriendRequestRoute(requestId):
  # add a checking method where only user can accept their own todo
  if not requestId:
    return (jsonify({"error": "Missing requestId"}), 400)

  requestInfo = db.collection('Request').document(requestId).get()
  if not requestInfo.exists:
    return (jsonify({"error": "Friend request not found"}), 404)
  requestInfo = requestInfo.to_dict()
  print (requestInfo)
  data = {
    "userId": requestInfo["userId"],
    "fullName": requestInfo["friendFullName"],
    "firstName": requestInfo["friendFirstName"],
    "lastName": requestInfo["friendLastName"],
    "imageUrl": requestInfo["friendImageUrl"],
    "friendId": requestInfo["friendId"]
  }

  docId = str(uuid.uuid4())
  db.collection("Friends").document(docId).set(data)

  data = {
    "userId": requestInfo["friendId"],
    "fullName": requestInfo["fullName"],
    "firstName": requestInfo["firstName"],
    "lastName": requestInfo["lastName"],
    "imageUrl": requestInfo["imageUrl"],
    "friendId": requestInfo["userId"]
  }
  docId = str(uuid.uuid4())
  db.collection("Friends").document(docId).set(data)
  db.collection('Request').document(requestId).delete()
  
  return ({"msg": "Friend request accepted"})