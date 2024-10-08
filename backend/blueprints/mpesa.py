from flask import jsonify, request, abort, Blueprint
import requests
from requests.auth import HTTPBasicAuth
import base64
from datetime import datetime
import os

mpesa_bp = Blueprint('mpesa_bp', __name__)

my_endpoint = 'MY_ENDPOINT'

@mpesa_bp.route('/pay', methods=['POST'])
def MpesaExpress():
    data = request.get_json()
    
    # Validate incoming data
    if not data or not all(key in data for key in ('amount', 'phone')):
        abort(400, description="Invalid input")
    
    try:
        amount = float(data['amount'])  # Convert amount to float
    except ValueError:
        abort(400, description="Invalid amount format")
    
    phone = str(data['phone']).strip()  # Ensure phone is a string and strip any spaces
    
    if not phone.startswith('254') or not phone.isdigit() or len(phone) != 12:
        abort(400, description="Invalid phone number format")
    
    endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    access_token = getAccesstoken()
    headers = {"Authorization": "Bearer %s" % access_token}
    
    Timestamp = datetime.now()
    times = Timestamp.strftime("%Y%m%d%H%M%S")
    password = os.getenv("MPESA_SHORTCODE", "174379") + os.getenv("MPESA_PASSKEY", "bfb279f9...") + times
    password = base64.b64encode(password.encode('utf-8')).decode('utf-8')
    
    data_to_send = {
        "BusinessShortCode": os.getenv("MPESA_SHORTCODE", "174379"),
        "Password": password,
        "Timestamp": times,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,  # Phone number initiating the payment
        "PartyB": os.getenv("MPESA_SHORTCODE", "174379"),
        "PhoneNumber": phone,
        "CallBackURL": my_endpoint + "/lnmo-callback",
        "AccountReference": "JOB MTAANI",
        "TransactionDesc": "Deposit of Funds"
    }
    
    try:
        response = requests.post(endpoint, json=data_to_send, headers=headers)
        response.raise_for_status()  # Raise exception for HTTP errors
        result = response.json()
        
        # Handle response
        result_code = result.get("Body", {}).get("stkCallback", {}).get("ResultCode")
        if result_code == 1032:
            return jsonify({
                "status": "Payment Canceled",
                "message": "The payment request was canceled by the user.",
                "details": result
            })
        elif result.get("ResponseCode") == "0":
            return jsonify({
                "status": "Payment Requested",
                "message": "Your payment request has been successfully submitted and is being processed. Please wait for further updates.",
                "details": result
            })
        else:
            return jsonify({
                "status": "Payment Request Failed",
                "message": result.get("CustomerMessage", "An error occurred during payment request."),
                "details": result
            })
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
    

@mpesa_bp.route('/lnmo-callback', methods=["POST"])
def incoming():
    data = request.get_json()
    print(data)  # For logging, consider better logging mechanisms in production
    return "ok"


def getAccesstoken():
    consumer_key = os.getenv("MPESA_CONSUMER_KEY", "5OvYNm...")
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET", "rdZdcjT...")
    endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    r = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    r.raise_for_status()
    data = r.json()
    return data['access_token']
