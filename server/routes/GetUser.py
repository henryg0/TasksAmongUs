from flask import Blueprint, request, jsonify
from ..database.database import db
import uuid

getUser = Blueprint("getUser", __name__)

@getUser.route("/api/user/<userId>", methods = ["GET"])
def getUserRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)
  
  docs = db.collection('Users')
  result = docs.where("userId", "==", userId).stream()

  for doc in result:
    return ({"user": doc.to_dict()})

  return (jsonify({"error": "User does not exist"}), 404)
