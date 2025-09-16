# Fitness Class Booking App

A modern React Native application built with Expo and TypeScript for browsing and booking fitness classes. This project demonstrates clean architecture, intuitive UI/UX design, and predictable state management.

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

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-class-booking-app
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
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal/browser
   - Or use an emulator: press 'a' for Android, 'i' for iOS

### Alternative Run Commands
- **Web**: `npm run web`
- **Android**: `npm run android`
- **iOS**: `npm run ios` (macOS only)

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