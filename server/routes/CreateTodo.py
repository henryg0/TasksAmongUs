from flask import Blueprint, request

createTodo = Blueprint("createTodo", __name__)

@createTodo.route("/api/user/<id>/todo/create", methods=["POST"])
def createTodoRoute(id):
  data = request.get_json()
  name = data.get("name")
  description = data.get("description")
  deadline = data.get("deadline")
  color = data.get("color")

  return {"msg": "Todo created"}