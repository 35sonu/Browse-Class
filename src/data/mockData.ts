import { Class, User } from '../types';

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Hatha Yoga for Beginners',
    level: 'Beginner',
    instructor: 'Priya Sharma',
    center: 'Ananda Yoga Studio',
  },
  {
    id: '2',
    name: 'Kalari Payattu Training',
    level: 'Advanced',
    instructor: 'Arjun Nair',
    center: 'Kerala Martial Arts Center',
  },
  {
    id: '3',
    name: 'Bollywood Dance Fitness',
    level: 'Intermediate',
    instructor: 'Neha Kapoor',
    center: 'Mumbai Dance Academy',
  },
  {
    id: '4',
    name: 'Pranayama & Breathing',
    level: 'Beginner',
    instructor: 'Guru Ramesh',
    center: 'Rishikesh Wellness Center',
  },
  {
    id: '5',
    name: 'Ashtanga Vinyasa Flow',
    level: 'Advanced',
    instructor: 'Kavitha Menon',
    center: 'Mysore Yoga Institute',
  },
  {
    id: '6',
    name: 'Traditional Bharatanatyam',
    level: 'Intermediate',
    instructor: 'Lakshmi Devi',
    center: 'Chennai Classical Arts',
  },
  {
    id: '7',
    name: 'Surya Namaskara Flow',
    level: 'Beginner',
    instructor: 'Vikram Singh',
    center: 'Delhi Yoga Center',
  },
  {
    id: '8',
    name: 'Power Yoga & Strength',
    level: 'Advanced',
    instructor: 'Ravi Kumar',
    center: 'Bangalore Fitness Hub',
  },
  {
    id: '9',
    name: 'Bhangra Cardio Workout',
    level: 'Intermediate',
    instructor: 'Simran Kaur',
    center: 'Punjab Cultural Center',
  },
  {
    id: '10',
    name: 'Ayurvedic Stretching',
    level: 'Beginner',
    instructor: 'Dr. Anjali Rao',
    center: 'Kochi Wellness Studio',
  },
  {
    id: '11',
    name: 'Kuchipudi Dance Therapy',
    level: 'Intermediate',
    instructor: 'Meera Reddy',
    center: 'Hyderabad Arts Academy',
  },
  {
    id: '12',
    name: 'Kundalini Awakening',
    level: 'Advanced',
    instructor: 'Swami Ananda',
    center: 'Haridwar Spiritual Center',
  },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Rohan Kumar',
  mobile: '+91 98765 43210',
  credits: 12,
  city: 'Mumbai, Maharashtra',
  joinedDate: 'March 2024',
};

export const instructors = Array.from(new Set(mockClasses.map(c => c.instructor))).sort();