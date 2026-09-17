// import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const event = await verifyWebhook(req);

        console.log("Clerk webhook received!");
        console.log("Event type:", event.type);
        console.log("User:", event.data);

        if (event.type == "user.created") {
            console.log("🎉 New user created:", event.data.id);
        }

        return new Response("Webhook received", { status: 200 });
    } catch(error) {
        console.error("Webhook verification failed:", error);

        return new Response("Webhook verification failed", {
            status: 400,
        });
    }
}