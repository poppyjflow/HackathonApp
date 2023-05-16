
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
        self.database='hackathonapp'
        self.host='127.0.0.1'
        self.port = '5432'
        #read API keys
        self.user = 'postgres'
        self.password = 'docker'

        self.conn_handle = psycopg2.connect(
            database=self.database,
            user=self.user,
            password=self.password,
            host=self.host,
            port=self.port
        )

        #test code to make sure im connected
        #query = 'select * from users;'
        #cursor = self.conn_handle.cursor()
        #cursor.execute(query)
        #user_records = cursor.fetchall()
        #for row in user_records:
        #    print(row)

        
        


class Page(Resource):
    

    #Get info from database
    def get(self):


        parser = reqparse.RequestParser()
        args = parser.parse_args()

    
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
        username = args['username']
        password = args['password']

        cursor = connect_info.conn_handle.cursor()
        query = 'select * from users where email_addy = \''+username +'\';'
        cursor.execute(query)
        logindata = cursor.fetchall() # returns list of tuples
        
        pass_db = logindata[0][6]
        if pass_db == password:
            print("login success!")
            #make data to return call success
        else:
            print("login failed: password incorrect")
            #make data to return call failure 

        #return call 

api.add_resource(Page, '/page') 
api.add_resource(Login, "/login")

if __name__ == '__main__':
    connect_info = Connection(apikeys)
    app.run()


