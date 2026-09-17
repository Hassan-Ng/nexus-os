// import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { createUser } from '@/lib/users';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const event = await verifyWebhook(req);

        console.log("Clerk webhook received!");
        console.log("Event type:", event.type);
        console.log("User:", event.data);

        if (event.type == "user.created") {
            const { id, email_addresses, first_name, last_name } = event.data;

            const email = email_addresses[0]?.email_address ?? null;

            const name = [first_name, last_name].filter(Boolean).join(" ") || null;

            const user = await createUser({
                clerkId: id,
                name,
                email,
                isBusiness: false,
            });

            console.log("Supabase user created:", user);
        }

        return new Response("Webhook received", { status: 200 });
    } catch(error) {
        console.error("Webhook failed:", error);

        return new Response("Webhook failed", {
            status: 400,
        });
    }
}