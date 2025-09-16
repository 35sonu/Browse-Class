# 🧘‍♀️ Fitness Class Booking App

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Indian_Theme-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="Indian Theme" />
</div>

<p align="center">
  <strong>A modern React Native application built with Expo and TypeScript for browsing and booking fitness classes.</strong>
  <br>
  Features beautiful Indian-themed design with smooth animations and intuitive user experience.
</p>

<div align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a>
</div>

---

## Features

### 🏠 Home Screen (Browse Classes)
- **Class Listings**: Display comprehensive class information including name, level, instructor, and center
- **Smart Filters**: 
  - Level filter chips (Beginner/Intermediate/Advanced) with color-coded design
  - Instructor dropdown with searchable modal interface
- **Quick Booking**: 
  - One-tap booking with optimistic UI updates
  - 15% simulated failure rate with automatic rollback
  - Toast notifications for success/error states
- **Loading & Empty States**: 
  - Animated loading spinner on app start
  - Helpful empty state with "Clear Filters" functionality

### 👤 Profile Screen
- **User Information Display**: Avatar, name, mobile, credits, city, and join date
- **Editable Name**: Inline editing with modal interface and local storage persistence
- **Modern Card Design**: Clean information cards with icons and proper hierarchy

## Technical Architecture

### 🛠️ Technology Stack
- **Framework**: Expo (React Native + TypeScript)
- **Navigation**: React Navigation v6 with bottom tabs
- **State Management**: React hooks (useState, useEffect)
- **Storage**: AsyncStorage for profile data persistence
- **UI Components**: Custom component library with consistent theming
- **Notifications**: React Native Toast Message

### 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Customizable button with variants and states
│   ├── ClassCard.tsx   # Class information display with booking
│   └── LevelChip.tsx   # Filter chip component
├── data/               # Mock data and constants
│   └── mockData.ts     # Classes and user data
├── screens/            # Screen components
│   ├── HomeScreen.tsx  # Class browsing and filtering
│   └── ProfileScreen.tsx # User profile with editing
├── theme/              # Design system
│   └── index.ts        # Colors, typography, spacing, shadows
├── types/              # TypeScript definitions
│   └── index.ts        # Interfaces for Class, User, etc.
└── hooks/              # Custom hooks (reserved for future use)
```

### 🎨 Design System
- **Colors**: Modern color palette with semantic naming
- **Typography**: Hierarchical text styles (h1, h2, h3, body, caption)
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent corner radius values

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later) 
- npm or yarn
- Expo Go app on your mobile device (or simulator)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/35sonu/Browse-Class.git
   cd Browse-Class
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - 📱 **Mobile**: Install [Expo Go](https://expo.dev/client) and scan the QR code
   - 💻 **Web**: Press `w` or visit `http://localhost:8081`
   - 🤖 **Android**: Press `a` (requires Android Studio/emulator)
   - 🍏 **iOS**: Press `i` (requires Xcode - macOS only)

### Quick Commands
```bash
# Start development server
npm start

# Run on web browser
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Key Design Decisions

### 🎯 User Experience
- **Optimistic Updates**: Booking appears instantly, then rollback on failure for better perceived performance
- **Progressive Disclosure**: Filters are easily accessible but don't overwhelm the interface
- **Consistent Feedback**: Toast messages provide clear success/error communication
- **Touch-Friendly**: All interactive elements meet minimum touch target sizes

### 🏗️ Architecture Choices
- **Component Composition**: Reusable components with prop-based customization
- **TypeScript**: Strong typing for better developer experience and fewer runtime errors
- **Local State**: Simple useState/useEffect pattern appropriate for app scope
- **File Organization**: Feature-based structure for scalability

### 🎨 UI/UX Decisions
- **Modern Material Design**: Elevated cards with consistent shadows and spacing
- **Color Psychology**: Different colors for class levels (green=easy, amber=medium, red=hard)
- **Visual Hierarchy**: Clear information hierarchy with appropriate font weights and sizes
- **Responsive Layout**: Flexible layouts that work on various screen sizes

### 🔄 State Management
- **Optimistic Updates**: UI updates immediately, then handles server response
- **Filter State**: Centralized filter state with derived computed values
- **Local Persistence**: User profile changes saved to AsyncStorage
- **Error Boundaries**: Graceful error handling with user-friendly messages

## Demo Flow

### Filter Demonstration
1. Open the app and wait for loading to complete
2. Try level filter chips - notice color-coded selections
3. Use instructor dropdown - see modal interface
4. Apply multiple filters simultaneously
5. Clear all filters using empty state button

### Booking Flow
1. Find an available class
2. Tap "Quick Book" - notice immediate UI update
3. Wait for simulation to complete
4. Observe success toast or rollback behavior on failure

### Profile Editing
1. Navigate to Profile screen
2. Tap edit icon next to name
3. Modify name in modal
4. Save changes - persistence confirmed on app restart

## Performance Considerations

- **Lazy Loading**: Components render efficiently with proper key props
- **Optimized Filtering**: Efficient array operations with early returns
- **Memory Management**: Proper cleanup of timers and effects
- **Bundle Size**: Minimal dependencies, tree-shaking friendly imports

## Future Enhancements

- **Search**: Text-based class search functionality
- **Favorites**: Save favorite classes and instructors
- **Calendar**: Schedule view with time slots
- **Push Notifications**: Booking confirmations and reminders
- **Offline Support**: Cached data for offline browsing
- **Authentication**: User login and personalization

## Testing Notes

The app includes comprehensive error simulation and state management testing:
- **Booking Failures**: 15% random failure rate for realistic testing
- **Network Simulation**: Loading states and error handling
- **Data Persistence**: Profile changes survive app restarts
- **Filter Edge Cases**: Empty states and filter combinations

---

**Development Time**: ~4-5 hours  
**Focus Areas**: Clean architecture (40%), Intuitive UI/UX (30%), Product thinking (20%), Documentation (10%)