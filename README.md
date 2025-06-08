
# 🔒 Secure Video Player

A mobile app built with **React Native** and **Expo Router** that securely plays video content and detects screenshots on Android.

## 🚀 Setup Instructions

### 📦 Prerequisites
- Node.js (v18+)
- npm
- Expo CLI: `npm install -g expo-cli`
- Android Studio / Xcode

### 🛠 Installation
```bash
git clone https://github.com/yourusername/secure-video-player.git
cd secure-video-player
npm install
```

### ▶️ Run the App
```bash
npx expo start
```

Use Expo Go app on your device to scan the QR code, or run:
```bash
npx expo run:android
npx expo run:ios
```

## ✨ Features Implemented

| Feature | Description |
|--------|-------------|
| 📼 Video Playback | Play MP4 videos with custom UI |
| 💧 Dynamic Watermark | User name + timestamp, semi-transparent |
| 📸 Screenshot Detection | Alerts/logs screenshot attempts (Android only) |
| ⚙️ Settings Screen | Configure watermark/security options |
| 🛡️ Security Status | Shows screenshot attempt count |

## 🧪 How to Test Screenshot Detection

### ✅ Android
1. Open Player screen
2. Take a screenshot (Power + Volume Down)
3. App logs it and shows an alert

### ❌ iOS
Screenshot detection not supported due to Apple restrictions.

## 📂 Folder Structure

```
secure-video-player/
├── app/
│   ├── index.js              # Home screen
│   ├── player.js             # Video player screen
│   ├── settings.js           # Settings screen
│   └── security-status.js    # Screenshot log screen
├── assets/
├── App.js
└── README.md
```

## ⚠️ Known Limitations
- ❌ No true screen recording prevention (Expo limitation)
- ❌ Screenshot detection only works on Android
- 🔓 Videos not encrypted
- Requires ejecting from Expo for full protection

## 🛠 Future Improvements
- Eject to use FLAG_SECURE
- Add biometrics/PIN lock
- Encrypt downloaded video files
- Add secure video streaming
- Implement iOS recording detection natively

## 👨‍💻 Author
**Mayan Bhandari**  
BTech CSE | Internship Project (NIC + MCD)
