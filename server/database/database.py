from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from dotenv import load_dotenv

cloud_config= {
  'secure_connect_bundle': './secure-connect-tasks-among-us.zip'
}

load_dotenv("../.env")

auth_provider = PlainTextAuthProvider(os.environ.get("database_username"), os.environ.get("database_password"))
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect("todo")

if __name__ == "__main__":
  row = session.execute("select release_version from system.local").one()
  if row:
    print(row[0])
  else:
    print("An error occurred.")

  print ("hi")