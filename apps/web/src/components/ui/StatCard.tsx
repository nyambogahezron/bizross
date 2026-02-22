'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
  index?: number;
}

const colorMap = {
  indigo: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-500',
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-500',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-500',
  rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/20 text-rose-500',
};

export function StatCard({ title, value, change, positive, icon, color, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      className="card p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn(
          'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center',
          colorMap[color]
        )}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && (
          <p className={cn(
            'text-xs font-medium mt-1',
            positive ? 'text-emerald-500' : 'text-rose-500'
          )}>
            {positive ? '↑' : '↓'} {change} vs yesterday
          </p>
        )}
      </div>
    </motion.div>
  );
}
