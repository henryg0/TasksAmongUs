from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions

updateSelectedCelebration = Blueprint("updateSelectedCelebration", __name__)

@updateSelectedCelebration.route("/api/user/<userId>/selected/celebration/update", methods = ["PUT"])
def updateSelectedCelebrationRoute(userId):
  data = request.get_json()

  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  selectedCelebration = data.get("selectedCelebration")

  error_log = {
    "selectedCelebration": selectedCelebration,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)

  # IF SOMEONE ELSE HAS SAME ID, IT OVERRIDES
  db.collection("Users").document(userId).update({"selectedCelebration": selectedCelebration})

  return ({"msg": "Selected Celebration Updated"})