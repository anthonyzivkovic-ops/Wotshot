import React from 'react';
import { Layers, Globe2, Scale, Briefcase, Cpu, Clapperboard, Trophy, HeartPulse } from 'lucide-react';

export const CATEGORY_LOGOS = {
  "All":           <Layers className="w-4 h-4" />,
  "World":         <Globe2 className="w-4 h-4 text-sky-400" />,
  "Politics":      <Scale className="w-4 h-4 text-purple-400" />,
  "Business":      <Briefcase className="w-4 h-4 text-emerald-400" />,
  "Technology":    <Cpu className="w-4 h-4 text-amber-400" />,
  "Entertainment": <Clapperboard className="w-4 h-4 text-pink-400" />,
  "Sports":        <Trophy className="w-4 h-4 text-yellow-400" />,
  "Health":        <HeartPulse className="w-4 h-4 text-red-400" />
};
