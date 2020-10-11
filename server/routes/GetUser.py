from flask import Blueprint, request, jsonify
from ..database.database import session
import uuid

getUser = Blueprint("getUser", __name__)

@getUser.route("/api/user/<userId>", methods = ["GET"])
def getUserRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  print(userId)
  """userId = uuid.UUID(userId).hex
  print(userId)"""
  query = (f"SELECT * FROM todo.UserProfile WHERE id = {userId}")

  results = session.execute(query).one()

  if not results:
    return ({"msg": "User does not exist"})

  return ({"user": results})