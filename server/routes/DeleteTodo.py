from flask import request, Blueprint, jsonify
from ..database.database import db

deleteTodo = Blueprint("deleteTodo", __name__)

@deleteTodo.route("/api/todo/<todoId>/delete", methods = ["DELETE"])
def deleteTodoRoute(todoId):
  # add a checking method where only user can delete their own todo
  # if not userId:
  #   return (jsonify({"msg": "Missing userId"}), 400)

  if not todoId:
    return (jsonify({"msg": "Missing todoId"}), 400)

  db.collection('Todo').document(todoId).delete()
  
  return ({"msg": "Todo deleted"})