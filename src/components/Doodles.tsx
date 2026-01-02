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
export const Cat = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
        <path d="M20 40 L10 10 L40 20 Q50 25 60 20 L90 10 L80 40 Q90 50 90 70 Q90 100 50 100 Q10 100 10 70 Q10 50 20 40 Z" />
        <circle cx="35" cy="55" r="5" fill="black" fillOpacity="0.2" />
        <circle cx="65" cy="55" r="5" fill="black" fillOpacity="0.2" />
        <path d="M45 65 Q50 70 55 65" stroke="black" strokeOpacity="0.2" strokeWidth="3" fill="none" />
    </svg>
);

export const Bunny = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
        <path d="M30 40 L20 0 L40 20 Q50 30 60 20 L80 0 L70 40 Q90 50 90 70 Q90 100 50 100 Q10 100 10 70 Q10 50 30 40 Z" />
        <circle cx="35" cy="60" r="5" fill="black" fillOpacity="0.2" />
        <circle cx="65" cy="60" r="5" fill="black" fillOpacity="0.2" />
    </svg>
);

export const Bear = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
        <circle cx="20" cy="20" r="15" />
        <circle cx="80" cy="20" r="15" />
        <circle cx="50" cy="60" r="40" />
        <circle cx="35" cy="55" r="5" fill="black" fillOpacity="0.2" />
        <circle cx="65" cy="55" r="5" fill="black" fillOpacity="0.2" />
        <ellipse cx="50" cy="65" rx="10" ry="8" fill="black" fillOpacity="0.1" />
    </svg>
);

export const OneFineDayLogo = ({ className, color = "currentColor" }: { className?: string, color?: string }) => (
    <svg viewBox="0 0 200 80" className={className} fill={color}>
        {/* Retro style typography 'One Fine Day' approximation */}
        <path d="M20,40 Q30,10 60,20 T90,30" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.2" />
        <text x="100" y="40" fontFamily='"Comic Sans MS", fantasy' fontWeight="900" fontSize="40" textAnchor="middle" style={{ transform: 'rotate(-5deg)' }}>
            One Fine
        </text>
        <text x="110" y="70" fontFamily='"Comic Sans MS", fantasy' fontWeight="900" fontSize="40" textAnchor="middle" style={{ transform: 'rotate(-5deg)' }}>
            Day
        </text>
    </svg>
);

export const Star = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
        <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35Z" />
    </svg>
);
