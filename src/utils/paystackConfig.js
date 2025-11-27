// Paystack Configuration
export const paystackConfig = {
  publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  secretKey: process.env.REACT_APP_PAYSTACK_SECRET_KEY,
  baseUrl: 'https://api.paystack.co',
};

// Fixed plan creation function
const createOrGetSubscriptionPlan = async (amount, donationType) => {
  const planName = `sethuse-${donationType}-${amount}`;
  const planInterval = donationType === 'monthly' ? 'monthly' : 'annually';
  
  console.log('🔧 ===== PLAN CREATION START =====');
  console.log('📊 Plan Details:', { planName, amount, donationType, planInterval });
  console.log('🔑 Secret Key Status:', paystackConfig.secretKey ? '✅ Set' : '❌ Missing');

  if (!paystackConfig.secretKey) {
    console.error('❌ PAYSTACK SECRET KEY IS MISSING! Check your environment variables.');
    throw new Error('Paystack secret key is not configured');
  }

  try {
    // Step 1: Fetch all existing plans
    console.log('📋 Step 1: Fetching existing plans...');
    const plansResponse = await fetch('https://api.paystack.co/plan', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    const plansData = await plansResponse.json();
    console.log('📋 Plans API Response Status:', plansData.status);
    console.log('📋 Plans API Data:', plansData);
    
    if (!plansResponse.ok) {
      console.error('❌ Failed to fetch plans. HTTP Status:', plansResponse.status);
      console.error('❌ Error Message:', plansData.message);
      throw new Error(`Failed to fetch plans: ${plansData.message || 'Unknown error'}`);
    }

    if (plansData.status) {
      console.log(`📋 Found ${plansData.data?.length || 0} existing plans`);
      
      // Look for existing plan with same name and amount
      const existingPlan = plansData.data?.find(plan => {
        const match = plan.name === planName && plan.amount === amount * 100;
        if (match) {
          console.log('✅ Found matching existing plan:', plan);
        }
        return match;
      });
      
      if (existingPlan) {
        console.log('🎯 Using existing plan:', existingPlan.plan_code);
        console.log('🔚 ===== PLAN CREATION END (EXISTING) =====');
        return existingPlan.plan_code;
      } else {
        console.log('🔍 No existing plan found with name:', planName);
      }
    } else {
      console.error('❌ Plans API returned error status');
      console.error('❌ Error Message:', plansData.message);
    }
    
    // Step 2: Create new plan - FIXED: Removed problematic parameters
    console.log('🔄 Step 2: Creating new subscription plan...');
    
    const planData = {
      name: planName,
      amount: amount * 100, // Convert to kobo
      interval: planInterval,
      currency: 'ZAR',
      description: `${donationType === 'monthly' ? 'Monthly' : 'Annual'} donation of R${amount} to Sethuse Community Haven`
      // ✅ REMOVED: hosted_page, send_invoices, send_sms - these were causing errors
    };

    console.log('📤 Sending plan creation request:', planData);

    const createPlanResponse = await fetch('https://api.paystack.co/plan', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });
    
    const planResponseData = await createPlanResponse.json();
    console.log('📥 Plan Creation Response Status:', planResponseData.status);
    console.log('📥 Plan Creation Response Data:', planResponseData);
    
    if (!createPlanResponse.ok) {
      console.error('❌ Plan creation failed. HTTP Status:', createPlanResponse.status);
      console.error('❌ Error Message:', planResponseData.message);
      throw new Error(`Plan creation failed: ${planResponseData.message || 'Unknown error'}`);
    }

    if (planResponseData.status && planResponseData.data) {
      console.log('✅ Subscription plan created successfully!');
      console.log('🎯 New Plan Code:', planResponseData.data.plan_code);
      console.log('🔚 ===== PLAN CREATION END (NEW) =====');
      return planResponseData.data.plan_code;
    } else {
      console.error('❌ Plan creation returned error status');
      console.error('❌ Error Message:', planResponseData.message);
      throw new Error(planResponseData.message || 'Failed to create subscription plan');
    }
    
  } catch (error) {
    console.error('❌ ===== PLAN CREATION FAILED =====');
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
    console.error('🔚 ===== PLAN CREATION END (ERROR) =====');
    throw error;
  }
};

// Test function to verify plan creation
export const testPlanCreation = async (amount = 500, type = 'monthly') => {
  console.log('🧪 ===== TEST PLAN CREATION =====');
  try {
    const planCode = await createOrGetSubscriptionPlan(amount, type);
    console.log('✅ Test Plan Creation SUCCESS - Plan Code:', planCode);
    return planCode;
  } catch (error) {
    console.error('❌ Test Plan Creation FAILED:', error.message);
    return null;
  }
};

