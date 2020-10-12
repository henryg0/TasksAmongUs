from flask import Blueprint, request, jsonify
from ..database.database import session

createUser = Blueprint("createUser", __name__)

@createUser.route("/api/user/create", methods = ["POST"])
def createUserRoute():
  data = request.get_json()

  if not data:
    return jsonify({"msg": "Missing data"}), 400

  userId = data.get("userId")
  firstName = data.get("firstName")
  lastName = data.get("lastName")
  email = data.get("email")

  error_log = {
    "data":data,
    "userId":userId,
    "firstName":firstName,
    "lastName":lastName,
    "email":email
  }

  for key in error_log:
    if not error_log.get(key):
      return (jsonify({"msg": "Missing {}".format(key)}), 400)
    
  print (userId)
  print (firstName)
  print (lastName)
  print (email)
  query = "INSERT INTO todo.UserProfile (userId, firstName, lastName, email) VALUES ({}, '{}', '{}', '{}') IF NOT EXISTS".format(userId, firstName, lastName, email)
  # print (query)
  results = session.execute(query).one()
  print (results)
  print (results[1])
  return {"msg": "User Created"}