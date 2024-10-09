from flask import Flask, request, Blueprint, jsonify
import requests, os, base64
from requests.auth import HTTPBasicAuth
from datetime import datetime


my_endpoint = "https://150f-102-209-18-74.ngrok-free.app"  # from NGROK for exposing host api
mpesa_bp = Blueprint('mpesa_bp', __name__)

# Initiate M-PESA Express request
# POST /pay to initiate payment request
@mpesa_bp.route('/pay', methods=['POST'])
def MpesaExpress():
    data = request.get_json()  
    amount = data.get('amount')  
    phone = data.get('phone')  

    # Validate parameters
    if not amount or not phone:
        return jsonify({"error": "Amount and phone number are required."}), 400

    if not phone.startswith("254"):
        return jsonify({"error": "Phone number must start with 254 (Kenyan format)."}), 400

    # M-Pesa API details
    endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    access_token = getAccesstoken()  # Get the M-Pesa API access token
    headers = {"Authorization": "Bearer %s" % access_token}
    
    # Timestamp for the transaction
    Timestamp = datetime.now()
    times = Timestamp.strftime("%Y%m%d%H%M%S")
    
    # Password for the M-Pesa transaction
    password = os.getenv("MPESA_PASSWORD") + times
    password = base64.b64encode(password.encode('utf-8')).decode('utf-8')
    
    # Data payload for the M-Pesa request
    data_to_send = {
        "BusinessShortCode": "174379", 
        "Password": password,
        "Timestamp": times,
        "TransactionType": "CustomerPayBillOnline",
        "PartyA": phone, 
        "PartyB": "174379",  
        "PhoneNumber": phone, 
        "CallBackURL": my_endpoint + "/lnmo-callback",
        "AccountReference": "Sheria-360",
        "TransactionDesc": "Deposit of Funds", 
        "Amount": amount, 
    }

    try:
        # Send the request to M-Pesa API
        response = requests.post(endpoint, json=data_to_send, headers=headers)
        response.raise_for_status()  
        result = response.json()
        
        # Check if payment was canceled by the user
        result_code = result.get("Body", {}).get("stkCallback", {}).get("ResultCode")
        if result_code == 1032:
            return jsonify({
                "status": "Payment Canceled",
                "message": "The payment request was canceled by the user.",
                "details": result
            })
        elif result.get("ResponseCode") == "0":
            return jsonify({
                "status": "success",
                "message": "Your payment request has been successfully submitted and is being processed.",
                "details": result
            })
        else:
            return jsonify({
                "status": "error",
                "message": result.get("CustomerMessage", "An error occurred during payment request."),
                "details": result
            })
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

# Handle the M-Pesa callback
@mpesa_bp.route('/lnmo-callback', methods=["POST"])
def incoming():
    data = request.get_json()
    print(data)  # Log the callback data (ensure proper logging in production)
    return "ok"

# Get the M-Pesa access token (authorization API)
def getAccesstoken():
    consumer_key = os.getenv("MPESA_CONSUMER_KEY", "DtBr...")  # M-Pesa API consumer key
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET", "rdZdcjT...")  #  M-Pesa API consumer secret
    endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    # Request access token from M-Pesa
    r = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    r.raise_for_status()
    data = r.json()
    return data['access_token']  
