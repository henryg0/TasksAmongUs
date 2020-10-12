from database import session

session.execute("LIST ROLES")
session.execute("SELECT * FROM system_schema.keyspaces")

session.execute("USE todo")

# session.execute("DROP TABLE todo.UserProfile")

query = "CREATE TABLE IF NOT EXISTS todo.UserProfile( {}, {}, {}, {} )".format(
  "userId varint PRIMARY KEY", 
  "firstName text", 
  "lastName text", 
  "email text"
)
session.execute(query)

query = "CREATE TABLE IF NOT EXISTS todo.UserTodo( {}, {}, {}, {} ) WITH CLUSTERING ORDER BY (duedate)".format(
  "userId varint PRIMARY KEY",
  "todoId uuid",
  "status boolean",
  "addedDate date",
  "duedate timestamp",
  "taskName text",
  "description text",
  "imageUrl text"
)

session.execute(query)


query = "CREATE TABLE IF NOT EXISTS todo.UserFriends( {}, {}, {}, {} )".format(
  "userId varint PRIMARY KEY", 
  "friendId varint",
  "firstName text", 
  "lastName text",
  "status text"
)

session.execute(query)
