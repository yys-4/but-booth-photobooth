'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, RefreshCcw, Download } from 'lucide-react';
import StripComposer from './StripComposer';
import DownloadButton from './DownloadButton';
import { Plant, Sparkle, Squiggle, Heart, Coffee } from './Doodles';
import { clsx } from 'clsx';

export default function PhotoBooth() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [step, setStep] = useState<'intro' | 'capture' | 'preview'>('intro');
    const [selectedTheme, setSelectedTheme] = useState<'green' | 'blue' | 'purple' | 'neon-pink'>('green');

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 1280, height: 720 },
                audio: false,
            });
            setStream(mediaStream);
            setStep('capture');
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Could not access camera. Please allow camera permissions.');
        }
    };

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, step]);

    const takePhoto = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                // Set canvas dimensions to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Draw video frame to canvas
                // Mirror the image to match the user's view
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const photoData = canvas.toDataURL('image/jpeg', 0.9);
                return photoData;
            }
        }
        return null;
    }, []);

    const startCaptureSequence = async () => {
        if (isCapturing) return;
        setIsCapturing(true);
        setPhotos([]);

        const captureOne = async (index: number) => {
            // Countdown 3, 2, 1
            for (let i = 3; i > 0; i--) {
                setCountdown(i);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setCountdown(0); // "Cheese!" or flash effect

            const photo = takePhoto();
            if (photo) {
                setPhotos((prev) => [...prev, photo]);
            }

            // Small pause between photos
            await new Promise((resolve) => setTimeout(resolve, 500));
            setCountdown(null);
        };

        // Take 3 photos
        await captureOne(1);
        await captureOne(2);
        await captureOne(3);

        setIsCapturing(false);
        setStep('preview');

        // Stop camera stream to save resources
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const reset = () => {
        setPhotos([]);
        setStep('intro');
        startCamera();
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 p-4 font-sans relative overflow-hidden">

            {/* Background Doodles (Only visible on intro) */}
            {step === 'intro' && (
                <>
                    <div className="absolute top-10 left-10 text-green-500 hidden md:block transform -rotate-12 opacity-50">
                        <Plant className="w-32 h-32" />
                    </div>
                    <div className="absolute top-20 right-20 text-yellow-400 hidden md:block animate-pulse opacity-60">
                        <Sparkle className="w-24 h-24" />
                    </div>
                    <div className="absolute bottom-10 left-20 text-blue-400 hidden md:block transform rotate-12 opacity-50">
                        <Squiggle className="w-48 h-12" />
                    </div>
                    <div className="absolute bottom-32 right-10 text-pink-400 hidden md:block transform rotate-45 opacity-50">
                        <Heart className="w-20 h-20" />
                    </div>
                    <div className="absolute top-1/3 left-10 text-stone-400 hidden md:block transform -rotate-6 opacity-40">
                        <Coffee className="w-24 h-24" />
                    </div>
                </>
            )}

            <h1 className="text-4xl font-bold mb-8 text-stone-800 tracking-tight z-10 relative">
                ButBooth
            </h1>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-stone-800 z-10 relative">

                {/* Intro Step */}
                {step === 'intro' && (
                    <div className="p-8 text-center space-y-6">
                        <div className="w-32 h-32 bg-yellow-300 rounded-full mx-auto flex items-center justify-center border-4 border-stone-800">
                            <Camera size={48} className="text-stone-800" />
                        </div>
                        <p className="text-xl text-stone-600 font-medium">
                            Ready to take some cute photos?
                        </p>
                        <button
                            onClick={startCamera}
                            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-lg transition-transform active:scale-95 border-b-4 border-blue-700"
                        >
                            Start Camera
                        </button>
                    </div>
                )}

                {/* Capture Step */}
                {step === 'capture' && (
                    <div className="relative bg-black aspect-[3/4]">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform -scale-x-100"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Overlay UI */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pointer-events-none">
                            {countdown !== null && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                    <span className="text-9xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] animate-bounce">
                                        {countdown === 0 ? '📸' : countdown}
                                    </span>
                                </div>
                            )}

                            <div className="pointer-events-auto">
                                {!isCapturing && (
                                    <button
                                        onClick={startCaptureSequence}
                                        className="w-20 h-20 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center hover:bg-red-600 transition-transform active:scale-90"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-red-200" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Photo Counter */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                            {photos.length} / 3
                        </div>
                    </div>
                )}

                {/* Preview Step */}
                {step === 'preview' && (
                    <div className="p-6 bg-stone-50 flex flex-col items-center">
                        <div className="mb-6 flex gap-2">
                            <button
                                onClick={() => setSelectedTheme('green')}
                                className={clsx("px-4 py-2 rounded-full font-bold text-sm transition-all border-2", selectedTheme === 'green' ? "bg-green-500 text-white border-green-700" : "bg-white text-stone-600 border-stone-200")}
                            >
                                Retro Green
                            </button>
                            <button
                                onClick={() => setSelectedTheme('neon-pink')}
                                className={clsx("px-4 py-2 rounded-full font-bold text-sm transition-all border-2", selectedTheme === 'neon-pink' ? "bg-pink-500 text-white border-pink-700" : "bg-white text-stone-600 border-stone-200")}
                            >
                                Neon Pink
                            </button>
                        </div>

                        <StripComposer ref={stripRef} photos={photos} theme={selectedTheme} />

                        <div className="mt-6 flex gap-3 w-full max-w-[300px]">
                            <button
                                onClick={reset}
                                className="flex-1 py-3 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <RefreshCcw size={20} />
                                Retake
                            </button>
                            <DownloadButton targetRef={stripRef} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
