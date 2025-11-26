# 🌍 Sethuse Community Haven Website

A responsive web platform built to support **Sethuse Community Haven**, a nonprofit initiative focused on community upliftment, transparency, and stakeholder engagement.

### 🔗 Live Site:
[sethuse-website-um0s.onrender.com](https://sethuse-website-um0s.onrender.com)


## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Payment Integration](#-payment-integration)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 💳 Payment Features
- **One-time Donations** – Secure single payments via Paystack  
- **Monthly Subscriptions** – Automated recurring donations with subscription management  
- **Multiple Amount Options** – Pre-set amounts (R100 - R5000) or custom amount  
- **Secure Processing** – PCI DSS compliant payment handling  

### 🎨 User Experience
- **Responsive Design** – Works perfectly on desktop, tablet, and mobile  
- **Real-time Email Confirmation** – Automatic donation receipts via EmailJS  
- **Interactive UI** – Smooth animations and intuitive donation flow  
- **Subscription Management** – Clear instructions for managing/canceling subscriptions  

### 🔧 Technical Features
- **React Router** – Single Page Application with smooth navigation 
- **.env Configuration** – Secure API key management  
- **Error Handling** – Comprehensive payment success/failure logic  
- **Duplicate Prevention** – Smart email confirmation system  

---

## 🛠 Tech Stack

### Frontend
- React.js 18  
- React Router DOM  
- CSS3 (Grid, Flexbox, Animations)  
- AOS (Animate On Scroll)  

### Payment & Services
- Paystack API  
- EmailJS

### Deployment & Hosting:
- **Render** (Production hosting)
- Git (Version control)
- Environment-based configuration

### Development
- JavaScript (ES6+)  
- HTML5  
- Git & GitHub  

---

## 🚀 Installation

### **Prerequisites**
- Node.js (v14 or higher)  
- npm or yarn  
- Paystack account  
- EmailJS account  

---

### **Setup Steps**

#### 1. Clone the repository
- git clone https://github.com/SmaSema/sethuse-website.git
- cd sethuse-website

#### 2. Install dependencies
- npm install

#### 3. Set up environment variables
- cp .env.example .env

- Edit .env with your actual API keys.

#### 4. Start development server
- npm start

- The app will run at:
-  👉 http://localhost:3000

## 🔑 Environment Variables

Create a .env file in the root directory:

### Paystack Configuration
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
REACT_APP_PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here

### EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_DONATION_TEMPLATE_ID=your_donation_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

### Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

### Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
REACT_APP_CLOUDINARY_API_KEY=your_cloudinary_api_key

## 💳 Payment Integration

### **Paystack Setup**

#### 1. Create Paystack Account
- Visit [Paystack](https://paystack.com)
- Sign up for a merchant account
- Complete business verification

#### 2. Get API Keys
- Go to Settings → API Keys & Webhooks
- Copy Test/Live Public and Secret keys

#### 3. Test Cards
Successful Visa: 408 408 408 408 408 1 | 
CVV: 408 | Expiry: Any future date | PIN: 408

### EmailJS Setup

#### 1. Create EmailJS Account
- Visit [EmailJS](https://www.emailjs.com)
- Create account and verify email

#### 2. Set Up Email Service
- Add email service (Gmail, Outlook, etc.)
- Create donation confirmation template
- Get Service ID and Template ID

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" and follow the setup wizard
3. Enable the following services:

### 2. Enable Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create Database"
3. Choose "Start in test mode" for development
4. Set your database location

### 3. Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable Email/Password provider
3. Add authorized domains for your app

### 4. Get Firebase Config

1. Go to Project Settings → General
2. Scroll down to "Your apps"
3. Click "Web" icon to add your app
4. Copy the configuration object

### 5. Firebase Security Rules (Firestore)

#### Development Rules:
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Allow read/write for donations collection
        match /donations/{document} {
          allow read, write: if true;
        }
        
        // Allow read/write for subscribers collection  
        match /subscribers/{document} {
          allow read, write: if true;
        }
        
        // Admin authentication required for admin data
        match /admin/{document} {
          allow read, write: if request.auth != null;
        }
      }
    }

#### Production Rules:
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /donations/{document} {
          allow read, write: if request.auth != null;
        }
        match /subscribers/{document} {
          allow read, write: if request.auth != null;
        }
      }
    }

## ☁️ Cloudinary Setup

