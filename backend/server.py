from datetime import datetime
from functools import wraps
from hashlib import sha1

from bson import ObjectId
from bson.json_util import dumps 
from flask import Flask, request, jsonify
import jwt
from pymongo import MongoClient
from flask_cors import CORS

secret = "the sky is blue"

client = MongoClient('localhost', 27017)
db = client.car_listings

# upsert user
db.users.update_one({
    '_id': ObjectId('5ffcd26135312bec513e5ade')
}, {'$set': {
    '_id': ObjectId('5ffcd26135312bec513e5ade'),
    'name': 'roofus',
    'pass': sha1('doofus'.encode('utf-8')).hexdigest()
    }
}, upsert=True)

app = Flask(__name__)
CORS(app)

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

@app.route("/listings", methods=['POST'])
def add_listing():
    listing_info = request.json
    db.listings.insert_one(listing_info)

@app.route('/create-account', methods=['POST'])
def create_account():
    print(request.headers)
    data = request.json
    print(data)
    name = data['name']
    _pass = data['pass'].encode('utf-8')
    hashpass = sha1(_pass).hexdigest()
    db.users.insert_one({
        'name': name,
        'pass': hashpass
    })
    return 'success', 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data['name']
    _pass = data['pass'].encode('utf-8')
    hashpass = sha1(_pass).hexdigest()
    print(name, hashpass)
    user = db.users.find_one({
        'name': name,
        'pass': hashpass
    })
    print(user)
    if not user:
        return jsonify({'error': 'bad username or password'}), 404

    token = jwt.encode({
        'sub': name,
        'exp': datetime.now().timestamp() + 60 * 60
    }, secret)
    return jsonify({'token': token})

def login_required(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        token = request.headers.get('API-Token', None)
        if token is None:
            return jsonify({'error': 'API-Token header required'}), 401
        try:
            decoded = jwt.decode(token, secret, algorithms=['HS256'])
        except jwt.exceptions.InvalidSignatureError:
            return jsonify({'error': 'bad token signature'}), 403
        if decoded['exp'] <= datetime.now().timestamp():
            return jsonify({'error': 'expired token'}), 403
        kwargs['token'] = decoded
        return f(*args, **kwargs)
    return wrapped

@app.route('/hello')
def hello():
    return 'hello\n'

@app.route('/hello/<name>')
def hello_url(name):
    last = request.args.get('last', '')
    return f'hello {name} {last}\n'

app.run()