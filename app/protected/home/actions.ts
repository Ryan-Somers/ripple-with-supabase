"use server";

import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

// This function will be called when the form is submitted
export async function addPost(formData: FormData) {
    const supabase = await createClient();

    // Get user from the session or cookies
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
    }

    // Insert the post data into the database
    const { data, error: insertError } = await supabase
        .from("posts")
        .insert([{ user_id: user.id, content: formData.get("post") }]);

    if (insertError) {
        console.error("Error inserting post:", insertError);
        throw new Error("Error inserting post");
    }

    revalidatePath("/protected/home");

    return { message: "Post successfully created!", post: data };
}
