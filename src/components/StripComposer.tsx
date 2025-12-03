'use client';

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface StripComposerProps {
    photos: string[];
    theme?: 'green' | 'blue' | 'purple';
}

const StripComposer = forwardRef<HTMLDivElement, StripComposerProps>(
    ({ photos, theme = 'green' }, ref) => {

        const themeColors = {
            green: {
                bg: 'bg-green-200',
                checkers: 'bg-green-600',
                accent: 'text-green-800',
                border: 'border-green-700',
            },
            blue: {
                bg: 'bg-blue-200',
                checkers: 'bg-blue-600',
                accent: 'text-blue-800',
                border: 'border-blue-700',
            },
            purple: {
                bg: 'bg-purple-200',
                checkers: 'bg-purple-600',
                accent: 'text-purple-800',
                border: 'border-purple-700',
            },
        };

        const currentTheme = themeColors[theme];

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative w-[300px] p-4 flex flex-col gap-4 items-center overflow-hidden shadow-2xl",
                    currentTheme.bg
                )}
                style={{
                    // CSS Pattern for checkers
                    backgroundImage: `
                linear-gradient(45deg, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 25%, transparent 25%), 
                linear-gradient(-45deg, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 75%), 
                linear-gradient(-45deg, transparent 75%, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 75%)
            `,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
                }}
            >
                {/* Title */}
                <div className="z-10 transform -rotate-2 mb-2">
                    <h2 className={clsx("font-black text-2xl tracking-tighter uppercase drop-shadow-sm", currentTheme.accent)}
                        style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                    >
                        ButBooth
                    </h2>
                </div>

                {/* Photos */}
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="relative z-10 bg-white p-2 shadow-md transform transition-transform hover:scale-105"
                        style={{
                            // Randomize rotation slightly for hand-placed look
                            transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                            // Hand-drawn border radius effect
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            border: '3px solid #333'
                        }}
                    >
                        <img
                            src={photo}
                            alt={`Capture ${index + 1}`}
                            className="w-[240px] h-[160px] object-cover"
                            style={{
                                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            }}
                        />

                        {/* Decorative scribbles */}
                        <svg className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 z-20" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35Z" />
                        </svg>
                    </div>
                ))}

                {/* Footer */}
                <div className="mt-4 z-10 text-center">
                    <p className={clsx("font-bold text-sm", currentTheme.accent)} style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                        {new Date().toLocaleDateString()} • MEMORIES
                    </p>
                    <p className="text-xs text-stone-500 font-mono mt-1">
                        #photobooth
                    </p>
                </div>

                {/* Overlay Texture/Noise (Optional for retro feel) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-noise"></div>
            </div>
        );
    }
);

StripComposer.displayName = 'StripComposer';

export default StripComposer;
