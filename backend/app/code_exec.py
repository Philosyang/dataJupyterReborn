from flask import Flask, json, jsonify, request
import requests
import os
import pandas as pd
from io import StringIO
import sys
from os import write
import sys, traceback
import csv
from contextlib import redirect_stdout
import io
from flask_mysqldb import MySQL # database connection

app = Flask(__name__)

app.config['MYSQL_HOST'] = '127.0.0.1'  # we are using a public github repo
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'lol'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_DB'] = 'dataJupyter'
mysql = MySQL(app)
tablenames = []
sheets = {}
develops = []
#var initv = []
#    for (let i = 0; i < 1000; i++) {
#        initv.append([])
#        for (let j = 0; j < 26; i++) {
#            initv[i].append({value:0})
#        }
#    }


#def select(l, r):
 #   if len(spreads > 0) and (l < len(spreads)) and (l >= 0) and (r < len(spreads[0])) and (r >=0):
  #      develops = spreads[]


def get_array_from_table(tablename):
    show_table_query = "DESCRIBE %s", tablename
    cursor = mysql.connection.cursor()
    cursor.execute(show_table_query)
    # Fetch rows from last executed query
    result = cursor.fetchall()
    new_table = []
    new_fieldname = []
    # adding fields
    for row in result:
        new_fieldname.append(row[0])
    select  = 'SELECT * FROM %s', tablename
    cursor.execute(select)
    # Fetch rows from last executed query
    for row in cursor.fetchall():
        new_table.append(list(row))
    sheets[tablename] = (new_table, new_fieldname)
    cursor.close()
        
def drop_table(name):
    # drop mysql table
    cur = mysql.connection.cursor()
    drop = 'DROP TABLE %s;' % name
    cur.execute(drop)
    cur.close()

    # drop(update) the table in `tablenames` list as well; `tablenames` is used to keep track of the tables in mysql database
    for i, names in enumerate(tablenames):
        if names == name:
            tablenames.pop(i)
            break

def array_to_db(array, name):
    # drop old mysql table
    for names in tablenames:
        if names == name:
            drop_table(name)

    # create new table
    cur = mysql.connection.cursor()
    # #record_len = len(array[0])
    # #create table with field on the first row
    # for i in array[0]:
    #     temp = '%s VARCHAR(255)\n' % i
    #     a = a + temp
    # a = a + ")"
    # cur.execute(a)
   # number of columns in current table
    column_query = ''
    #iterating fieldnames
    length = len(sheets[name][1])
    for index, i in enumerate(sheets[name][1]):
        if index == length - 1:
            column_query += '%s VARCHAR(255)' % i
        else:
            column_query += '%s VARCHAR(255), ' % i
  
    query = 'CREATE TABLE %s (%s);' % (name, column_query)
    cur.execute(query)
    # https://dev.mysql.com/doc/refman/8.0/en/create-table.html
    # query example: 'CREATE TABLE sheet2 (col_1 VARCHAR(255), col_2 VARCHAR(255), col_3 VARCHAR(255), col_4 VARCHAR(255));

    #inserting each row
    for record in array[1:]:
        ins = 'INSERT INTO %s\nValues (' % name
        for value in record:
            ins = ins + str(value) + ', '
        ins = ins + ')'
        cur.execute(ins)
    cur.close()


# new we provide both sheets name and fields in order to add sheet
def add_sheet(s_name, field_name):
    sheets[s_name] = [field_name]
def add_row(dic, s_name):
    #field= []
    row = []
    for key in dic:
        #field.append(key)
        row.append(dic[key])
    #if (len(sheets[s_name]) == 0):
    #    sheets[s_name].append(field)
    sheets[s_name].append(row)

def query(attr, value, s_name):
    if (len(sheets[s_name]) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(sheets[s_name][0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(sheets[s_name][1:]):
        if row[index_f] == value:
            develops.append(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'

def pop_row(attr, value, s_name):
    if (len(sheets[s_name]) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(sheets[s_name][0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(sheets[s_name][1:]):
        if row[index_f] == value:
            sheets[s_name].pop(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'

def pop_sheet(s_name):
    sheets.pop(s_name)
def run_text_as_code(loc):
    try:
        with io.StringIO() as buf, redirect_stdout(buf):
            exec(loc, globals())
            output = buf.getvalue()
        return [output, "success"]
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        trace_back = traceback.extract_tb(exc_traceback)
        stack_trace = list()

        for trace in trace_back:
            stack_trace.append("File : %s , Line : %d, Func.Name : %s, Message : %s" % (trace[0], trace[1], trace[2], trace[3]))
        s = "Exception type : %s " % exc_type.__name__
        d = "Exception message : %s" %exc_value
        f = "Stack trace : %s" %stack_trace
        out = s + '\n' + d + '\n' + f
        return [out, "exception"]

@app.route('/aceValue', methods=['POST'])
def getarray():
    ans = request.get_json()['text']
    message = run_text_as_code(ans)
    print(sheets)
    #assume we want resultFromScript
    return {'result':sheets, 'terminal':message}

@app.route('/cellChange', methods=['POST'])
def cellChange():
   ans = request.get_json()['text']
   # print(ans)  # sheet_name, location, value; WARN: assuming `ans` as python dictionary

   this_sheet_name = ans[sheet_name]
   this_location = ans[location]
   this_value = ans[value]

   this_sheet = sheets[this_sheet_name]    # get sheet
   this_sheet[this_location[0]-1][this_location[1]-1] = this_value # update value
   sheets[this_sheet_name] = this_sheet    # update sheet

   return sheets

@app.route('/commit', methods=['POST'])
def commitToDatabase():
   

   return sheets