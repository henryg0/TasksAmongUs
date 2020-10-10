from database import session

"""session.execute("LIST ALL of Calhackeronis")
session.execute("ALTER USER Calhackeronis SUPERUSER")"""
# session.execute("CREATE KEYSPACE IF NOT EXISTS Todo WITH REPLICATION = { 'class' : 'hello'}")
session.execute("LIST ROLES")
session.execute("SELECT * FROM system_schema.keyspaces")
# session.execute("CREATE ROLE IF NOT EXISTS user WITH LOGIN = true AND PASSWORD = 'hunter2'")
# session.execute("GRANT ALL PERMISSIONS ON KEYSPACE todo TO user")
# session.execute("USE todo")

query = "CREATE TABLE todo.UserProfile( {}, {}, {}, {} )".format(
  "id uuid PRIMARY KEY", 
  "firstName text", 
  "lastName text", 
  "email text"
)

print (session.execute(query))
