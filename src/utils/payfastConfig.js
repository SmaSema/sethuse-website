// PayFast Configuration for Sandbox/Test Environment - Client Side Only

export const payfastConfig = {
  // Sandbox/test environment URLs
  merchant: {
    id: '10000100', // PayFast test merchant ID
    key: '46f0cd694581a' // PayFast test merchant key
  },
  urls: {
    process: 'https://sandbox.payfast.co.za/eng/process',
    validate: 'https://sandbox.payfast.co.za/eng/query/validate'
  },
  // Return URLs for after payment
  returnUrl: `${window.location.origin}/#/donate/success`,
  cancelUrl: `${window.location.origin}/#/donate/cancel`,
  notifyUrl: `${window.location.origin}/api/payfast/notify` // You'll need a backend for this in production
};

// Simple client-side parameter preparation (without crypto)
// In production, signature generation should be done server-side
export const preparePaymentData = (data, passPhrase = '') => {
  // Create parameter string for debugging (not for actual signature)
  let pfOutput = '';
  const keys = Object.keys(data).sort();
  
  keys.forEach(key => {
    if (data[key] !== '') {
      pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
    }
  });
  
  // Remove last ampersand
  const getString = pfOutput.slice(0, -1);
  
  console.log('Payment parameters prepared:', getString);
  
  // For sandbox testing, we don't need the signature
  // PayFast sandbox often works without signature for testing
  return data;
};