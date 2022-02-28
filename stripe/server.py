#! /usr/bin/env python3.8

import os
from flask import Flask, redirect, jsonify, json, request, current_app
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51KEFkuKCSMstkl8jZI5BrZw74oJiYuOivK5TpZBFzReJTC8axO8ly8KziL2QeBQk7oigrpP47BbnQy1zNARp1qTf00EIz5bK5i'

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

YOUR_DOMAIN = 'http://localhost:4242'

price_id = request.form.get('priceId')

session = stripe.checkout.Session.create(
  success_url='https://localhost.com/success.html?session_id={CHECKOUT_SESSION_ID}',
  cancel_url='https://localhost.com/canceled.html',
  mode='subscription',
  line_items=[{
    'price': price_id,
    # For metered billing, do not pass quantity
    'quantity': 1
  }],
)

@app.route('/webhook', methods=['POST'])
def webhook_received():
    webhook_secret = {{'STRIPE_WEBHOOK_SECRET'}}
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    if event_type == 'checkout.session.completed':
    # Payment is successful and the subscription is created.
    # You should provision the subscription and save the customer ID to your database.
      print(data)
    elif event_type == 'invoice.paid':
    # Continue to provision the subscription as payments continue to be made.
    # Store the status in your database and check when a user accesses your service.
    # This approach helps you avoid hitting rate limits.
      print(data)
    elif event_type == 'invoice.payment_failed':
    # The payment failed or the customer does not have a valid payment method.
    # The subscription becomes past_due. Notify your customer and send them to the
    # customer portal to update their payment information.
      print(data)
    else:
      print('Unhandled event type {}'.format(event_type))

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(port=4242)