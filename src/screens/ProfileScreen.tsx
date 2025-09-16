import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../types';
import { mockUser } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import Button from '../components/Button';

const STORAGE_KEY = '@user_profile';

export default function ProfileScreen() {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [modalVisible, setModalVisible] = useState(false);

  // Load user data from storage on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setTempName(JSON.parse(storedUser).name);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async (updatedUser: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleEditPress = () => {
    setTempName(user.name);
    setModalVisible(true);
  };

  const handleSaveName = async () => {
    if (tempName.trim() === '') {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    const updatedUser = { ...user, name: tempName.trim() };
    setUser(updatedUser);
    await saveUserData(updatedUser);
    setModalVisible(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempName(user.name);
    setModalVisible(false);
    setIsEditing(false);
  };

  const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const EditableNameCard = () => (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name="person" size={20} color={colors.primary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>Name</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.infoValue}>{user.name}</Text>
          <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
            <Ionicons name="pencil" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.background, '#FFF0E6', '#FFE8D6']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="person" size={48} color={colors.surface} />
            </LinearGradient>
          </View>
          <Text style={styles.welcomeText}>🙏 Namaste, {user.name}!</Text>
          <Text style={styles.welcomeSubtext}>Your wellness journey continues</Text>
        </View>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <EditableNameCard />
        
        <InfoCard
          icon="call"
          label="Mobile Number"
          value={user.mobile}
        />
        
        <InfoCard
          icon="card"
          label="Membership Credits"
          value={`Credits: ${user.credits}`}
        />
        
        <InfoCard
          icon="location"
          label="City"
          value={user.city}
        />
        
        <InfoCard
          icon="calendar"
          label="Member Since"
          value={user.joinedDate}
        />
      </View>

      {/* Edit Name Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            
            <TextInput
              style={styles.nameInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter your name"
              maxLength={50}
              autoFocus
              selectTextOnFocus
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={handleCancelEdit}
                style={styles.modalButton}
              />
              <Button
                title="Save"
                onPress={handleSaveName}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    ...shadows.lg,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '700',
  },
  welcomeSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    ...shadows.sm,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...shadows.lg,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  nameInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});