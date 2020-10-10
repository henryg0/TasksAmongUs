from flask import request, Blueprint

updateTodo = Blueprint("updateTodo", __name__)

@updateTodo.route("/api/user/<id>/todo/<todo_id>/update", methods = ["PATCH"])
def updateTodoRoute(id, todo_id):
  data = request.get_json()
  name = data.get("name")
  description = data.get("description")
  deadline = data.get("deadline")
  color = data.get("color")

  return {"msg": "Todo updated"}

    