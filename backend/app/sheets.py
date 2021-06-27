from flask import Flask, json, jsonify, request
import os
app = Flask(__name__)

# global variables
all_sheets = {}
width, height = 26, 1000

def newSheet(new_sheet_name):
    current_sheet = [[None for x in range(width)] for y in range(height)]   # create 2d list new sheet
    all_sheets[new_sheet_name] = current_sheet  # {'name': [[...], [...], ...]}
    return all_sheets

def updateSingleCell(sheet_name, location, value): # WARN: assuming location as 1d list, starting from 1
    current_sheet = all_sheets[sheet_name]  # find the sheet
    current_sheet[location[0]-1][location[1]-1] = value
    return all_sheets

def updateRangeCells(sheet_name, location, values):
    pass


@app.route('/')  # get all info on landing page
def getAllSheets():
    ans = jsonify(all_sheets)
    ans.headers.add('Access-Control-Allow-Origin', '*')
    return ans

@app.route('/update', methods=['POST'])
def update():
    received_text = request.get_json()['text']    # get text from frontend
    print(received_text)
    # TODO
    return 'a'
