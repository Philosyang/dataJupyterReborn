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
import string




app = Flask(__name__)
app.config['MYSQL_HOST'] = '127.0.0.1'  # we are using a public github repo
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '375120'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_DB'] = 'dataJupyter'
mysql = MySQL(app)
tablenames = []
with open('movies_metadata.csv',encoding="utf8", newline='') as f:
    reader = csv.reader(f)
    data = list(reader)
#da = [['ada:wwsd'], ['daw:dasd']]
sheets = {'test':data}
develops = []
rows_lt = 0
columns_lt = 0
columns_rl = 199
rows_rl = 25
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
        


def merge_column(c1, c2, spliter,sname, newname):
    temp = sheets[sname]
    index1 = -1
    index2 = -1
    for j,i in enumerate(temp[0]):
        if i == c1:
            index1 = j
        elif i == c2:
            index2 = j
    if index1 != -1 and index2 != -1:
        temp[0][index1] = newname
        temp[0].pop(index2)
        for i,j in enumerate(temp[1:]):
            j[index1] = str(j[index1]) + spliter + str(j[index2])
            j.pop(index2)
    print("done")

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
def remove_punctuation(sname, c_num, r_num):
    if (c_num == -1 and r_num > -1):
        for index, i in enumerate(sheets[sname][r_num+1]):
            st = str(i)
            for j in st:
                if j in string.punctuation:
                    st = st.replace(j, '', 1) 

                    
            sheets[sname][r_num+1][index] = st
    elif (r_num == -1 and c_num > -1):
        for i in sheets[sname]:
            st = str(i[c_num])
            for j in st:
                if j in string.punctuation:
                    st = st.replace(j, '', 1) 
            i[c_num] = st
    elif (r_num >= -1 and c_num > -1):
        st = str(sheets[sname][r_num+1][c_num])
        for j in st:
            if j in string.punctuation:
                st = st.replace(j, '', 1) 
        sheets[sname][r_num+1][c_num] = st
def remove_number(sname, c_num, r_num):
    if (c_num == -1 and r_num > -1):
        for index, i in enumerate(sheets[sname][r_num+1]):
            st = str(i)
            result = ''.join([j for j in st if not j.isdigit()])

                    
            sheets[sname][r_num+1][index] = result
    elif (r_num == -1 and c_num > -1):
        for i in sheets[sname]:
            st = str(i[c_num])
            result = ''.join([j for j in st if not j.isdigit()])
            i[c_num] = result
    elif (r_num >= -1 and c_num > -1):
        st = str(sheets[sname][r_num+1][c_num])
        result = ''.join([j for j in st if not j.isdigit()])
        sheets[sname][r_num+1][c_num] = result
def upper_case(sname, c_num, r_num):
    if (c_num == -1 and r_num > -1):
        for index, i in enumerate(sheets[sname][r_num+1]):
            sheets[sname][r_num+1][index] = str(i).upper()
    elif (r_num == -1 and c_num > -1):
        for i in sheets[sname]:
            i[c_num] = str(i[c_num]).upper()
    elif (r_num >= -1 and c_num > -1):
        sheets[sname][r_num+1][c_num] = str(sheets[sname][r_num+1][c_num]).upper()
        
def lower_case(sname, c_num, r_num):
    if (c_num == -1 and r_num > -1):
        for index, i in enumerate(sheets[sname][r_num+1]):
            sheets[sname][r_num+1][index] = str(i).lower()
    elif (r_num == -1 and c_num > -1):
        for i in sheets[sname]:
            i[c_num] = str(i[c_num]).lower()
    elif (r_num >= -1 and c_num > -1):
        sheets[sname][r_num+1][c_num] = str(sheets[sname][r_num+1][c_num]).lower()
def split_column_by(sname,c1, c2, spliter,  cname):
    temp = sheets[sname]
    index = -1



    for j,i in enumerate(temp[0]):
        if i == cname:
            index = j
            break
    if index != -1:
        temp[0][index] = c1
        temp[0].append(c2)
        for row in temp[1:]:
            splits = row[index].split(spliter)
            row[index] = splits[0]
            if (len(splits) > 1):
                row.append(splits[1])
            

def change_c_name(sname,cname, new_cname):
    temp = sheets[sname]
    for j,i in enumerate(temp[0]):
        if i == cname:
            temp[0][j] = new_cname
            break
