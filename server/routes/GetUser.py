from flask import Blueprint, request, jsonify
from ..database.database import db
import uuid

getUser = Blueprint("getUser", __name__)

@getUser.route("/api/user/<userId>", methods = ["GET"])
def getUserRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  print (db)
  return ("hi")
    
  # query = (f"SELECT * FROM todo.UserProfile WHERE userId = {userId}")

  # results = session.execute(query).one()

  # if not results:
  #   return (jsonify({"error": "User does not exist"}), 404)

  # return ({"user": results})