from flask import Flask, json, jsonify, request
import requests
import os
import pandas as pd
import csv
app = Flask(__name__)

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

def run_text_as_code(loc):
    exec(loc)
@app.route('/aba', methods=['POST'])
def aba():
    ans = request.get_json()
    run_text_as_code(ans['name']['name'])
