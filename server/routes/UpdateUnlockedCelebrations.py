from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions, firestore

updateUnlockedCelebrations = Blueprint("updateUnlockedCelebrations", __name__)

@updateUnlockedCelebrations.route("/api/user/<userId>/unlocked/celebrations/update", methods = ["PUT"])
def updateUnlockedCelebrationsRoute(userId):
  data = request.get_json()

  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  unlockedCelebrations = data.get("unlockedCelebrations")

  error_log = {
    "unlockedCelebrations": unlockedCelebrations,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)
  
  fields = {"unlockedCelebrations." + item: True for item in unlockedCelebrations}
  fields["unlockedCelebrations.AMONG US WIN"] = True

  ref = db.collection("Users").document(userId).update(fields)

  return ({"msg": "Unlocked Celebrations Updated"})