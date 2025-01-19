// app/api/posts/route.ts

import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        // Get the token from the cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("supabase.auth.token"); // The token stored by Supabase in cookies

        if (!token) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Using the token to get the user information
        const { data: { user }, error: authError } = await supabase.auth.getUser(token.value);

        if (authError || !user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Insert the post into the database
        const { error: insertError } = await supabase
            .from('posts')
            .insert([{ user_id: user.id, content: req.body }]);

        if (insertError) {
            return NextResponse.json({ error: "Error inserting post", details: insertError }, { status: 500 });
        }

        return NextResponse.json({ message: "Post successfully created!" });

    } catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error }, { status: 500 });
    }
}
