from flask import Blueprint, request, jsonify
from ..database.database import db
from firebase_admin import exceptions

updateSelectedBadge = Blueprint("updateSelectedBadge", __name__)

@updateSelectedBadge.route("/api/user/<userId>/selected/badge/update", methods = ["PUT"])
def updateSelectedBadgeRoute(userId):
  data = request.get_json()

  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  if not data:
    return (jsonify({"msg": "Missing data"}), 400)

  selectedBadge = data.get("selectedBadge")

  error_log = {
    "selectedBadge": selectedBadge,
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"error": "Missing {}".format(key)}), 400)

  # IF SOMEONE ELSE HAS SAME ID, IT OVERRIDES
  db.collection("Users").document(userId).update({"selectedBadge": selectedBadge})

  return ({"msg": "Selected Badge Updated"})