// Paystack payment initialization
export const initializePaystackPayment = async (paymentData) => {
  console.log('🔄 ===== PAYSTACK PAYMENT INITIALIZATION START =====');
  console.log('📊 Payment Data:', paymentData);

  try {
    // Base payment data
    const requestData = {
      email: paymentData.email,
      amount: paymentData.amount * 100, // Paystack expects amount in kobo
      currency: 'ZAR',
      reference: `sethuse-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      // UPDATED: Using exact Render domain for reliability
      callback_url: `https://sethuse-website-um0s.onrender.com/#/donate?payment=success&gateway=paystack&email=${encodeURIComponent(paymentData.email)}&amount=${paymentData.amount}&name=${encodeURIComponent(paymentData.name)}&type=${paymentData.donationType}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: paymentData.name
          },
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: paymentData.donationType
          },
          {
            display_name: "Message",
            variable_name: "message",
            value: paymentData.message || ''
          },
          {
            display_name: "Organization",
            variable_name: "organization", 
            value: "Sethuse Community Haven"
          }
        ]
      }
    };

    // Handle subscription for monthly donations
    if (paymentData.donationType === 'monthly') {
      console.log('💰 Processing monthly subscription...');
      try {
        const planCode = await createOrGetSubscriptionPlan(paymentData.amount, 'monthly');
        requestData.plan = planCode;
        
        // Update description for subscription
        requestData.metadata.custom_fields.push({
          display_name: "Subscription Plan",
          variable_name: "subscription_plan",
          value: planCode
        });
        
        console.log('✅ Subscription plan attached:', planCode);
      } catch (planError) {
        console.error('❌ Failed to setup subscription, falling back to one-time:', planError);
        // Fallback to one-time payment if subscription setup fails
        requestData.metadata.custom_fields.push({
          display_name: "Subscription Fallback",
          variable_name: "subscription_fallback",
          value: "Subscription setup failed, processed as one-time"
        });
        
        // Update item description for fallback
        requestData.metadata.custom_fields = requestData.metadata.custom_fields.map(field => 
          field.variable_name === 'donation_type' 
            ? { ...field, value: 'once' } 
            : field
        );
      }
    } else {
      console.log('💰 Processing one-time donation...');
    }

    console.log('📤 Sending payment request to Paystack:', requestData);

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    console.log('📥 Paystack Initialization Response:', data);
    
    if (!response.ok) {
      console.error('❌ Paystack API Error. HTTP Status:', response.status);
      console.error('❌ Error Message:', data.message);
      throw new Error(data.message || `HTTP ${response.status}: Payment initialization failed`);
    }
    
    if (data.status && data.data) {
      console.log('✅ Payment initialized successfully!');
      console.log('🔗 Authorization URL:', data.data.authorization_url);
      console.log('🔚 ===== PAYMENT INITIALIZATION END (SUCCESS) =====');
      
      // Redirect to Paystack payment page
      window.location.href = data.data.authorization_url;
      return true;
    } else {
      const errorMsg = data.message || 'Failed to initialize payment';
      console.error('❌ Paystack returned error status');
      console.error('❌ Error Message:', errorMsg);
      console.log('🔚 ===== PAYMENT INITIALIZATION END (ERROR) =====');
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('❌ ===== PAYMENT INITIALIZATION FAILED =====');
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
    console.log('🔚 ===== PAYMENT INITIALIZATION END (FAILED) =====');
    throw error;
  }
};

// Verify Paystack payment
export const verifyPaystackPayment = async (reference) => {
  console.log('🔍 ===== PAYMENT VERIFICATION START =====');
  console.log('🔍 Verifying Paystack payment:', reference);
  
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('📥 Paystack Verification Response:', data);
    
    if (!response.ok) {
      console.error('❌ Verification API Error. HTTP Status:', response.status);
      console.error('❌ Error Message:', data.message);
      throw new Error(data.message || `HTTP ${response.status}: Verification failed`);
    }
    
    if (data.status && data.data.status === 'success') {
      console.log('✅ Payment verification SUCCESS!');
      console.log('🔚 ===== VERIFICATION END (SUCCESS) =====');
    } else {
      console.error('❌ Payment verification FAILED');
      console.error('❌ Transaction Status:', data.data?.status);
      console.log('🔚 ===== VERIFICATION END (FAILED) =====');
    }
    
    return data;
  } catch (error) {
    console.error('❌ ===== PAYMENT VERIFICATION FAILED =====');
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
    console.log('🔚 ===== VERIFICATION END (ERROR) =====');
    throw error;
  }
};

// Get subscription details
export const getSubscriptionDetails = async (subscriptionCode) => {
  console.log('📋 Fetching subscription details:', subscriptionCode);
  
  try {
    const response = await fetch(`https://api.paystack.co/subscription/${subscriptionCode}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('📋 Subscription Details:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to get subscription details:', error);
    throw error;
  }
};

// Get all plans (for debugging)
export const getAllPlans = async () => {
  console.log('📋 Fetching all plans...');
  
  try {
    const response = await fetch('https://api.paystack.co/plan', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('📋 All Plans:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch plans:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (subscriptionCode) => {
  console.log('🗑️ Cancelling subscription:', subscriptionCode);
  
  try {
    const response = await fetch(`https://api.paystack.co/subscription/${subscriptionCode}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('📋 Cancel Subscription Response:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to cancel subscription:', error);
    throw error;
  }
};

// Enhanced subscription monitoring
export const checkSubscriptionStatus = async (customerEmail) => {
  console.log('🔍 Checking subscription status for:', customerEmail);
  
  try {
    // Search for customer
    const customerResponse = await fetch(`https://api.paystack.co/customer?email=${customerEmail}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const customerData = await customerResponse.json();
    console.log('📋 Customer Search Response:', customerData);
    
    if (customerData.status && customerData.data.length > 0) {
      const customer = customerData.data[0];
      console.log('✅ Customer found in Paystack:', customer);
      
      // Check for subscriptions
      if (customer.subscriptions && customer.subscriptions.length > 0) {
        console.log('📋 Customer subscriptions:', customer.subscriptions);
        return {
          hasSubscriptions: true,
          subscriptions: customer.subscriptions
        };
      } else {
        console.log('ℹ️ Customer has no subscriptions');
      }
    } else {
      console.log('ℹ️ Customer not found in Paystack');
    }
    
    return {
      hasSubscriptions: false,
      subscriptions: []
    };
  } catch (error) {
    console.error('❌ Error checking subscription status:', error);
    return null;
  }
};

// Export the plan creation function for testing
export { createOrGetSubscriptionPlan };