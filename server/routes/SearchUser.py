from flask import Blueprint, request, jsonify
from ..database.database import db

searchUser = Blueprint("searchUser", __name__)

@searchUser.route("/api/user/search", methods = ["GET"])
def searchUserRoute():
  email = request.args.get("email")

  if not email:
    return (jsonify({"error": "Missing email"}), 400)

  docs = db.collection('Users')
  result = docs.where("email", "==", email).stream()
  
  
  for doc in result:
    return {"user": doc.to_dict()}

  return (jsonify({"error": "User does not exist"}), 404)