### 1. Create Cloudinary Account
1. Visit [Cloudinary](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Cloudinary Credentials
1. Go to Dashboard → Account Details
2. Copy your:
   - Cloud Name
   - API Key
   - API Secret (keep this secure)

### 3. Set Up Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Configure:
   - Name: sethuse_donations
   - Signing Mode: Unsigned (for client-side uploads)
   - Folder: sethuse-community
   - Allowed Formats: jpg, png, webp
   - Max File Size: 10MB
  
### 4. Cloudinary Configuration File

#### Create src/utils/cloudinaryConfig.js:
      // Cloudinary Configuration
      export const cloudinaryConfig = {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      };
      
      // Upload image to Cloudinary
      export const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('cloud_name', cloudinaryConfig.cloudName);
      
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
      
          const data = await response.json();
          
          if (data.secure_url) {
            return {
              success: true,
              url: data.secure_url,
              publicId: data.public_id,
            };
          } else {
            throw new Error(data.error?.message || 'Upload failed');
          }
        } catch (error) {
          console.error('Cloudinary upload error:', error);
          return {
            success: false,
            error: error.message,
          };
        }
      };
      
      // Generate optimized image URL
      export const getOptimizedImageUrl = (publicId, options = {}) => {
        const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;
        
        return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/c_fill,w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
      };

### 5. Firebase Configuration File

#### Create src/utils/firebaseConfig.js:

      import { initializeApp } from 'firebase/app';
      import { getFirestore } from 'firebase/firestore';
      import { getAuth } from 'firebase/auth';
      import { getStorage } from 'firebase/storage';
      
      // Firebase configuration
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      
      // Initialize Firebase services
      export const db = getFirestore(app);
      export const auth = getAuth(app);
      export const storage = getStorage(app);
      
      export default app;

### 6. Firebase Service Functions

#### Create src/utils/firebaseService.js:

      import { 
        collection, 
        addDoc, 
        updateDoc, 
        doc, 
        getDocs, 
        query, 
        where, 
        orderBy,
        onSnapshot 
      } from 'firebase/firestore';
      import { db } from './firebaseConfig';
      
      // Collections
      const DONATIONS_COLLECTION = 'donations';
      const SUBSCRIBERS_COLLECTION = 'subscribers';
      
      // Save donation record to Firestore
      export const saveDonationRecord = async (donationData) => {
        try {
          const docRef = await addDoc(collection(db, DONATIONS_COLLECTION), {
            ...donationData,
            createdAt: new Date(),
            status: 'completed',
          });
          
          console.log('✅ Donation record saved with ID:', docRef.id);
          return { success: true, id: docRef.id };
        } catch (error) {
          console.error('❌ Error saving donation record:', error);
          return { success: false, error: error.message };
        }
      };
      
      // Save subscriber record
      export const saveSubscriberRecord = async (subscriberData) => {
        try {
          const docRef = await addDoc(collection(db, SUBSCRIBERS_COLLECTION), {
            ...subscriberData,
            createdAt: new Date(),
            status: 'active',
            nextBillingDate: calculateNextBillingDate(),
          });
          
          console.log('✅ Subscriber record saved with ID:', docRef.id);
          return { success: true, id: docRef.id };
        } catch (error) {
          console.error('❌ Error saving subscriber record:', error);
          return { success: false, error: error.message };
        }
      };
      
      // Get all donations (for admin dashboard)
      export const getAllDonations = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(db, DONATIONS_COLLECTION), orderBy('createdAt', 'desc'))
          );
          
          const donations = [];
          querySnapshot.forEach((doc) => {
            donations.push({ id: doc.id, ...doc.data() });
          });
          
          return { success: true, data: donations };
        } catch (error) {
          console.error('❌ Error fetching donations:', error);
          return { success: false, error: error.message };
        }
      };
      
      // Get donation statistics
      export const getDonationStats = async () => {
        try {
          const donationsQuery = await getDocs(collection(db, DONATIONS_COLLECTION));
          const subscribersQuery = await getDocs(collection(db, SUBSCRIBERS_COLLECTION));
          
          const totalDonations = donationsQuery.size;
          const totalSubscribers = subscribersQuery.size;
          
          let totalAmount = 0;
          donationsQuery.forEach((doc) => {
            totalAmount += parseFloat(doc.data().amount) || 0;
          });
          
          return {
            success: true,
            data: {
              totalDonations,
              totalSubscribers,
              totalAmount: totalAmount.toFixed(2),
            },
          };
        } catch (error) {
          console.error('❌ Error fetching donation stats:', error);
          return { success: false, error: error.message };
        }
      };
      
      // Real-time donations listener
      export const subscribeToDonations = (callback) => {
        return onSnapshot(
          query(collection(db, DONATIONS_COLLECTION), orderBy('createdAt', 'desc')),
          (snapshot) => {
            const donations = [];
            snapshot.forEach((doc) => {
              donations.push({ id: doc.id, ...doc.data() });
            });
            callback(donations);
          },
          (error) => {
            console.error('❌ Real-time donations error:', error);
          }
        );
      };
      
      // Helper function to calculate next billing date
      const calculateNextBillingDate = () => {
        const nextDate = new Date();
        nextDate.setMonth(nextDate.getMonth() + 1);
        return nextDate;
      };

