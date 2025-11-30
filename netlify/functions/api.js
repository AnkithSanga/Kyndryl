/**
 * Netlify Function: API Router
 * Proxies all /api/* requests to the Python Flask backend
 * 
 * This function acts as a bridge between the frontend and the serverless Flask backend.
 * It handles request routing, method forwarding, and response transformation.
 */

const axios = require('axios');

// Determine the backend URL based on environment
const BACKEND_URL = process.env.FLASK_BACKEND_URL || 'http://localhost:5000';

// Export the handler for Netlify
exports.handler = async (event, context) => {
  try {
    // Extract request details
    const { httpMethod, path, body, headers } = event;
    
    // Remove the /.netlify/functions/api prefix from path
    const apiPath = path.replace('/.netlify/functions/api', '');
    
    // Construct the full backend URL
    const backendUrl = `${BACKEND_URL}${apiPath}`;
    
    console.log(`[API Router] ${httpMethod} ${apiPath}`);
    
    // Prepare request configuration
    const axiosConfig = {
      method: httpMethod.toLowerCase(),
      url: backendUrl,
      headers: {
        'Content-Type': headers['content-type'] || 'application/json',
        'User-Agent': 'Netlify-Function'
      },
      validateStatus: () => true // Accept all status codes
    };
    
    // Add body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(httpMethod)) {
      axiosConfig.data = body ? JSON.parse(body) : {};
    }
    
    // Make request to Flask backend
    const response = await axios(axiosConfig);
    
    console.log(`[API Router] Response status: ${response.status}`);
    
    // Return response to client
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(response.data)
    };
    
  } catch (error) {
    console.error('[API Router] Error:', error.message);
    
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Backend service unavailable',
        message: error.message
      })
    };
  }
};
