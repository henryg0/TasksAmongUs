from database import session

"""session.execute("LIST ALL of Calhackeronis")
session.execute("ALTER USER Calhackeronis SUPERUSER")"""

# session.execute("CREATE KEYSPACE IF NOT EXISTS Todo WITH REPLICATION = { 'class' : 'hello'}")
session.execute("USE todo")

query = "CREATE TABLE IF NOT EXISTS todo.userProfile( {}, {}, {}, {} )".format(
    "id uuid PRIMARY KEY", 
    "firstName text", 
    "lastName text", 
    "email text"
)

print (session.execute(query).one())
