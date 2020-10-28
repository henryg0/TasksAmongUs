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
    "imageUrl": imageUrl,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)

  docs = db.collection('Users')
  result = docs.where("userId", "==", userId).stream()

  for doc in result:
    return ({"msg": "User already exists"})

  # IF SOMEONE ELSE HAS SAME ID, IT OVERRIDES
  data["completedTodos"] = 0
  data["failedTodos"] = 0
  data["selectedBadge"] = "NORMIE"
  data["selectedBorder"] = "BLACK"
  data["selectedCelebration"] = "AMONG_US_WIN"
  data["unlockedBadges"] = {"NORMIE": True}
  data["unlockedBorders"] = {"BLACK": True}
  data["unlockedCelebrations"] = {"AMONG_US_WIN": True}
  db.collection("Users").document(userId).set(data)

  return ({"msg": "User created"})