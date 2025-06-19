// File: data/leaderboardData.ts
import { LeaderUser, CurrentUser } from '../types/leaderboard';

export const radhaWeeklyLeaders: LeaderUser[] = [
  { id: 1, name: 'Priya Devotee', weeklyCount: 1240, totalCount: 15420, avatar: '🌸', streak: 7 },
  { id: 2, name: 'Arjun Bhakt', weeklyCount: 1180, totalCount: 14230, avatar: '🕉️', streak: 6 },
  { id: 3, name: 'Sita Mata', weeklyCount: 1120, totalCount: 13890, avatar: '🦚', streak: 7 },
  { id: 4, name: 'Krishna Das', weeklyCount: 980, totalCount: 12750, avatar: '🙏', streak: 5 },
  { id: 5, name: 'Radha Rani', weeklyCount: 940, totalCount: 11980, avatar: '🌺', streak: 4 },
  { id: 6, name: 'Gopal Swami', weeklyCount: 890, totalCount: 10850, avatar: '🪈', streak: 7 },
  { id: 7, name: 'Meera Devi', weeklyCount: 820, totalCount: 9840, avatar: '💫', streak: 3 },
  { id: 8, name: 'Hanuman Das', weeklyCount: 780, totalCount: 8920, avatar: '🚩', streak: 6 },
  { id: 9, name: 'Ganga Devi', weeklyCount: 720, totalCount: 8450, avatar: '🌊', streak: 2 },
  { id: 10, name: 'Tulsi Mata', weeklyCount: 680, totalCount: 7890, avatar: '🌿', streak: 5 },
];

export const krishnayaWeeklyLeaders: LeaderUser[] = [
  { id: 1, name: 'Krishna Das', weeklyCount: 1350, totalCount: 18950, avatar: '🪈', streak: 7 },
  { id: 2, name: 'Gopal Swami', weeklyCount: 1290, totalCount: 16780, avatar: '🙏', streak: 7 },
  { id: 3, name: 'Arjun Bhakt', weeklyCount: 1220, totalCount: 15420, avatar: '🕉️', streak: 6 },
  { id: 4, name: 'Priya Devotee', weeklyCount: 1150, totalCount: 14650, avatar: '🌸', streak: 5 },
  { id: 5, name: 'Radha Rani', weeklyCount: 1080, totalCount: 13290, avatar: '🌺', streak: 4 },
  { id: 6, name: 'Sita Mata', weeklyCount: 1020, totalCount: 12180, avatar: '🦚', streak: 7 },
  { id: 7, name: 'Meera Devi', weeklyCount: 950, totalCount: 11560, avatar: '💫', streak: 3 },
  { id: 8, name: 'Hanuman Das', weeklyCount: 890, totalCount: 10890, avatar: '🚩', streak: 6 },
  { id: 9, name: 'Ganga Devi', weeklyCount: 830, totalCount: 9670, avatar: '🌊', streak: 4 },
  { id: 10, name: 'Tulsi Mata', weeklyCount: 780, totalCount: 8920, avatar: '🌿', streak: 2 },
];

export const currentUser: CurrentUser = {
  name: 'Radha Devotee',
  rank: 5247,
  weeklyCount: 45,
  totalCount: 3247,
  avatar: '🙏',
  streak: 2,
};