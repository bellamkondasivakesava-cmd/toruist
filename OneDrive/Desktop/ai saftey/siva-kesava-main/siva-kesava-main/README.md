# SafeTravel AI 🛡️

SafeTravel AI is a next-generation smart travel safety companion designed to protect travelers worldwide. It combines advanced AI reasoning with real-time local safety data to provide instant advice, emergency assistance, and live safety mapping.

## 🚀 Key Features

### 1. **Real-Time Safety Map**
- **Live Location Tracking**: Uses high-accuracy GPS to track your position in real-time.
- **Emergency Services Locator**: Fetches real nearby hospitals and police stations using the **Overpass API**.
- **One-Tap Navigation**: Instant directions to any emergency facility via Google Maps integration.

### 2. **AI Safety Assistant**
- **Intelligent Chat**: Get instant, context-aware safety advice for any location or situation.
- **Chat History**: Conversations are securely saved to the cloud, allowing you to resume them on any device.

### 3. **Global Emergency SOS**
- **Floating SOS Button**: Accessible from any screen for immediate help.
- **One-Tap Emergency Call**: Quickly dial local emergency services (112) with a secure confirmation step.

### 4. **Personalized Dashboard**
- **Safety Statistics**: Track your safety checks and saved contacts.
- **Quick Actions**: Rapid access to all critical safety tools from a single hub.
- **Profile Management**: Manage your traveler profile and verification status.

### 5. **Emergency Contacts**
- **Cloud Sync**: Store your emergency contacts securely in Firestore.
- **Instant Access**: Quick-dial or message your trusted contacts during an emergency.

### 6. **Secure Authentication**
- **Flexible Sign-In**: Support for both Google Account and Email/Password authentication.
- **Data Privacy**: Each user's safety data is isolated and protected via Firebase Security Rules.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Mapping**: Leaflet, React-Leaflet, Overpass API
- **Backend/Database**: Firebase (Authentication & Firestore)
- **AI Engine**: Google Gemini API

## ⚙️ Setup Instructions

### 1. Firebase Configuration
To enable all features, you must configure Firebase:
1.  **Authentication**: Enable "Google" and "Email/Password" providers in the Firebase Console.
2.  **Firestore**: Create a Firestore database in "Production" or "Test" mode.
3.  **Security Rules**: Deploy the provided `firestore.rules` to protect user data.

### 2. Environment Variables
Ensure the following are set in your environment:
- `GEMINI_API_KEY`: Your Google Gemini API key.

## 📖 How to Use
1.  **Sign Up**: Create an account to enable cloud syncing of your data.
2.  **Check the Map**: Visit the "Safety Map" to see emergency services near you.
3.  **Chat with AI**: Ask the safety assistant about local scams, safe neighborhoods, or travel requirements.
4.  **Set Contacts**: Add your trusted emergency contacts in the "Emergency" tab.
5.  **Stay Safe**: Use the floating SOS button if you ever feel in immediate danger.

---
*Built with ❤️ for safer journeys everywhere.*
