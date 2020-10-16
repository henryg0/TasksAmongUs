from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions

createUser = Blueprint("createUser", __name__)

@createUser.route("/api/user/create", methods = ["POST"])
def createUserRoute():
  data = request.get_json()

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  userId = data.get("userId")
  fullName = data.get("fullName")
  firstName = data.get("firstName")
  lastName = data.get("lastName")
  email = data.get("email")
  imageUrl = data.get("imageUrl")

  error_log = {
    "userId": userId,
    "fullName": fullName,
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "imageUrl": imageUrl
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)


  # IF SOMEONE ELSE HAS SAME ID, IT OVERRIDES
  db.collection("Users").document(userId).set(data)

  return ({"msg": "User created"})