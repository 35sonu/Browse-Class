export type ClassLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Class {
  id: string;
  name: string;
  level: ClassLevel;
  instructor: string;
  center: string;
  isBooked?: boolean;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  credits: number;
  city: string;
  joinedDate: string;
  avatar?: string;
}

export interface FilterState {
  selectedLevels: ClassLevel[];
  selectedInstructor: string | null;
}

export interface BookingResult {
  success: boolean;
  classId: string;
  error?: string;
}