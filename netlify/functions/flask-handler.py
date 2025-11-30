"""
Netlify Serverless Function: Flask Backend Handler
Uses Railpack to wrap Flask application for Netlify Functions

This handler converts the Flask app to work with Netlify's serverless environment.
The Flask backend is packaged as a serverless function that handles all /api/* requests.
"""

import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../backend'))

# Import the Flask app from backend
from app import app

# Railpack handler - wraps Flask for serverless environment
def handler(event, context):
    """
    Netlify Functions handler for Flask application
    
    Args:
        event: AWS Lambda event containing HTTP request details
        context: AWS Lambda context
    
    Returns:
        dict: Response in Netlify Functions format
    """
    
    # Convert Netlify event to WSGI environ
    from werkzeug.test import EnvironBuilder
    from werkzeug.serving import WSGIRequestHandler
    
    # Extract event details
    path = event.get('path', '/')
    method = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    body = event.get('body', '')
    
    # Build WSGI environment
    builder = EnvironBuilder(
        method=method,
        path=path,
        data=body,
        headers=headers,
        content_type=headers.get('Content-Type', 'application/json')
    )
    
    env = builder.get_environ()
    
    # Capture response
    response_started = []
    response_data = []
    
    def start_response(status, response_headers):
        response_started.append({
            'status': int(status.split()[0]),
            'headers': dict(response_headers)
        })
        return lambda s: response_data.append(s)
    
    # Call Flask app
    try:
        response_iter = app.wsgi_app(env, start_response)
        response_body = b''.join(response_iter)
        
        if response_started:
            status_code = response_started[0]['status']
            headers = response_started[0]['headers']
        else:
            status_code = 200
            headers = {}
        
        return {
            'statusCode': status_code,
            'headers': {
                **headers,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': response_body.decode('utf-8') if isinstance(response_body, bytes) else response_body,
            'isBase64Encoded': False
        }
        
    except Exception as e:
        import traceback
        print(f"Error in Flask handler: {e}")
        traceback.print_exc()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }
