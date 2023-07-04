
#loosely following this guide
# https://towardsdatascience.com/the-right-way-to-build-an-api-with-python-cd08ab285f8f

from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
import pandas as pandas
import json
#import ast
import psycopg2

apikeys = None

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

#utilities
def addCors(msg):
    msg.headers['Access-Control-Allow-Origin']='*'
    msg.headers['Access-Control-Request-Method']='POST, GET'
    msg.headers['Access-Control-Request-Headers']="Content-Type"
    return msg

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
        self.conn_handle.set_session(autocommit=True)

class AircraftRef(Resource):

    #get data from aircraft reference table
    #required args:
    #   none
    #optional args:
    #   airframe
    #   year
    #returned JSON fields:
        #rows: number of rows found
        #data:
            #data found for each row
    def get(self):
        #print("STARTING")
        #parser = reqparse.RequestParser()
        #parser.add_argument('airframe', required = False)
        #parser.add_argument('year', required=False)
        #parser.add_argument('num', required=False)

        n_acft_offset = 2 #row containing price is 2 + (n_aircraft)
        #args =  parser.parse_args()
        #print(args)

        query = "select * from aircraft_annual_reference"
        #watoken = ' where ' #where or and, used to chain params
        #if args['airframe'] != None:
        #    query += watoken + 'airframe = \''+ args['airframe'] +'\''
        #    watoken = ' and '
        #if args['fiscal_year'] != None:
        #    query += watoken + 'year = ' + args['year']
        #    watoken = ' and '
        #pretty sure this isn't needed
        #if args['num'] != None:
        #    query += watoken + 'num = ' + args['num'] + 'acft'
        #    watoken = ' and '


        query += ';'
        print(query)

        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        #filter data for a specific number of aircraft



        #No data found
        if(len(data)) == 0:
            msg = jsonify({"rows":"0"})
            return msg

        #format response data
        msg_dict = {}
        nrow = 0
        for row in data: #each row corresponds to an airframe
            rd = {}
            #airframe
            rd['airframe'] = row[2]
            #year
            rd['year'] = row[1]
            #cost for each number of aircraft
            for num_workers in range(3,len(row)):
                rd['acft'+str(num_workers-2)] = row[num_workers]
            msg_dict[str(nrow)] = rd
            nrow += 1
        msg_dict['rows'] = str(nrow)

        return addCors(jsonify(msg_dict))

    #Add a new aircraft reference
    #only PACAF sessions
    def post(self):
        table_columns = [
        'fiscal_year', 'airframe',
        'acft1', 'acft2', 'acft3', 'acft4',
        'acft5', 'acft6', 'acft7', 'acft8',
        'acft9', 'acft10', 'acft11', 'acft12',
        'acft13', 'acft14', 'acft15', 'acft16'
    ]

        parser = reqparse.RequestParser()
        #for arg in table_columns:
        #    parser.add_argument(arg, required=False)
        parser.add_argument('table',required=True)

        args = parser.parse_args()

        #delete existing table entries
        query = 'DELETE from aircraft_annual_reference;'
        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)

        table = args['table']
        #rebuild tables
        #INSERT INTO <table> (<columns>) <values>

        #convert table from json string to dict
        table = table.replace('\'','\"')
        table = json.loads(table)

        #iterate through table rows and insert them
        for row in table:
            query = 'INSERT INTO aircraft_annual_reference '
            arg_cols = str(table_columns).replace('\'', ' ')
            arg_cols = arg_cols.replace('[','(').replace(']',')')
            #values for sql query
            arg_vals = []
            for key in table_columns:
                arg_vals.append(table[row][key])

            arg_vals = str(arg_vals).replace('[','(').replace(']',')')
            #fix booleans for postgres
            arg_vals = arg_vals.replace('True','true').replace('False','false')
            query +=  arg_cols + ' VALUES ' + arg_vals + ';'
            print()
            print(query)
            print()

            cursor.execute(query)

