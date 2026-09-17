import { supabaseAdmin } from "@/utils/supabase/admin";

type CreateUserData = {
    clerkId: string;
    email?: string | null;
    name?: string | null;
    isBusiness?: boolean;
}

export async function createUser(data: CreateUserData) {
    const { clerkId, email = null, name = null, isBusiness = false } = data;

    const { data: user, error } = await supabaseAdmin
        .from("users")
        .upsert({
            clerk_id: clerkId,
            email,
            name,
            is_business: isBusiness
        })
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }

    return user;
}