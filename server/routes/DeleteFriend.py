from flask import request, Blueprint, jsonify
from ..database.database import db

deleteFriend = Blueprint("deleteFriend", __name__)

@deleteFriend.route("/api/friend/<userFriendIdOne>/<userFriendIdTwo>/delete", methods = ["DELETE"])
def deleteFriendtRoute(userFriendIdOne, userFriendIdTwo):
  # add a checking method where only user can delete their own todo
  if not userFriendIdOne:
    return (jsonify({"error": "Missing userFriendIdOne"}), 400)

  if not userFriendIdTwo:
    return (jsonify({"error": "Missing userFriendIdTwo"}), 400)

  db.collection('Friends').document(userFriendIdOne).delete()
  db.collection('Friends').document(userFriendIdTwo).delete()
  
  return ({"msg": "Friend deleted"})