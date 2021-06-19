from flask import Flask, json, jsonify, request
import requests
import os
import pandas as pd
import csv
app = Flask(__name__)
spreads = []
develops = []
def add_row(dic):
    with open('spreadsheet.csv', mode='a', newline="") as csv_file:
        fieldnames = []
        for key in dic:
            fieldnames.append(key)
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        file_path = 'spreadsheet.csv'
        # check if size of file is 0
        if os.path.getsize(file_path) == 0:
            writer.writeheader()
        writer.writerow(dic)
def add_rowssec(dic):
    field= []
    row = []
    for key in dic:
        field.append(key)
        row.append(dic[key])
    if (len(spreads) == 0):
        spreads.append(field)
    spreads.append(row)
def query(attr, value):
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
def pop_row(attr, value):
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
    
def run_text_as_code(loc):
    exec(loc)
@app.route('/aba', methods=['POST'])
def aba():
    ans = request.get_json()
    run_text_as_code(ans['name']['name'])
    print(spreads)