#Send and get exercise wing requests
class WingRequest(Resource):



    #See wing requests for an exercise
    def get(self):

        table_columns = [
        'exercises_id', 'unit_name', 'tdy_from',
        'tdy_to', 'airfare_type', 'days_qty', 'acft_type',
        'acft_qty', 'lodging_qty_gov', 'lodging_qty_comm',
        'lodging_qty_field', 'meals_provided_gov',
        'meals_provided_comm', 'meals_provided_field'
    ]

        parser = reqparse.RequestParser()
        parser.add_argument("exercises_id_list", required=True)

        args = parser.parse_args()

        query = 'select * from wing_request where exercises_id in ('
        query += args['exercises_id_list']+');'
        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)
        data = cursor.fetchall()

        msg_dict = {}
        nrow = 0
        for row in data:
            rd = {}
            for num in range(1,len(table_columns)+1):
                # print(row)
                # print(num)
                print(table_columns[num-1] + ": ")
                print(row[num])
                rd[table_columns[num-1]] = row[num]
            msg_dict[str(nrow)] = rd
            nrow += 1
        msg_dict['rows'] = nrow

        return addCors(jsonify(msg_dict))




    #Submit a wing request for an exercise
    def post(self):

        table_columns = [
        'exercises_id', 'unit_name', 'tdy_from',
        'tdy_to', 'airfare_type', 'days_qty', 'acft_type',
        'acft_qty', 'lodging_qty_gov', 'lodging_qty_comm',
        'lodging_qty_field', 'meals_provided_gov',
        'meals_provided_comm', 'meals_provided_field'
    ]

        parser = reqparse.RequestParser()
        parser.add_argument('table',required=True)
        args = parser.parse_args()

        #delete existing table entries
        query = 'DELETE from wing_request;'
        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)

        #INSERT INTO <table> (<columns>) <values>
        table = args['table']
        #rebuild tables
        #INSERT INTO <table> (<columns>) <values>

        #convert table from json string to dict
        table = table.replace('\'','\"')
        table = json.loads(table)

        #iterate through table rows and insert them
        for row in table:
            query = 'INSERT INTO wing_request '
            arg_cols = str(table_columns).replace('\'', ' ')
            arg_cols = arg_cols.replace('[','(').replace(']',')')
            #values for sql query
            arg_vals = []
            for key in table_columns:
                arg_vals.append(table[row][key])

            arg_vals = str(arg_vals).replace('[','(').replace(']',')')
            #fix booleans for postgres
            arg_vals = arg_vals.replace('True','true').replace('False','false')
            query +=  arg_cols + ' VALUES ' + arg_vals + ';'
            print()
            print(query)
            print()

            cursor.execute(query)




#Get info from per diem chart
class PerDiem(Resource):
    #Get exercises from the per_diem_chart table
    def get(self):
        query = "select * from per_diem_chart"
        query += ';'
        print(query)

        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)
        data = cursor.fetchall()

        #No data found
        if(len(data)) == 0:
            msg = jsonify({"rows":"0"})
            return msg

        #format response data
        msg_dict = {}
        nrow = 0
        for row in data: #each row corresponds to an exercise
            rd = {}
            rd['id'] = row[0]
            rd['country'] = row[1]
            rd['location'] = row[2]
            rd['season_code'] = row[3]
            rd['season_start_date'] = row[4]
            rd['season_end_date'] = row[5]
            rd['lodging_rate'] = row[6]
            rd['meals_incidentals'] = row[7]
            rd['per_diem'] = row[8]
            rd['effective_date'] = row[9]
            rd['footnote_reference'] = row[10]
            rd['location_code'] = row[11]
            msg_dict[str(nrow)] = rd
            nrow += 1
        msg_dict['rows'] = str(nrow)

        return jsonify(msg_dict)

class Exercises(Resource):

    #Get exercises from the exercise table
    def get(self):
        query = "select * from exercises"
        query += ';'
        print(query)

        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        #filter data for a specific number of aircraft

        #No data found
        if(len(data)) == 0:
            msg = jsonify({"rows":"0"})
            return msg

        #format response data
        msg_dict = {}
        nrow = 0
        for row in data: #each row corresponds to an exercise
            rd = {}
            rd['id'] = row[0]
            rd['exercise_name'] = row[1]
            rd['start_date'] = row[2]
            rd['end_date'] = row[3]
            rd['location'] = row[4]
            rd['status'] = row[5]
            #cost for each number of aircraft
            msg_dict[str(nrow)] = rd
            nrow += 1
        # msg_dict['rows'] = str(nrow)

        return jsonify(msg_dict)

    #Insert an exercise into the exercise table
    def post(self):

        table_columns = [
        'exercise_name', 'start_date', 'end_date',
        'location', 'status'
        ]

        parser = reqparse.RequestParser()
        #for arg in table_columns:
        #    parser.add_argument(arg, required=False)
        parser.add_argument('table',required=True)

        args = parser.parse_args()

        #delete existing table entries
        query = 'DELETE from exercises;'
        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)

        table = args['table']
        #rebuild tables
        #INSERT INTO <table> (<columns>) <values>

        #convert table from json string to dict
        table = table.replace('\'','\"')
        table = json.loads(table)

        #iterate through table rows and insert them
        for row in table:
            query = 'INSERT INTO exercises '
            arg_cols = str(table_columns).replace('\'', ' ')
            arg_cols = arg_cols.replace('[','(').replace(']',')')
            #values for sql query
            arg_vals = []
            for key in table_columns:
                arg_vals.append(table[row][key])

            arg_vals = str(arg_vals).replace('[','(').replace(']',')')
            #fix booleans for postgres
            arg_vals = arg_vals.replace('True','true').replace('False','false')
            query +=  arg_cols + ' VALUES ' + arg_vals + ';'
            print()
            print(query)
            print()

            cursor.execute(query)
