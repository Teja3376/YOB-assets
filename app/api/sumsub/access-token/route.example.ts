/**
 * EXAMPLE API ROUTE FOR SUMSUB ACCESS TOKEN GENERATION
 * 
 * This is an example file showing how to create the API endpoint.
 * 
 * To use this:
 * 1. Create the file at: app/api/sumsub/access-token/route.ts
 * 2. Install required packages: npm install crypto axios
 * 3. Add your Sumsub credentials to environment variables
 * 4. Uncomment and configure the code below
 */

/*
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

// Sumsub API configuration
const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN || '' // Your Sumsub App Token
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY || '' // Your Sumsub Secret Key
const SUMSUB_BASE_URL = process.env.SUMSUB_BASE_URL || 'https://api.sumsub.com'

// Generate signature for Sumsub API
function createSignature(timestamp: number, method: string, path: string, body: string = '') {
  const message = timestamp + method.toUpperCase() + path + body
  return crypto
    .createHmac('sha256', SUMSUB_SECRET_KEY)
    .update(message)
    .digest('hex')
}

// Create applicant in Sumsub (if needed)
async function createApplicant(userId: string, email?: string, phone?: string) {
  const timestamp = Math.floor(Date.now() / 1000)
  const path = '/resources/applicants'
  const body = JSON.stringify({
    externalUserId: userId,
    email: email,
    phone: phone,
  })

  const signature = createSignature(timestamp, 'POST', path, body)

  try {
    const response = await axios.post(`${SUMSUB_BASE_URL}${path}`, body, {
      headers: {
        'X-App-Token': SUMSUB_APP_TOKEN,
        'X-App-Access-Ts': timestamp.toString(),
        'X-App-Access-Sig': signature,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Error creating applicant:', error.response?.data)
    throw error
  }
}

// Generate access token for applicant
async function generateAccessToken(applicantId: string) {
  const timestamp = Math.floor(Date.now() / 1000)
  const path = `/resources/accessTokens?userId=${applicantId}&ttlInSecs=600`
  const signature = createSignature(timestamp, 'POST', path)

  try {
    const response = await axios.post(
      `${SUMSUB_BASE_URL}${path}`,
      {},
      {
        headers: {
          'X-App-Token': SUMSUB_APP_TOKEN,
          'X-App-Access-Ts': timestamp.toString(),
          'X-App-Access-Sig': signature,
        },
      }
    )
    return response.data.token
  } catch (error: any) {
    console.error('Error generating access token:', error.response?.data)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user ID from request (from your auth system)
    const body = await request.json()
    const userId = body.userId || body.externalUserId

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user email/phone from session or request
    const email = body.email
    const phone = body.phone

    // Check if applicant already exists, if not create one
    let applicantId = userId // You might want to store this in your DB

    // Generate access token
    const token = await generateAccessToken(applicantId)

    return NextResponse.json({
      token,
      accessToken: token, // Support both formats
      applicantId,
    })
  } catch (error: any) {
    console.error('Error in Sumsub access token route:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate access token' },
      { status: 500 }
    )
  }
}
*/
