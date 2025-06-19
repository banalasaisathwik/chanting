// File: data/chantModeData.ts
import { Mantra, Mode } from '../types/chantMode';

export const mantras: Mantra[] = [
  { 
    id: 'radha', 
    name: 'Radha Radha', 
    description: 'Divine love and devotion chant',
    sanskrit: 'राधा राधा',
    color: ['#FF6B9D', '#E91E63']
  },
  { 
    id: 'krishna', 
    name: 'Krishnaya Vasudevaya', 
    description: 'Lord Krishna protection mantra',
    sanskrit: 'कृष्णाय वासुदेवाय',
    color: ['#4FC3F7', '#29B6F6']
  },
];

export const modes: Mode[] = [
  { 
    id: 'guided', 
    title: 'Guided Chanting', 
    subtitle: 'With beautiful audio guidance', 
    icon: '🎧',
    description: 'Perfect for beginners and meditation',
    gradient: ['rgba(76, 175, 80, 0.15)', 'rgba(56, 142, 60, 0.1)']
  },
  { 
    id: 'own', 
    title: 'Self Practice', 
    subtitle: 'Your own rhythm and pace', 
    icon: '🧘',
    description: 'Tap, swipe, or use volume controls',
    gradient: ['rgba(156, 39, 176, 0.15)', 'rgba(103, 58, 183, 0.1)']
  },
];