from flask import request, Blueprint

deleteTodo = Blueprint("deleteTodo", __name__)

@deleteTodo.route("/api/user/<id>/todo/<todo_id>/delete", methods = ["DELETE"])
def deleteTodoRoute(id, todo_id):
  return {"msg": "Todo deleted"}