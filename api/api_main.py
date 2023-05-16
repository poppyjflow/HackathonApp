
#loosely following this guide
# https://towardsdatascience.com/the-right-way-to-build-an-api-with-python-cd08ab285f8f

from flask import Flask, jsonify, make_response
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

class AircraftRef(Resource):

    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('airframe', required = False)
        parser.add_argument('year', required=False)
        parser.add_argument('num', required=False)

        args = parser.parse_args()


    #only PACAF sessions
    def post(self):

        pass

class Exercises(Resource):

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
        permissions = logindata[0][7]
        if pass_db == password:
            print("login success!")
            msg = jsonify({"result":"success", "access":permissions})
        else:
            print("login failed: password incorrect")
            msg = jsonify({"result":"failure"})
            #make data to return call failure 

        print(msg)
        msg.headers['Access-Control-Allow-Origin']='*'

        return msg

api.add_resource(Login, "/")
api.add_resource(AircraftRef, "/aircraft_reference")
api.add_resource(Exercises, "/exercises")
if __name__ == '__main__':
    connect_info = Connection(apikeys)
    app.run()


