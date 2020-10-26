from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions, firestore

updateUnlockedBorders = Blueprint("updateUnlockedBorders", __name__)

@updateUnlockedBorders.route("/api/user/<userId>/unlocked/borders/update", methods = ["PUT"])
def updateUnlockedBordersRoute(userId):
  data = request.get_json()

  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  unlockedBorders = data.get("unlockedBorders")

  error_log = {
    "unlockedBorders": unlockedBorders,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)
  
  fields = {"unlockedBorders." + item: True for item in unlockedBorders}

  ref = db.collection("Users").document(userId).update(fields)

  return ({"msg": "Unlocked Borders Updated"})