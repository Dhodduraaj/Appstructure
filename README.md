# Appstructure

A modern cross-platform Flutter application with Firebase integration for user authentication and profile management.

## 🎯 Overview

Appstructure is a structured Flutter application template that demonstrates best practices for building multi-platform mobile applications with real-time backend integration. The app provides a complete authentication flow, user profile management, and cloud data synchronization using Firebase services.

## ✨ Features

- **User Authentication**
  - Email/password login and registration
  - Secure authentication with Firebase Auth
  - Persistent session management
  - User state change listeners

- **User Profile Management**
  - Create and edit user profiles
  - Store profile information including name, date of birth, and work category
  - User ratings and suggestions
  - Real-time data synchronization with Cloud Firestore

- **Theme Management**
  - Light and dark mode support
  - Theme toggle available from authentication and home pages
  - Persistent theme state across navigation

- **Cross-Platform Support**
  - Android
  - iOS
  - Web
  - Windows
  - Linux
  - macOS

## 🛠️ Tech Stack

### Frontend
- **Flutter** - Modern cross-platform UI framework
- **Dart** - Programming language
- **Material Design** - UI components and design system

### Backend & Services
- **Firebase Core** (^3.4.0) - Firebase initialization
- **Firebase Authentication** (^5.3.1) - User authentication
- **Cloud Firestore** (^5.4.2) - Real-time database
- **Internationalization (intl)** (^0.19.0) - Multi-language support

### Development
- **CMake** - Build system configuration
- **C++/C** - Native code integration for platform-specific features

## 📁 Project Structure

```
appstructure/
├── lib/
│   ├── main.dart              # Application entry point
│   ├── auth_page.dart         # Login and registration page
│   ├── home_page.dart         # Main user interface after login
│   ├── firebase_options.dart  # Firebase configuration
│   └── ...
├── android/                   # Android platform-specific code
├── ios/                       # iOS platform-specific code
├── web/                       # Web platform-specific code
├── windows/                   # Windows platform-specific code
├── linux/                     # Linux platform-specific code
├── macos/                     # macOS platform-specific code
├── test/                      # Unit and widget tests
├── pubspec.yaml               # Flutter dependencies
├── firebase.json              # Firebase configuration
└── analysis_options.yaml      # Dart linter configuration
```

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (^3.9.2)
- Dart SDK (included with Flutter)
- A Firebase project
- Android Studio / Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhodduraaj/Appstructure.git
   cd Appstructure
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add Android, iOS, and Web apps to your project
   - Download configuration files and place them in the appropriate directories
   - Update `firebase.json` with your project credentials

4. **Run the application**
   ```bash
   # For Android
   flutter run -d android

   # For iOS
   flutter run -d ios

   # For Web
   flutter run -d web

   # For Windows
   flutter run -d windows

   # For Linux
   flutter run -d linux

   # For macOS
   flutter run -d macos
   ```

## 📱 Application Flow

### Authentication Flow
1. User launches the app and sees the **AuthPage**
2. User can either:
   - **Login** with existing credentials
   - **Sign Up** to create a new account
3. Authentication is handled by Firebase Auth
4. Upon successful authentication, user is redirected to **HomePage**

### Home Page Flow
1. Upon first login, user sees a form to create their profile
2. User can fill in:
   - Name
   - Date of Birth
   - Work category (from dropdown)
   - Rating (1-5 stars)
   - Personal suggestions/ideas
3. Profile data is saved to Cloud Firestore
4. User can view their saved profile and edit it anytime
5. User can logout using the logout button in the AppBar

## 🔐 Security Features

- **Firebase Authentication**: Secure user authentication with email/password
- **Cloud Firestore**: Database-level security rules (should be configured)
- **Session Management**: Automatic session persistence and management
- **Error Handling**: User-friendly error messages for authentication failures

## 📊 Data Structure (Firestore)

User profiles are stored in the `users` collection with the following schema:

```json
{
  "uid": "user_id",
  "name": "User Name",
  "dob": "YYYY-MM-DD",
  "work": "Work Category",
  "rating": 5,
  "idea": "User suggestions or ideas"
}
```

## 🎨 UI/UX Features

- Clean and intuitive Material Design interface
- Theme switching (light/dark mode)
- Responsive layout adapts to different screen sizes
- Card-based profile display
- Form validation and error feedback
- Single-child scroll view for scrollable content

## 🧪 Testing

```bash
# Run tests
flutter test

# Run tests with coverage
flutter test --coverage
```

## 📦 Building for Production

### Android
```bash
flutter build apk --release
# or
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

### Web
```bash
flutter build web --release
```

### Windows/Linux/macOS
```bash
flutter build windows --release
flutter build linux --release
flutter build macos --release
```

## 🔧 Configuration

### Firebase Configuration
Update your Firebase credentials in:
- `android/app/google-services.json`
- `ios/Runner/GoogleService-Info.plist`
- `lib/firebase_options.dart`

### Linter Rules
Modify code analysis rules in `analysis_options.yaml` to enforce code quality standards.

## 📝 Dependencies

- **flutter_lints** (^5.0.0) - Recommended lint rules
- **cupertino_icons** (^1.0.8) - iOS-style icons

See `pubspec.yaml` for complete dependency list.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Dhodduraaj**

## 📞 Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/Dhodduraaj/Appstructure/issues).

## 🌟 Acknowledgments

- Flutter team for the excellent framework
- Firebase for backend services
- Material Design for UI guidelines

---

**Last Updated**: November 2025

**Version**: 1.0.0