#        connect_info.conn_handle.commit()



#Login to site
#Required args:
#   username (email)
#   password (hashed password)
#TODO: return username+rank

class AirfareCosts(Resource):

    #returns cheapest flight matching the query
    def get(self):

        parser = reqparse.RequestParser()

        parser.add_argument("to_date", required=True)
        parser.add_argument("from_date", required=True)
        parser.add_argument("src_country", required=True)
        parser.add_argument("src_city", required=True)
        parser.add_argument("dst_country", required=True)
        parser.add_argument("dst_city", required=True)


        args = parser.parse_args()

        table_columns = ['airline', 'to_date', 'from_date', 'src_country', 'src_city', 'src_price', 'dst_country', 'dst_city', 'dst_price']

        query = 'SELECT * from airfare_costs WHERE '
        nargs = len(args.keys())
        argnum = 0
        for key in args:

            query += key + ' = \'' + args[key] +'\''

            argnum +=1
            if argnum < nargs:
                query += ' AND '

        query += ';'

        cursor = connect_info.conn_handle.cursor()
        cursor.execute(query)
        data = cursor.fetchall()

        nrow = 0
        msg_dict = {}

        for row in data:
            rd = {}
            for num in range(1,len(table_columns)+1):
                rd[table_columns[num-1]] = row[num]
            msg_dict[str(nrow)] = rd
            nrow += 1
        #msg_dict['rows'] = nrow

        #[print(row) for row in msg_dict]

        msgkeys = list(msg_dict.keys())
        bestflight = msg_dict[msgkeys[0]]
        for key in msgkeys:
            if msg_dict[key]['src_price'] + msg_dict[key]['dst_price'] < bestflight['src_price'] + bestflight['dst_price']:
                bestflight = msg_dict[key]

        return addCors(jsonify(bestflight))


class LodgingCosts(Resource):

    def get(self):
        pass





class Login(Resource):

    #Attempt to login
    def post(self):

        parser = reqparse.RequestParser()

        #add arguments
        parser.add_argument('email_addy', required=True)
        args = parser.parse_args()
        username = args['email_addy']

        cursor = connect_info.conn_handle.cursor()
        query = 'select * from users where email_addy = \''+username +'\';'
        print("query: " +query)
        cursor.execute(query)
        logindata = cursor.fetchall() # returns list of tuples

        if(len(logindata)) == 0: #bad username
            msg = jsonify({"response":"failure"})
            msg.headers['Access-Control-Allow-Origin']='*'
            msg.headers['Access-Control-Request-Method']='POST, GET'
            msg.headers['Access-Control-Request-Headers']="Content-Type"
            return msg

        id = logindata[0][0]
        unit_name = logindata[0][1]
        rank = logindata[0][2]
        fname = logindata[0][3]
        lname = logindata[0][4]
        email_addy = logindata[0][5]
        passwd = logindata[0][6]
        salt = logindata[0][7]
        access_level = logindata[0][8]

        print("login success!")
        msg = jsonify({"result":"success",
        "id":id,
        "unit_name":unit_name,
        "rank":rank,
        "fname":fname,
        "lname":lname,
        "email_addy":email_addy,
        "passwd":passwd,
        "salt":salt,
        "access_level":access_level
        })

        msg.headers['Access-Control-Allow-Origin']='*'
        msg.headers['Access-Control-Request-Method']='POST, GET, OPTIONS'
        msg.headers['Access-Control-Request-Headers']="Content-Type"
        return msg



api.add_resource(Login, "/login")
api.add_resource(AircraftRef, "/aircraft_reference")
api.add_resource(Exercises, "/exercises")
api.add_resource(WingRequest, "/wingrequest")
api.add_resource(PerDiem, "/perdiem")
api.add_resource(AirfareCosts, "/airfare_costs")

if __name__ == '__main__':
    connect_info = Connection(apikeys)
    app.run()