from flask import request, Blueprint
from ..database.database import db

getAllTodoByUser = Blueprint("getAllTodoByUser", __name__)

@getAllTodoByUser.route("/api/user/<userId>/todo", methods=["GET"])
def getAllTodoByUserRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  docs = db.collection('Todo')
  result = docs.where("userId", "==", userId).stream()
  
  res = [doc.to_dict() for doc in result]
  
  return {"todos": res}