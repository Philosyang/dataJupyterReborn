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

app = Flask(__name__)

sheets = {}
spreads = []
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

def add_rowa(dic):
    field= []
    row = []
    for key in dic:
        field.append(key)
        row.append(dic[key])
    if (len(spreads) == 0):
        spreads.append(field)
    spreads.append(row)

def querya(attr, value):
    if (len(spreads) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(spreads[0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(spreads[1:]):
        if row[index_f] == value:
            develops.append(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'

def pop_rowa(attr, value):
    if (len(spreads) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(spreads[0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(spreads[1:]):
        if row[index_f] == value:
            spreads.pop(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'

def add_sheet(s_name):
    new_sheet = []
    sheets[s_name] = new_sheet
def add_row(dic, s_name):
    field= []
    row = []
    for key in dic:
        field.append(key)
        row.append(dic[key])
    if (len(sheets[s_name]) == 0):
        sheets[s_name].append(field)
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
            exec(loc)
            output = buf.getvalue()
        return output
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
        return out
@app.route('/pythonText', methods=['POST'])
def aba():
    ans = request.get_json()
    run_text_as_code(ans['text'])
    print(spreads)

@app.route('/aceValue', methods=['POST'])
def getarray():
    ans = request.get_json()['text']
    message = run_text_as_code(ans)
    print(message)
    #assume we want resultFromScript
    return {'result':sheets, 'terminal':message}

#@app.route('/cellChange', methods=['POST'])
#def cellChange():
#    ans = request.get_json()['text']
#    # print(ans)  # sheet_name, location, value; WARN: assuming `ans` as python dictionary
#
#    this_sheet_name = ans[sheet_name]
#    this_location = ans[location]
#    this_value = ans[value]
#
#    this_sheet = sheets[this_sheet_name]    # get sheet
#    this_sheet[this_location[0]-1][this_location[1]-1] = this_value # update value
#    sheets[this_sheet_name] = this_sheet    # update sheet
#
#    return {'result':spreads}
