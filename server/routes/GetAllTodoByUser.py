from flask import request, Blueprint

getAllTodoByUser = Blueprint("getAllTodoByUser", __name__)

@getAllTodoByUser.route("/api/user/<id>/todo", methods=["GET"])
def getAllTodoByUserRoute(id):
  return {"todo" : ["todo1", "todo2", "todo3"]}