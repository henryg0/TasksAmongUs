from database import session

session.execute("LIST ROLES")
session.execute("SELECT * FROM system_schema.keyspaces")

session.execute("USE todo")

query = "CREATE TABLE IF NOT EXISTS todo.UserProfile( {}, {}, {}, {} )".format(
  "id userId PRIMARY KEY", 
  "firstName text", 
  "lastName text", 
  "email text"
)

session.execute(query)
