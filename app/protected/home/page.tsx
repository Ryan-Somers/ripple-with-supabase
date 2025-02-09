// pages/index.tsx
import { redirect } from "next/navigation";
import { SocialCard } from "@/components/ui/social-card";
import { formatDistanceToNow } from 'date-fns';
import {fetchAuthenticatedUser, fetchPostsWithProfiles} from "@/utils/queries";
import {TextareaForm} from "@/components/ui/add-post";
import {fetchCommentCountByPost} from "@/app/protected/home/actions";  // Import the query function

export default async function HomePage() {

    const user = await fetchAuthenticatedUser();

    if (!user) {
        return redirect("/sign-in");
    }

    // Use the reusable query to fetch posts with profiles
    const postsWithProfiles = await fetchPostsWithProfiles();

    // Fetch comment count for each post
    const postsWithCommentCounts = await Promise.all(postsWithProfiles.map(async (post) => {
        const commentCount = await fetchCommentCountByPost(post.id);
        return {
            ...post,
            commentCount,  // Add the comment count to the post
        };
    }));

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
            </div>
            <div className="col-span-8 space-y-8">
                <h2 className={"font-semibold text-center text-2xl"}>Ripples</h2>
                <div className="grid w-full gap-2">
                    <TextareaForm />
                </div>
                {postsWithCommentCounts.map((post) => (
                    <SocialCard
                        key={post.id}
                        postId={post.id}
                        authenticationUserId={post.user_id}
                        author={{
                            id: user.id,  // Post author ID
                            name: post.profile.full_name,
                            avatar: post.profile.avatar_url,
                            timeAgo: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
                        }}
                        content={{
                            text: post.content,
                        }}
                        engagement={{
                            likes: post.likes || 0,
                            comments: post.commentCount, // Use the comment count here
                            shares: post.shares || 0,
                        }}
                    />
                ))}
            </div>

            <div className="col-span-2">
            </div>
        </div>
    );
}
