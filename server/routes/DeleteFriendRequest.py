from flask import request, Blueprint, jsonify
from ..database.database import db

deleteFriendRequest = Blueprint("deleteFriendRequest", __name__)

@deleteFriendRequest.route("/api/friend/request/<requestId>/delete", methods = ["DELETE"])
def deleteFriendRequestRoute(requestId):
  # add a checking method where only user can delete their own todo
  if not requestId:
    return (jsonify({"msg": "Missing requestId"}), 400)

  db.collection('Request').document(requestId).delete()
  
  return ({"msg": "Friend request deleted"})