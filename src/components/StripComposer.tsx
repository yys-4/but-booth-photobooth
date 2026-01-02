import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Cat, Bunny, Bear, OneFineDayLogo, Star, Sparkle, Heart } from './Doodles';

interface StripComposerProps {
    photos: string[];
    theme?: 'green' | 'blue' | 'purple' | 'neon-pink' | 'one-fine-day' | 'one-fine-day-lilac' | 'bunny-pink' | 'bear-brown';
    photoPositions?: { x: number; y: number }[];
    onPhotoPositionChange?: (index: number, newPos: { x: number; y: number }) => void;
}

// Internal component for handling smooth drag
const DraggablePhoto = ({
    src,
    index,
    initialPos,
    onPositionChange,
    className,
    style,
    ...props
}: {
    src: string;
    index: number;
    initialPos?: { x: number; y: number };
    onPositionChange?: (index: number, newPos: { x: number; y: number }) => void;
    className?: string;
    style?: React.CSSProperties;
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

    // Sync ref style with props when not dragging (e.g. reset or initial load)
    useEffect(() => {
        if (imgRef.current && !dragRef.current) {
            const x = initialPos?.x || 0;
            const y = initialPos?.y || 0;
            imgRef.current.style.objectPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
        }
    }, [initialPos]);

    const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
        if (!onPositionChange) return;
        e.preventDefault();
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);

        const currentX = initialPos?.x || 0;
        const currentY = initialPos?.y || 0;

        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            initialX: currentX,
            initialY: currentY
        };
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
        if (!dragRef.current || !imgRef.current) return;

        const { startX, startY, initialX, initialY } = dragRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const newX = initialX + dx;
        const newY = initialY + dy;

        // Direct DOM update for smoothness
        imgRef.current.style.objectPosition = `calc(50% + ${newX}px) calc(50% + ${newY}px)`;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
        if (dragRef.current) {
            const target = e.currentTarget;
            target.releasePointerCapture(e.pointerId);

            const { startX, startY, initialX, initialY } = dragRef.current;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Commit final position to parent state
            if (onPositionChange) {
                onPositionChange(index, { x: initialX + dx, y: initialY + dy });
            }

            dragRef.current = null;
        }
    };

    return (
        <img
            ref={imgRef}
            src={src}
            alt={props.alt || `Capture ${index + 1}`}
            className={clsx(className, onPositionChange && "cursor-move touch-none")}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                ...style,
                // Initial render style is handled by useEffect, but we set it here too to avoid flash
                objectPosition: `calc(50% + ${initialPos?.x || 0}px) calc(50% + ${initialPos?.y || 0}px)`
            }}
            {...props}
        />
    );
};

