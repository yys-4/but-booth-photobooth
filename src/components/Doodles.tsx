import React from 'react';

export const Plant = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M50 80 L50 40 M50 80 L30 60 M50 80 L70 60 M50 40 Q30 20 20 40 M50 40 Q70 20 80 40" />
        <path d="M40 80 L60 80 L55 100 L45 100 Z" />
    </svg>
);

export const Sparkle = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
    </svg>
);

export const Squiggle = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className={className}>
        <path d="M5 10 Q25 -10 45 10 T85 10" />
    </svg>
);

export const Heart = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className={className}>
        <path d="M50 30 Q30 0 10 30 T50 80 Q90 60 90 30 T50 30" />
    </svg>
);

export const Coffee = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M30 40 L30 80 Q30 90 40 90 L60 90 Q70 90 70 80 L70 40 Z" />
        <path d="M70 50 Q85 50 85 60 Q85 70 70 70" />
        <path d="M35 30 Q40 10 45 30 M55 30 Q60 10 65 30" />
    </svg>
);
