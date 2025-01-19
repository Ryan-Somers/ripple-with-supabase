// utils/queries.ts

import { createClient } from "@/utils/supabase/server";

// Create a Supabase client instance
const supabase = createClient();

// Function to fetch the authenticated user
export async function fetchAuthenticatedUser() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }

    return user;
}

/**
 * Fetch posts along with their authors' profile information.
 */
export async function fetchPostsWithProfiles() {
    // Fetch posts first
    const { data: posts, error: postsError } = await (await supabase)
        .from("posts")
        .select("*")  // Select all fields from posts
        .order("created_at", { ascending: false });

    if (postsError) {
        console.error("Error fetching posts:", postsError);
        throw postsError;
    }

    // Fetch profile for each post's user_id
    const postsWithProfiles = await Promise.all(
        posts.map(async (post: any) => {
            const { data: profile, error: profileError } = await (await supabase)
                .from("profiles")
                .select("full_name, avatar_url")  // Only select necessary profile fields
                .eq("id", post.user_id)
                .single();  // Expect a single match for each user_id

            if (profileError) {
                console.error(`Error fetching profile for post with ID ${post.id}:`, profileError);
                throw profileError;
            }

            // Combine post data with profile data
            return {
                ...post,
                profile,  // Attach the profile data to the post
            };
        })
    );

    return postsWithProfiles;
}

/**
 * Fetch the current user's profile information based on their user ID.
 */
export async function fetchUserProfile(userId: string) {
    const { data: profile, error } = await (await supabase)
        .from("profiles")
        .select("full_name, avatar_url, bio, location")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }

    return profile;
}

export const getUser = async () => {
    const { data, error } = await (await supabase).auth.getUser();
    if (error) {
        console.error("Error fetching user:", error);
        return null;
    }
    return data?.user;
};

export const insertPost = async (userId: string, postContent: string) => {
    // Assuming you have a posts table to insert the new post
    const { data, error } = await (await supabase)
        .from("posts")
        .insert([{ user_id: userId, content: postContent }]);

    if (error) {
        console.error("Error inserting post:", error);
        return { success: false, error };
    }

    return { success: true, data };
};
