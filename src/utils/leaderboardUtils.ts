// File: utils/leaderboardUtils.ts

export const getPodiumHeight = (rank: number): number => {
  switch (rank) {
    case 1: return 80;
    case 2: return 60;
    case 3: return 40;
    default: return 0;
  }
};

export const getPodiumColor = (rank: number): [string, string] => {
  switch (rank) {
    case 1: return ['#FFD700', '#FFA000'];
    case 2: return ['#C0C0C0', '#A0A0A0'];
    case 3: return ['#CD7F32', '#A0522D'];
    default: return ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
  }
};

export const getTabDisplayName = (tab: 'radha' | 'krishnaya'): string => {
  return tab === 'radha' ? '🌸 Radha Mantra' : '🪈 Krishnaya Mantra';
};