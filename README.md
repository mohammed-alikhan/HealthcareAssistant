# 🏥 Healthcare Assistant Application

Welcome to the Healthcare Assistant repository! 🎉 This project leverages the power of AI to assist users with health, nutrition, and diet-related queries through an interactive chat interface. Designed for users seeking reliable and instant health advice, this application combines modern web technologies to deliver a seamless and secure user experience.

## 🌟 Features

- **Interactive Chat Interface:** Users can chat with an AI assistant to get health-related advice.
- **AI-Powered Responses:** Utilizes OpenAI's GPT-4 Turbo to generate intelligent and contextually relevant responses.
- **Real-Time Database:** Firebase integration ensures real-time storage and retrieval of chat messages.
- **Secure User Authentication:** Firebase Authentication is used to manage user sign-ins securely.
- **Responsive Design:** The application is optimized for both desktop and mobile devices.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Python installed
- Firebase account and project setup
- OpenAI API key

### Installation

1. **Clone the repository**:
    ```bash
    git clone [https://github.com/mohammed-alikhan/HealthcareAssistant.git](https://github.com/mohammed-alikhan/HealthcareAssistant.git)
    cd HealthcareAssistant
    ```

2. **Install frontend dependencies**:
    ```bash
    cd ../healthcareassistant
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    pip install
    ```
4. **Setup and Configure your Firebase SDK**:
    - Create a `firebaseConfig.js` file in the src directory:
        ```bash
        touch firebaseConfig.js
        ```
    - Initialize Firebase in your app and create a Firebase App object:
        ```
        import { initializeApp } from 'firebase/app';

        const firebaseConfig = {
          // Your Firebase configuration object
          apiKey: "your-api-key",
          authDomain: "your-auth-domain",
          projectId: "your-project-id",
          storageBucket: "your-storage-bucket",
          messagingSenderId: "your-messaging-sender-id",
          appId: "your-app-id",
          measurementId: "your-measurement-id"
        };
        
        const app = initializeApp(firebaseConfig);
        ```
6. **Set up your OpenAI API key**:
    - Create a `.env` file in the backend directory:
        ```bash
        touch .env
        ```
    - Add your OpenAI API key to the `.env` file:
        ```
        OPENAI_API_KEY=your_openai_api_key
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        SECRET_KEY=your_custom_secret_key
        FIREBASE_ADMINSDK_JSON=your_firebase_jsonfile_location
        ```

### Running the Application

1. **Start the backend server**:
    ```bash
    python app.py
    ```

2. **Start the frontend development server**:
    ```bash
    cd ../healthcareassistant
    npm start
    ```

3. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## 📚 Usage

1. **Log in to the platform:** Use your email and password or Google account to log in.
2. **Create a new chat:** Create a new ChatRoom.
3. **Enter a query:** Type your health-related question in the input box.
4. **Submit your query:** Click the "Send" button to receive an instant response from the AI assistant.
5. **View the response:** The AI assistant will provide relevant and concise health advice based on your query.
6. **Log out of the platform:** Click on your profile and click on logout button to log out.

## 🛠️ Technology Stack

- **Frontend:** React, Axios
- **Backend:** Flask, Python
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **AI Model:** OpenAI GPT-4 Turbo

## 📈 Future Enhancements

- **Voice Output:** Integrating text-to-speech functionality for auditory learners.
- **File Uploads:** Allowing users to upload health reports for more personalized advice.
- **Multilingual Support:** Extending support for multiple languages to reach a broader audience.

## 👥 Contributing

Contributions are welcome to make the Healthcare Assistant even better!

1. **Fork the repository:** Create a personal fork of the project on GitHub.
2. **Create a new branch:** For each new feature or improvement, create a separate branch.
3. **Submit a pull request:** After making your changes, submit a pull request for review.
---
Got questions or need a hand? Hit me up! 🤓 Let's level up your learning! 🚀
