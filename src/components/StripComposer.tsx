'use client';

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface StripComposerProps {
    photos: string[];
    theme?: 'green' | 'blue' | 'purple' | 'neon-pink';
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
            'neon-pink': {
                bg: 'bg-stone-900',
                checkers: 'bg-pink-500', // Not used for checkers but for accent
                accent: 'text-pink-500',
                border: 'border-pink-500',
            }
        };

        const currentTheme = themeColors[theme];
        const isNeon = theme === 'neon-pink';

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative w-[300px] p-4 flex flex-col gap-4 items-center overflow-hidden shadow-2xl transition-colors duration-300",
                    currentTheme.bg
                )}
                style={{
                    // CSS Pattern for checkers (only for retro themes)
                    backgroundImage: !isNeon ? `
                linear-gradient(45deg, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 25%, transparent 25%), 
                linear-gradient(-45deg, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 75%), 
                linear-gradient(-45deg, transparent 75%, ${theme === 'green' ? '#16a34a' : theme === 'blue' ? '#2563eb' : '#9333ea'} 75%)
            ` : undefined,
                    backgroundSize: !isNeon ? '40px 40px' : undefined,
                    backgroundPosition: !isNeon ? '0 0, 0 20px, 20px -20px, -20px 0px' : undefined
                }}
            >
                {/* Title */}
                <div className={clsx("z-10 mb-2 transition-transform", !isNeon && "transform -rotate-2")}>
                    <h2 className={clsx(
                        "font-black text-2xl tracking-tighter uppercase",
                        currentTheme.accent,
                        isNeon ? "drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "drop-shadow-sm"
                    )}
                        style={{ fontFamily: isNeon ? '"Courier New", monospace' : '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                    >
                        ButBooth
                    </h2>
                </div>

                {/* Photos */}
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "relative z-10 p-2 transform transition-transform hover:scale-105",
                            isNeon ? "bg-stone-800 shadow-[0_0_15px_rgba(236,72,153,0.5)]" : "bg-white shadow-md"
                        )}
                        style={{
                            // Randomize rotation slightly for hand-placed look (only retro)
                            transform: !isNeon ? `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})` : 'none',
                            // Hand-drawn border radius effect (only retro)
                            borderRadius: !isNeon ? '255px 15px 225px 15px / 15px 225px 15px 255px' : '0px',
                            border: isNeon ? '2px solid #ec4899' : '3px solid #333'
                        }}
                    >
                        <img
                            src={photo}
                            alt={`Capture ${index + 1}`}
                            className="w-[240px] h-[160px] object-cover"
                            style={{
                                borderRadius: !isNeon ? '255px 15px 225px 15px / 15px 225px 15px 255px' : '0px',
                            }}
                        />

                        {/* Decorative scribbles (only retro) */}
                        {!isNeon && (
                            <svg className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 z-20" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35Z" />
                            </svg>
                        )}
                    </div>
                ))}

                {/* Footer */}
                <div className="mt-4 z-10 text-center">
                    <p className={clsx("font-bold text-sm", currentTheme.accent)}
                        style={{ fontFamily: isNeon ? '"Courier New", monospace' : '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                        {new Date().toLocaleDateString()} • MEMORIES
                    </p>
                    <p className={clsx("text-xs font-mono mt-1", isNeon ? "text-pink-300" : "text-stone-500")}>
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
