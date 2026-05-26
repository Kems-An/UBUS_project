import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CAMPAY_USERNAME = Deno.env.get('CAMPAY_USERNAME')!;
const CAMPAY_PASSWORD = Deno.env.get('CAMPAY_PASSWORD')!;
const CAMPAY_BASE_URL = 'https://demo.campay.net/api';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { phone, amount } = await req.json();

    // Step 1: Get access token from CamPay
    const tokenRes = await fetch(`${CAMPAY_BASE_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: CAMPAY_USERNAME,
        password: CAMPAY_PASSWORD,
      }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.token;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Could not get CamPay token' }), {
        headers: { ...cors, 'Content-Type': 'application/json' }, status: 400,
      });
    }

    // Step 2: Initiate payment — this sends a prompt to the user's phone
    const payRes = await fetch(`${CAMPAY_BASE_URL}/collect/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        amount: String(amount),
        currency: 'XAF',
        from: '237' + phone.replace(/^0/, '').replace(/\s/g, ''),
        description: 'Shuttle seat reservation',
        external_reference: 'SHUTTLE-' + Date.now(),
      }),
    });

    const payData = await payRes.json();

    return new Response(JSON.stringify(payData), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: payRes.ok ? 200 : 400,
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...cors, 'Content-Type': 'application/json' }, status: 500,
    });
  }
});