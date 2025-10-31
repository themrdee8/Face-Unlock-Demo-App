# Face Unlock Demo App (Expo/React Native)

- A simple face recognition unlock demo built with Expo and React Native
  This projects simualates local face verification by capturing an image
  from the device camera and comparing it against a stored reference photo
  without using any external backend or cloud services.

## Features

- **Face capture**: Uses the device's front and back camera to take a photo
- **Camera Switch**: Toggle between front and back cameras easily.
- **Face Registration**: Register and store a user’s reference face locally.
- **Face Verification**: Register (store) a user’s reference face locally.
- **App Navigation**: Capture a new image and verify against the stored one.
- **Local Backend Simulation**: Built using Expo Router with tabs for Home, Settings, and Face Unlock.

## How It Works

### Registration Phase

- User presses "Register Face"
- App captures a photo and encodes it in Base64
- The image is stored locally as the “reference” face

### Verification Phase

- User presses "Face Unlock"
- App captures a new image and compares it to the stored one
- If similarity (mock logic) passes → unlocks and navigates to Home screen

_This project however does not perform real facial recognition. It only mimics the flow using Base64 string comparison for educational purposes._

## Navigation Flow

1. Startup: Opens directly to the Face Unlock screen.
2. Successful Unlock: Automatically redirects to the Home screen.
3. Settings: Contains a logout option (returns user to Face Unlock).

## UI/UX Highlights

- Minimal and clean interface using React Native’s StyleSheet
- Buttons styled for clarity and simplicity
- Camera preview fills most of the screen
- Floating flip camera button with a modern icon

## Future Improvements

- Integrate real face recognition (e.g., with face-api.js or TensorFlow Lite)
- Add encrypted local storage
- Improve matching algorithm accuracy
- Add animations for success/failure feedback