## 📁 Project Structure

      src/
      ├── components/
      │   ├── Donate_page/
      │   │   ├── DonateHero.js & .css
      │   │   ├── ImpactStories.js & .css
      │   │   ├── ChooseYourImpact.js & .css
      │   │   ├── DonationForm.js & .css
      │   │   └── PaymentInfo.js & .css
      │   ├── NavBar/
      │   ├── Footer/
      │   └── Loading/
      ├── pages/
      │   ├── Donate.js & .css
      │   ├── Home.js
      │   ├── AboutUs.js
      │   ├── OurWork.js
      │   └── ContactUs.js
      ├── utils/
      │   ├── paystackConfig.js
      │   ├── firebaseConfig.js
      │   ├── firebaseService.js
      │   └── cloudinaryConfig.js
      ├── assets/
      │   └── images/
      ├── App.js
      └── index.js

## 📜 Available Scripts

    # Start development server
    npm start
    
    # Build for production
    npm run build
    
    # Run tests
    npm test
    
    # Build and serve production
    npm run build && serve -s build

## 🌐 Deployment

### Render Deployment
This project is deployed on **Render** - a cloud platform that automatically builds and deploys from your Git repository.

#### Deployment Steps:
##### 1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

##### 2. **Configure Build Settings**
    Build Command: npm run build
    Publish Directory: build
    Node Version: 18.x or higher

##### 3. **Environment Variables**
- Add all environment variables in Render dashboard
- Go to your service → Environment → Add Environment Variables

##### 4. **Auto-Deployment**
- Render automatically deploys on git push to connected branch
- Builds are triggered automatically

#### Render-Specific Configuration:
- **Build Timeout**: 45 minutes (usually sufficient)
- **Auto-Deploy**: Enabled by default
- **Health Check**: `/` endpoint
- **Branch**: Usually `main` or `master`

### Important Render Notes:
- **Free Tier**: 750 hours/month, auto-sleeps after inactivity
- **Custom Domain**: Available in paid plans
- **SSL**: Automatically provided
- **Build Logs**: Available in Render dashboard

## 🆘 Support

### Common Issues

#### Payment Processing Issues:
- Verify Paystack API keys are correct
- Check that test cards are being used in development
- Ensure callback URLs are properly configured

#### Firebase Connection Issues:
- Verify Firebase configuration values
- Check Firestore security rules
- Ensure proper CORS configuration

#### Cloudinary Upload Issues:
- Verify upload preset is properly configured
- Check file size and format restrictions'
- Ensure CLOUDINARY_CLOUD_NAME is correct

#### Email Not Sending:
- Confirm EmailJS service is active
- Verify template variables match exactly
- Check browser console for error messages

#### Subscription Management:
- Subscribers appear in Paystack dashboard under "Subscriptions"
- Users receive management links via email
- Cancellations take effect at billing period end

### Getting Help
#### **- Email Support:** zungusinqobiley@gmail.com
#### **- Paystack Documentation:** [docs.paystack.com](https://docs.paystack.com)
#### **- Firebase Documentation:** [firebase.google.com/docs](https://firebase.google.com/docs)
#### **- Cloudinary Documentation:** [cloudinary.com/documentation](https://cloudinary.com/documentation)
#### **- React Documentation:** [reactjs.org](https://reactjs.org)

## 🙏 Acknowledgments
- Paystack for reliable payment processing
- Firebase for robust backend services
- Cloudinary for media management
- EmailJS for seamless email automation
- React community for excellent documentation
- All donors and supporters of Sethuse Community Haven

**Sethuse Community Haven -** We Make a Living by What We Get, But We Make a Life by What We Give. 💜