def array_to_db(name):
    # drop old mysql table
    for names in tablenames:
        if names == name:
            drop_table(name)

    # create new table
    sr = mysql.connection
    cur = sr.cursor()
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
    length = 0
    for i in sheets[name][0]:
        if (i != ''):
            length += 1
        else:
            break
    for index, i in enumerate(sheets[name][0]):
        if(i == ''):
            break
        elif index == length - 1:
            column_query += '%s VARCHAR(255)' % i
        else:
            column_query += '%s VARCHAR(255), ' % i
  
    query = 'CREATE TABLE IF NOT EXISTS %s (%s);' % (name, column_query)
    #print(query)
    cur.execute(query)
    # https://dev.mysql.com/doc/refman/8.0/en/create-table.html
    # query example: 'CREATE TABLE sheet2 (col_1 VARCHAR(255), col_2 VARCHAR(255), col_3 VARCHAR(255), col_4 VARCHAR(255));

    #inserting each row
    for record in sheets[name][1:]:
        ins = 'INSERT INTO %s\nValues (' % name
        for p, value in enumerate(record):

            if p == length - 1:
                if str(value) == '':
                    ins = ins + '""'
                else:
                    ins = ins + '"' + str(value) + '"'
                break
            if str(value) == '':
                ins = ins + '""' + ', '

            else:
                ins = ins + '"' +str(value)+ '"' + ', '
        ins = ins + ');'
        cur.execute(ins)
    sr.commit()
    cur.close()
    tablenames.append(name)
 
def add_sheet(s_name, field_name):
    emptySheet = [field_name]
    sheets[s_name] = emptySheet
# new we provide both sheets name and fields in order to add sheet
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
def quickc():
    cur = mysql.connection
    curs = cur.cursor()
    value = 'INSERT INTO plz Values ("Abdussalam Alawini | Computer Science | UIUC", "https://cs.illinois.edu/directory/profile/alawini", "https://cs.illinois.edu › directory › profile › alawini");'
    curs.execute(value)
    
    cur.close()
    curs.close()
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
#@app.route('/aceValue', methods=['POST'])
#def getarray():
#    global columns_lt
#    global columns_rl
#    global rows_lt
#    global rows_rl
#    ans = request.get_json()['text']
#    message = run_text_as_code(ans)
#    #assume we want resultFromScript
#    out_s = {}
#    for key in sheets:
#        i = sheets[key]
#        yes = -1
#        b= []
#        for row in i:
#            
#            b.append([])
#        if len(i) > 200:
#            yes = 1
#            b = i[columns_lt:columns_rl]
#        if len(i[0]) > 26:
#            yes = 1
#            for k,j in enumerate(i):
#                b[k] = j[rows_lt:rows_rl]
#        if yes == -1:
#            out_s[key] = i
#        else:
#            out_s[key] = b
#       
#    return {'result':out_s, 'terminal':message}
@app.route('/aceValue', methods=['POST'])
def getarray():
    global columns_lt
    global columns_rl
    global rows_lt
    global rows_rl
    ans = request.get_json()['text']
    message = run_text_as_code(ans)
    #assume we want resultFromScript
    out_s = {}
    for key in sheets:
        i = sheets[key]
        yes = -1
        b= []
        for row in i:
            b.append([])
        if len(i) > 200:
            yes = 1
            b = i[columns_lt:columns_rl]
        if len(i[0]) > 26:
            yes = 1
            for k,j in enumerate(i[columns_lt:columns_rl]):
                b[k] = j[rows_lt:rows_rl]
        if yes == -1:
            out_s[key] = i
        else:
            out_s[key] = b
        
    return {'result':out_s, 'terminal':message}

@app.route("/merge", methods =["POST"])
def merge():
    ans = request.get_json()

    merge_column(ans["c1"],ans["c2"], ans["split"], ans['sname'], ans["newname"])
    # split_column_by(ans["sname"],ans["c1"], ans["c2"], ans["split"], ans["newname"])
    return "test"

@app.route('/cellChange', methods=['POST'])
def cellChange():
   ans = request.get_json()['text']
   # print(ans)  # sheet_name, location, value; WARN: assuming `ans` as python dictionary

   this_sheet_name = ans["sheet_name"]
   this_location = ans["location"]
   this_value = ans["value"]
   this_sheet = sheets[this_sheet_name]    # get sheet
   this_sheet[this_location[0]-1][this_location[1]-1] = this_value # update value
   sheets[this_sheet_name] = this_sheet    # update sheet

   return sheets

@app.route('/commit', methods=['POST'])
def commitToDatabase():
   

   return sheets