import { payfastConfig } from './payfastConfig';

export const initiatePayFastPayment = (paymentData, donationType) => {
  const paymentId = `sethuse-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const pfData = {
    merchant_id: payfastConfig.merchant.id,
    merchant_key: payfastConfig.merchant.key,
    amount: paymentData.amount,
    item_name: paymentData.item_name || `${donationType === 'monthly' ? 'Monthly' : 'Once-Off'} Donation - Sethuse Community Haven`,
    item_description: paymentData.item_description || 'Supporting community programs through your generous donation',
    name_first: paymentData.name_first || 'Donor',
    name_last: paymentData.name_last || '',
    email_address: paymentData.email_address,
    m_payment_id: paymentId,
    custom_str1: paymentData.custom_str1 || '',
    custom_str2: donationType,
    custom_str3: 'sethuse-community-haven',
    return_url: payfastConfig.returnUrl,
    cancel_url: payfastConfig.cancelUrl,
    notify_url: payfastConfig.notifyUrl,
  };

  if (donationType === 'monthly') {
    pfData.subscription_type = 1;
    pfData.frequency = 3;
    pfData.cycles = 0;
  }

  submitToPayFast(pfData);
};

const submitToPayFast = (pfData) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payfastConfig.urls.process;
  form.style.display = 'none';

  Object.keys(pfData).forEach(key => {
    if (pfData[key] !== null && pfData[key] !== undefined && pfData[key] !== '') {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = pfData[key];
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
  
  setTimeout(() => {
    if (document.body.contains(form)) {
      document.body.removeChild(form);
    }
  }, 1000);
};

export const validatePaymentData = (data) => {
  const errors = [];
  
  if (!data.amount || parseFloat(data.amount) <= 0) {
    errors.push('Invalid donation amount');
  }
  
  if (!data.email_address || !data.email_address.includes('@')) {
    errors.push('Valid email address is required');
  }
  
  if (!data.name_first || data.name_first.trim().length < 2) {
    errors.push('First name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};