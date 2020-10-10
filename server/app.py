from flask import Flask, Blueprint
from .routes.HelloWorld import helloWorld
from .routes.GetTodoByUser import getTodoByUser
from .routes.GetTodoByFriend import getTodoByFriend
from .routes.CreateTodo import createTodo
from .routes.UpdateTodo import updateTodo
from .routes.DeleteTodo import deleteTodo


app = Flask(__name__)

app.register_blueprint(helloWorld)
app.register_blueprint(getTodoByUser)
app.register_blueprint(getTodoByFriend)
app.register_blueprint(createTodo)
app.register_blueprint(updateTodo)
app.register_blueprint(deleteTodo)

@app.route('/')
def hello_world():
  return 'Hello, World!'

if __name__ == "__main__":
  app.run(debug=True)

