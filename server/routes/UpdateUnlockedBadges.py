from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions, firestore

updateUnlockedBadges = Blueprint("updateUnlockedBadge", __name__)

@updateUnlockedBadges.route("/api/user/<userId>/unlocked/badges/update", methods = ["PUT"])
def updateUnlockedBadgesRoute(userId):
  data = request.get_json()

  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  unlockedBadges = data.get("unlockedBadges")

  error_log = {
    "unlockedBadges": unlockedBadges,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)
  
  fields = {"unlockedBadges." + item: True for item in unlockedBadges}

  ref = db.collection("Users").document(userId).update(fields)

  return ({"msg": "Unlocked Badges Updated"})