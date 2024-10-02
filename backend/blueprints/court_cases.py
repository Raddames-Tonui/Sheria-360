from flask import Blueprint, request, jsonify
from models import Case, db
import logging

court_cases_bp = Blueprint('court_cases_bp', __name__)

# Route for fetching cases
@court_cases_bp.route('/search-case', methods=['GET'])
@court_cases_bp.route('/search-case', methods=['GET'])
def search_case():
    # Get parameters from the frontend request
    station = request.args.get('station')
    court = request.args.get('court')
    case_code = request.args.get('caseCode')
    case_number = request.args.get('caseNumber')
    year = request.args.get('year')

    # Log the received parameters
    logging.info(f"Received parameters: station={station}, court={court}, case_code={case_code}, case_number={case_number}, year={year}")

    # Check if at least one parameter is provided
    if not (station or court or case_code or case_number or year):
        return jsonify({"error": "No search criteria provided"}), 400

    # Build query dynamically based on provided parameters
    query = Case.query

    if station:
        query = query.filter_by(station=station)
    if court:
        query = query.filter_by(court=court)
    if case_code:
        query = query.filter_by(case_code=case_code)
    if case_number:
        query = query.filter_by(case_number=case_number)
    if year:
        try:
            query = query.filter(db.extract('year', Case.created_at) == int(year))
        except ValueError:
            return jsonify({"error": "Invalid year format"}), 400

    # Execute query and fetch the first matching case
    case = query.first()  # Fetch only the first matching case

    if case:
        # Convert the case instance to a dictionary using to_dict
        case_details = case.to_dict()
        return jsonify(case_details), 200
    else:
        return jsonify({"error": "No case found matching the criteria!"}), 404
