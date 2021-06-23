from flask import Flask, json, jsonify, request
import requests
import os
import pandas as pd
import csv
app = Flask(__name__)
sheets = {}
spreads = []
develops = []
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
    
def run_text_as_code(loc):
    exec(loc)
@app.route('/pythonText', methods=['POST'])
def aba():
    ans = request.get_json()
    run_text_as_code(ans['text'])
    print(spreads)

@app.route('/aceValue', methods=['POST'])
def getarray():
    ans = request.get_json()['text']
    run_text_as_code(ans)
    #assume we want resultFromScript
    return {'result':spreads}