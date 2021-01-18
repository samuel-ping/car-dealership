from bson import ObjectId
from bson.json_util import dumps 
from flask import Flask, request, jsonify
import jwt
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.car_listings

app = Flask(__name__)

@app.route('/listings', methods=['GET'])
def get_listings():
    """
    Retrieves all listings
    """
    # https://www.geeksforgeeks.org/convert-pymongo-cursor-to-json/
    listings = db.listings.find()
    listings_json = list(listings)
    json_data = dumps(listings_json)

    return json_data

@app.route('/listings/<_id>', methods=['GET'])
def get_listing(_id):
    """
    Finds listing by ID
    """
    listing = db.listings.find({"_id": ObjectId(_id)})

    listing_json = list(listing)
    json_data = dumps(listing_json)

    return json_data

@app.route('/listings/stats', methods=['GET'])
def get_stats():
    """
    Gets number of listings for each make
    """
    
    make_stats = db.listings.aggregate([
        { "$group": {"_id": "$make", "num_listings": { "$sum": 1 }}}
    ])

    make_stats_json = list(make_stats)
    json_data = dumps(make_stats_json)

    return json_data

# @app.route("/listings/<_id>", methods=['DELETE'])
# def mark_sold(_id):
#     """
#     Deletes a listing (marking it sold)
#     """
#     db.listings.deleteOne({"_id":_id})

# @app.route("/listings", methods=['POST'])
# def add_listing():
#     listing_info = request.values()
#     db.listings.insert_one(listing_info)

@app.route('/hello')
def hello():
    return 'hello\n'

@app.route('/hello/<name>')
def hello_url(name):
    last = request.args.get('last', '')
    return f'hello {name} {last}\n'

app.run()