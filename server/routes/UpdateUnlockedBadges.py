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
  
  fields = {"unlockedBadges." + item: True for item in unlockedBadges}
  fields["unlockedBadges.NORMIE"] = True

  ref = db.collection("Users").document(userId).update(fields)

  return ({"msg": unlockedBadges})