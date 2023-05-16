
#loosely following this guide
# https://towardsdatascience.com/the-right-way-to-build-an-api-with-python-cd08ab285f8f

from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pandas
import ast
import psycopg2

apikeys = None

app = Flask(__name__)
api = Api(app)


class Connection:

    def __init__(self, apikeys):

        #connection info
        self.database='postgres'
        self.host='127.0.0.1'
        self.port = '1434'
        #read API keys
        self.user = 'postgres'
        self.password = 'password'

        conn_handle = None


class Page(Resource):
    

    #Get info from database
    def get(self):
        pass
    
    #Edit database
    #admin only
    def post(self):

        parser = reqparse.RequestParser() 

        #add arguments
        args = parser.parse_args()

        #format data from args

        #check modify permissions

        #read the data

        #add new values

        #save to database

        pass


    #Add new database entries
    #admin only
    def put(self):
        pass


class Login(Resource):

    #Attempt to login
    def post(self):

        parser = reqparse.RequestParser() 

        #add arguments
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()
        print("args")
        print(args)

        #format data from args

        #check login
        #???


    #Connect to the database
    def connect(self):

        #Connection.conn_handle = psycopg2.connect(
        #    database=connect_info.database,
        #    user=connect_info.user,
        #    password=connect_info.password,
        #    host=connect_info.host,
        #    port=connect_info.port
        #)
        pass

api.add_resource(Page, '/page') 
api.add_resource(Login, "/login")

if __name__ == '__main__':
    connect_info = Connection(apikeys)
    app.run()


