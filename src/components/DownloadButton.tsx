'use client';

import React, { useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function DownloadButton({ targetRef }: DownloadButtonProps) {
    const handleDownload = useCallback(async () => {
        if (targetRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(targetRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `photobooth-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Error generating image:', err);
            alert('Failed to download image. Please try again.');
        }
    }, [targetRef]);

    return (
        <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
        >
            <Download size={20} />
            Save Photo
        </button>
    );
}
