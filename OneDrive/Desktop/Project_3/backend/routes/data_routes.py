from flask import Blueprint, jsonify, request
from database import db
from sqlalchemy import text

data_bp = Blueprint('data_bp', __name__)

# get the temperature for all countries
# Todo: filter the database for four seasons and all countries
@data_bp.route('/api/data/all-countries', methods=['GET'])
def get_all_countries():
    season = request.args.get('season')
    year = request.args.get('year')
    # four seasons to filter out
    four_seasons = ["DecJanFeb", "MarAprMay", "JunJulyAug", "SepOctNov"]
    # if user has passed the correct season
    if season not in four_seasons:
        return jsonify({"error: ", "Invalid Season"}), 400
    
    query = text("""
                 SELECT * FROM temperature_change 
                 WHERE "Months" = :season
                 AND "Element" = 'Temperature change'
                 """)
    result = db.session.execute(query, {"season": season})
    rows = result.fetchall()
    data = [dict(row._mapping) for row in rows]

    # filter the data further for the sepecific year
    filtered_data=[]
    for country in data:
        # get the temperature change for the selected year
        temp_change = country.get(f'Y{year}')
        # if temp change has data
        if temp_change is not None:
            country['temperatureChange'] = temp_change
            filtered_data.append(country)

    return jsonify(filtered_data) # this is the filtered data based on the season and selected year

