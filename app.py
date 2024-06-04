from flask import Flask, request, jsonify
from flask_cors import CORS # security
from openai import OpenAI
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth

load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = os.environ.get('SECRET_KEY')

cred = credentials.Certificate(os.getenv('FIREBASE_ADMINSDK_JSON'))
firebase_admin.initialize_app(cred)

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


@app.after_request
def set_headers(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin-allow-popups'
    return response

@app.route('/secure-endpoint', methods=['POST'])
def secure_endpoint():
    id_token = request.headers.get('Authorization')
    if not id_token or not id_token.startswith('Bearer '):
        return jsonify({"error": "Unauthorized"}), 401
    
    id_token = id_token.split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']

        return jsonify({"success": "Secure content access granted"}), 200
    except Exception as e:
        app.logger.error(f"An error occurred: {e}", exc_info=True)
        return jsonify({"error": "Invalid token"}), 401

# Chat endpoint
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    input_text = data.get('input_text', '')

    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo",  # Update to the correct model, if necessary
            messages = [
                {"role": "system", "content": "You are a professional healthcare assistant specializing only in nutrition and diet-related issues and nothing else."},
                {"role": "user", "content": f"Reply the {input_text} in just 50 words."}
            ],
            max_tokens=150,  # Adjusting tokens to limit the output
            n = 1,
            stop = None,
            temperature=0.7,
        )
        response_text = response.choices[0].message.content.strip()
        
        # Limit the response to 20 words
        word_limit = 50
        words = response_text.split()[:word_limit]
        limited_response = ' '.join(words)
        
        return jsonify({"response": limited_response})
    except Exception as e:
        app.logger.error(f"An error occurred: {e}", exc_info=True)
        return jsonify({"error": "An internal error occurred"}), 500

# Main entry point
if __name__ == '__main__':
    app.run(debug=True)