const StripComposer = forwardRef<HTMLDivElement, StripComposerProps>(
    ({ photos, theme = 'green', photoPositions = [], onPhotoPositionChange }, ref) => {

        const isRetro = ['green', 'blue', 'purple'].includes(theme);
        const isNeon = theme === 'neon-pink';
        const isCute = ['one-fine-day', 'one-fine-day-lilac', 'bunny-pink', 'bear-brown'].includes(theme);

        const themeConfig = {
            // ... (keep existing themes if needed, or inline logic)
            'one-fine-day': {
                bg: 'bg-[#002f6c]', // Deep blue from reference
                text: 'text-pink-300',
                doodle: Cat,
                doodleColor: 'text-pink-300',
            },
            'one-fine-day-lilac': {
                bg: 'bg-[#dcd0ff]', // Lilac
                text: 'text-[#6a0dad]', // Dark Purple
                doodle: Cat,
                doodleColor: 'text-white', // Use white for doodles or dark purple
            },
            'bunny-pink': {
                bg: 'bg-pink-100',
                text: 'text-pink-500',
                doodle: Bunny,
                doodleColor: 'text-white',
            },
            'bear-brown': {
                bg: 'bg-[#4a3728]',
                text: 'text-[#d4b996]',
                doodle: Bear,
                doodleColor: 'text-[#b08d55]',
            }
        };

        const getRotation = (index: number) => {
            if (isRetro) return index % 2 === 0 ? '-2deg' : '2deg';
            return '0deg';
        };

        const getBorderRadius = (index: number) => {
            if (isRetro) return '255px 15px 225px 15px / 15px 225px 15px 255px';
            if (isCute && index === 0) return '100px 100px 10px 10px'; // Arched top for first photo
            if (isCute && index === 2) return '10px 10px 20px 20px'; // Slightly rounded bottom for last
            return '4px'; // Default/Neon
        };

        const getBorder = () => {
            if (isNeon) return '2px solid #ec4899';
            if (isRetro) return '3px solid #333';
            if (isCute) return 'none'; // Cute themes usually have borderless photos or white frames
            return 'none';
        };

        const CuteThemeWrapper = ({ children }: { children: React.ReactNode }) => {
            if (theme === 'one-fine-day') {
                return (
                    // Deep blue background wrapper
                    <div className="absolute inset-0 bg-[#002f6c] z-0 flex flex-col items-center">
                        {children}
                        {/* Decorative elements specific to One Fine Day */}
                        <div className="absolute top-4 w-full flex justify-center z-20">
                            <OneFineDayLogo className="w-40 text-pink-300" />
                        </div>
                        <Star className="absolute top-[28%] left-2 w-8 h-8 text-pink-300 animate-pulse" />
                        <Sparkle className="absolute top-[28%] right-2 w-6 h-6 text-pink-200" />
                        <Star className="absolute bottom-[20%] right-[-10px] w-10 h-10 text-blue-300" />

                        <div className="absolute bottom-0 w-full flex justify-center">
                            <Cat className="w-32 h-32 text-pink-300 transform translate-y-4" />
                        </div>
                    </div>
                );
            }
            if (theme === 'one-fine-day-lilac') {
                return (
                    // Lilac background wrapper
                    <div className="absolute inset-0 bg-[#e0b0ff] z-0 flex flex-col items-center">
                        {children}
                        {/* Decorative elements specific to One Fine Day (Lilac) */}
                        <div className="absolute top-4 w-full flex justify-center z-20">
                            <OneFineDayLogo className="w-40 text-white drop-shadow-md" color="white" />
                        </div>
                        <Star className="absolute top-[28%] left-2 w-8 h-8 text-white animate-pulse" />
                        <Sparkle className="absolute top-[28%] right-2 w-6 h-6 text-purple-200" />
                        <Star className="absolute bottom-[20%] right-[-10px] w-10 h-10 text-purple-300" />

                        <div className="absolute bottom-0 w-full flex justify-center">
                            <Cat className="w-32 h-32 text-white transform translate-y-4 drop-shadow-sm" />
                        </div>
                    </div>
                );
            }
            if (theme === 'bunny-pink') {
                return (
                    // Pink background wrapper
                    <div className="absolute inset-0 bg-pink-200 z-0 flex flex-col items-center">
                        {children}
                        <h2 className="absolute top-6 font-black text-3xl text-white tracking-widest drop-shadow-md" style={{ fontFamily: '"Comic Sans MS", cursive' }}>BUNNY</h2>
                        <Heart className="absolute top-[25%] left-2 w-8 h-8 text-white" />
                        <div className="absolute bottom-0 w-full flex justify-center">
                            <Bunny className="w-32 h-32 text-white transform translate-y-4" />
                        </div>
                    </div>
                );
            }
            if (theme === 'bear-brown') {
                return (
                    <div className="absolute inset-0 bg-[#5d4037] z-0 flex flex-col items-center">
                        {children}
                        <h2 className="absolute top-6 font-black text-3xl text-[#d7ccc8] tracking-widest" style={{ fontFamily: 'serif' }}>BEAR</h2>
                        <Sparkle className="absolute top-[25%] right-2 w-6 h-6 text-[#d7ccc8]" />
                        <div className="absolute bottom-0 w-full flex justify-center">
                            <Bear className="w-32 h-32 text-[#8d6e63] transform translate-y-2" />
                        </div>
                    </div>
                );
            }
            return <>{children}</>;
        };


        return (
            <div
                ref={ref}
                className={clsx(
                    "relative w-[300px] min-h-[600px] p-6 flex flex-col gap-4 items-center overflow-hidden shadow-2xl transition-colors duration-300",
                    isRetro && (theme === 'green' ? 'bg-green-200' : theme === 'blue' ? 'bg-blue-200' : 'bg-purple-200'),
                    isNeon && 'bg-stone-900',
                    // Cute themes handle their own bg in wrapper
                )}
                style={{
                    // Retro Checkers Pattern
                    backgroundImage: isRetro ? `
                linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%), 
                linear-gradient(-45deg, rgba(0,0,0,0.05) 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.05) 75%), 
                linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.05) 75%)
            ` : undefined,
                    backgroundSize: isRetro ? '40px 40px' : undefined,
                    backgroundPosition: isRetro ? '0 0, 0 20px, 20px -20px, -20px 0px' : undefined
                }}
            >

                {isCute ? (
                    <CuteThemeWrapper>
                        {/* Spacer for the top header/logo */}
                        <div className="h-24 w-full shrink-0"></div>

                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="relative z-10 mb-2 shrink-0 bg-white"
                                style={{
                                    width: '220px',
                                    height: '140px', // Slightly shorter for 3-stack
                                    borderRadius: getBorderRadius(index),
                                    overflow: 'hidden',
                                    padding: '4px', // White border effect
                                }}
                            >
                                <DraggablePhoto
                                    src={photo}
                                    index={index}
                                    initialPos={photoPositions[index]}
                                    onPositionChange={onPhotoPositionChange}
                                    className="w-full h-full object-cover"
                                    style={{
                                        borderRadius: getBorderRadius(index),
                                    }}
                                />
                            </div>
                        ))}
                    </CuteThemeWrapper>
                ) : (
                    <>
                        {/* Title for Retro/Neon */}
                        <div className={clsx("z-10 mb-2 transition-transform", isRetro && "transform -rotate-2")}>
                            <h2 className={clsx(
                                "font-black text-2xl tracking-tighter uppercase",
                                theme === 'green' ? 'text-green-800' : theme === 'blue' ? 'text-blue-800' : theme === 'purple' ? 'text-purple-800' : 'text-pink-500',
                                isNeon ? "drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "drop-shadow-sm"
                            )}
                                style={{ fontFamily: isNeon ? '"Courier New", monospace' : '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                            >
                                ButBooth
                            </h2>
                        </div>

                        {/* Photos for Retro/Neon */}
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "relative z-10 p-2 transform transition-transform hover:scale-105",
                                    isNeon ? "bg-stone-800 shadow-[0_0_15px_rgba(236,72,153,0.5)]" : "bg-white shadow-md"
                                )}
                                style={{
                                    transform: `rotate(${getRotation(index)})`,
                                    borderRadius: getBorderRadius(index),
                                    border: getBorder()
                                }}
                            >
                                <DraggablePhoto
                                    src={photo}
                                    index={index}
                                    initialPos={photoPositions[index]}
                                    onPositionChange={onPhotoPositionChange}
                                    className="w-[240px] h-[160px] object-cover"
                                    style={{
                                        borderRadius: getBorderRadius(index),
                                    }}
                                />
                                {/* Decorative scribbles (only retro) */}
                                {isRetro && (
                                    <svg className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 z-20 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35Z" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </>
                )}

                {/* Footer only for non-cute (cute text is embedded in wrapper) */}
                {!isCute && (
                    <div className="mt-4 z-10 text-center">
                        <p className={clsx("font-bold text-sm", theme === 'green' ? 'text-green-800' : 'text-stone-800')}
                            style={{ fontFamily: isNeon ? '"Courier New", monospace' : '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                            {new Date().toLocaleDateString()} • MEMORIES
                        </p>
                    </div>
                )}
            </div>
        );
    }
);
export default StripComposer;
