# Sumsub KYB Integration Guide

This guide explains how to integrate Sumsub KYB (Know Your Business) verification into your application.

## Prerequisites

1. **Sumsub Account**: Sign up at [sumsub.com](https://sumsub.com) and get your credentials
2. **Sumsub Credentials**:
   - App Token
   - Secret Key
   - Base URL (usually `https://api.sumsub.com`)

## Installation

### 1. Install Required Packages

```bash
npm install crypto axios
```

Note: The Sumsub WebSDK is loaded dynamically from their CDN, so no additional package installation is needed for the SDK itself.

### 2. Set Environment Variables

Add these to your `.env.local` file:

```env
SUMSUB_APP_TOKEN=your_app_token_here
SUMSUB_SECRET_KEY=your_secret_key_here
SUMSUB_BASE_URL=https://api.sumsub.com
```

## Backend Setup

### Create API Route for Access Token Generation

Create the file: `app/api/sumsub/access-token/route.ts`

This endpoint will:
1. Create or retrieve a Sumsub applicant
2. Generate an access token for the KYB widget

**Important**: The example file is at `app/api/sumsub/access-token/route.example.ts`. Copy it to `route.ts` and configure it with your credentials.

### Backend API Endpoint (Your Server)

Alternatively, you can create the endpoint on your backend server. Update the API client in `lib/api-client.ts` to point to your backend:

```typescript
getSumsubAccessToken: async (userId?: string) => {
  const response = await api.post("/sumsub/access-token", { userId });
  return response.data;
},
```

Your backend should:
1. Create/retrieve applicant in Sumsub
2. Generate access token
3. Return the token to the frontend

## Frontend Integration

The integration is already set up in:
- `components/features/auth/sumsub-kyb-widget.tsx` - The Sumsub widget component
- `app/kyb/page.tsx` - The KYB page that uses the widget

### How It Works

1. User completes registration and OTP verification
2. For new users, they're redirected to `/kyb`
3. The KYB page fetches a Sumsub access token from your API
4. The Sumsub widget is initialized with the token
5. User completes KYB verification in the Sumsub widget
6. On completion, user is redirected to `/apply`

## Sumsub API Integration (Backend)

### Step 1: Create Applicant

```javascript
POST https://api.sumsub.com/resources/applicants
Headers:
  X-App-Token: YOUR_APP_TOKEN
  X-App-Access-Ts: TIMESTAMP
  X-App-Access-Sig: SIGNATURE
Body:
  {
    "externalUserId": "user_123",
    "email": "user@example.com",
    "phone": "+1234567890"
  }
```

### Step 2: Generate Access Token

```javascript
POST https://api.sumsub.com/resources/accessTokens?userId=APPLICANT_ID&ttlInSecs=600
Headers:
  X-App-Token: YOUR_APP_TOKEN
  X-App-Access-Ts: TIMESTAMP
  X-App-Access-Sig: SIGNATURE
```

### Signature Generation

The signature is required for all Sumsub API calls:

```javascript
const crypto = require('crypto');

function createSignature(timestamp, method, path, body = '') {
  const message = timestamp + method.toUpperCase() + path + body;
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(message)
    .digest('hex');
}
```

## Testing

1. Use Sumsub's sandbox environment for testing
2. Test with different business types and countries
3. Verify the completion callback works correctly
4. Test error handling scenarios

## Production Checklist

- [ ] Replace sandbox credentials with production credentials
- [ ] Set up proper error handling and logging
- [ ] Configure webhook endpoints for status updates (optional)
- [ ] Test the full flow: Register → OTP → KYB → Apply → Dashboard
- [ ] Set up monitoring for failed verifications
- [ ] Configure proper token expiration times

## Webhook Setup (Optional)

Sumsub can send webhooks when verification status changes. Set up webhook endpoints to:
- Update user status in your database
- Send notifications
- Handle verification results

## Support

- [Sumsub Documentation](https://developers.sumsub.com/)
- [Sumsub WebSDK Docs](https://developers.sumsub.com/web-sdk/)
- [Sumsub API Reference](https://developers.sumsub.com/api-reference/)

## Troubleshooting

### Widget Not Loading
- Check browser console for errors
- Verify the Sumsub SDK script is loading
- Check network requests to Sumsub CDN

### Access Token Errors
- Verify your Sumsub credentials are correct
- Check token expiration time
- Ensure signature generation is correct

### Verification Not Completing
- Check Sumsub dashboard for applicant status
- Verify webhook endpoints (if configured)
- Check browser console for SDK events
