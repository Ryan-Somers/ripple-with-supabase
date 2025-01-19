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

// This function will be called when the comment form is submitted
export async function addComment(formData: FormData, postId: string) {
    const supabase = await createClient();

    // Get user from the session or cookies
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
    }

    // Insert the comment data into the database
    const { data, error: insertError } = await supabase
        .from("comments")
        .insert([{ post_id: postId, user_id: user.id, content: formData.get("comment") }]);

    if (insertError) {
        console.error("Error inserting comment:", insertError);
        throw new Error("Error inserting comment");
    }

    // Revalidate the path to refresh data after adding the comment
    revalidatePath(`/post/${postId}`);

    return { message: "Comment successfully added!", comment: data };
}
export async function fetchCommentsByPost(postId: string) {
    const supabase = await createClient();
    try {
        // Step 1: Fetch comments related to the post
        const { data: comments, error: commentError } = await supabase
            .from('comments')
            .select('id, content, created_at, user_id') // user_id references auth.users
            .eq('post_id', postId);

        if (commentError) throw new Error(commentError.message);

        // Step 2: Fetch profiles where the profile's id matches user_id from comments
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')  // Select profile data
            .in('id', comments.map(comment => comment.user_id)); // Match profiles by user_id

        if (profileError) throw new Error(profileError.message);

        // Step 3: Merge the profiles with comments
        const commentsWithProfiles = comments.map(comment => {
            // Find the profile based on user_id
            const profile = profiles.find(profile => profile.id === comment.user_id);
            return {
                ...comment,
                full_name: profile?.full_name || 'Unknown',
                avatar_url: profile?.avatar_url || '/default-avatar.png',
            };
        });

        return commentsWithProfiles; // Return the merged comments with profile info
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Error fetching comments');
    }
}

// utils/queries.ts

export async function fetchCommentCountByPost(postId: string) {
    const supabase = await createClient();
    try {
        const { count, error } = await supabase
            .from('comments')
            .select('id', { count: 'exact' })  // Count all comment entries by post_id
            .eq('post_id', postId);

        if (error) throw new Error(error.message);

        return count || 0;  // Return the comment count (default to 0 if no comments)
    } catch (error) {
        console.error('Error fetching comment count:', error);
        return 0;
    }
}

export async function addLike(postId: string, userId: string, isLiked: boolean) {
    const supabase = await createClient();
    try {
        if (isLiked) {
            // Add a like to the database
            const { error } = await supabase
                .from('likes')
                .upsert({
                    user_id: userId,
                    post_id: postId,
                    liked_at: new Date(),
                });

            if (error) throw error;

            return { success: true, message: 'Like added successfully' };
        } else {
            // Remove a like from the database
            const { error } = await supabase
                .from('likes')
                .delete()
                .eq('user_id', userId)
                .eq('post_id', postId);

            if (error) throw error;

            return { success: true, message: 'Like removed successfully' };
        }
    } catch (error) {
        console.error('Error while handling like:', error);
        return { success: false, message: 'Failed to update like' };
    }
}

export async function getLikes(postId: string) {
    const supabase = await createClient(); // Initialize Supabase client
    const user = await supabase.auth.getUser(); // Get the current authenticated user

    if (!user) {
        return { success: false, message: 'User not authenticated' };
    }

    try {
        // Query to count likes for the post
        const { data, error, count } = await supabase
            .from('likes')
            .select('*', { count: 'exact' }) // Use '*' to count all rows
            .eq('post_id', postId);

        if (error) throw error;

        const isUserLiked = data.some((like: any) => like.user_id === user.data.user?.id);

        console.log('Data:', data, 'Count:', count);

        // Return both the likes count and user like status
        return {
            success: true,
            likes: count ?? 0,
            isUserLiked,
        };
    } catch (error) {
        console.error('Error while fetching likes:', error);
        return { success: false, message: 'Failed to fetch likes' };
    }
}













