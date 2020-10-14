from flask import request, Blueprint
from ..database.database import session


getAllTodoByUser = Blueprint("getAllTodoByUser", __name__)

@getAllTodoByUser.route("/api/user/<userId>/todo", methods=["GET"])
def getAllTodoByUserRoute(userId):
  if not userId:
    return (jsonify({"error": "Missing userId"}), 400)

  query = (f"SELECT * FROM todo.UserTodo WHERE userId = {userId}")

  results = session.execute(query)
  print (list(results))
  # colNames = results._fields
  # print (colNames)
  # print (str(results))
  return {"todo" : "tmp"}