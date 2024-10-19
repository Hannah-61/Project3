from flask import Flask, jsonify, request
import pandas as pd
import os
from database import db
from routes.data_routes import data_bp

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345678@localhost/climate_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
# initialized our database connection 
db.init_app(app)

app.register_blueprint(data_bp)

if __name__ == '__main__':
    app.run(debug=True)
