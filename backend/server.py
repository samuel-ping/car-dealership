from bson import ObjectId
from bson.json_util import dumps 
from flask import Flask, request, jsonify
import jwt
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.car_listings

app = Flask(__name__)

@app.route('/listings')
def listings():
    # https://www.geeksforgeeks.org/convert-pymongo-cursor-to-json/
    listings = db.listings.find()
    listings_json = list(listings)
    json_data = dumps(listings_json)

    return json_data

@app.route('/listings/<_id>')
def listings_url(_id):
    listing_id = request.args.get('last', '')
    return f'{_id}'

@app.route('/hello')
def hello():
    return 'hello\n'

@app.route('/hello/<name>')
def hello_url(name):
    last = request.args.get('last', '')
    return f'hello {name} {last}\n'

app.run()