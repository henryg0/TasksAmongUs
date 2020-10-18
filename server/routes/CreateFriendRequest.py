from flask import Blueprint, request, jsonify
from ..database.database import db
import uuid

createFriendRequest = Blueprint("createFriendRequest", __name__)

@createFriendRequest.route("/api/friend/request", methods=["POST"])
def createFriendRequestRoute():
  data = request.get_json()

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  userId = data.get("userId")
  friendId = data.get("friendId")
  firstName = data.get("firstName")
  lastName = data.get("lastName")
  imageUrl = data.get("imageUrl")
  
  error_log = {
    "userId":userId,
    "friendId":friendId,
    "firstName":firstName,
    "lastName":lastName,
    "imageUrl":imageUrl,
  }

  for key in error_log:
    if not error_log[key]:
      return (jsonify({"error": "Missing {}".format(key)}), 400)

  requestId = str(uuid.uuid4())
  data["requestId"] = requestId

  db.collection("Request").document(requestId).set(data)

  return {"msg": "Friend request sent"}