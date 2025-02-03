import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {Button} from "@/components/ui/button";

export default async function ProfilePage() {
    const supabase = await createClient();
    const {data: {session}} = await supabase.auth.getSession();

    if (!session || !session.user) {
        return redirect("/sign-in");
    }

    const userId = session.user.id;

    // Updated to fetch both user profile and their posts
    const [{ data: user, error }, { data: posts, error: postsError }] = await Promise.all([
        supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single(),
        supabase
            .from("posts")
            .select(`
                id,
                content,
                created_at,
                user_id
            `)
            .eq("user_id", userId)
            .order('created_at', { ascending: false })
    ]);

    if (error || postsError) {
        console.log("Error fetching data:", error || postsError);
        return redirect("/sign-in");
    }

    console.log("Posts fetched:", posts); // Add this temporarily to debug
    if (error) {
        return redirect("/sign-in");
    }

    return (
        <div className="flex-1 w-full flex flex-col items-center py-12 px-4 max-w-3xl mx-auto">
            <div className="w-full space-y-8">
                <div className="text-center space-y-4">
                    <img 
                        src={user.avatar_url} 
                        alt="Profile picture" 
                        className="w-32 h-32 object-cover rounded-full mx-auto ring-2 ring-primary/20 shadow-lg"
                    />
                    <h2 className="font-semibold text-3xl">{user.full_name}</h2>
                </div>

                
            </div>
            
            <div className="w-full mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-center">Your Ripples</h3>
                <div className="space-y-4">
                    {posts?.length ? (
                        posts.map((post) => (
                            <div key={post.id} className="bg-card rounded-lg p-4 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <img 
                                        src={user.avatar_url} 
                                        alt="" 
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{user.full_name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            No ripples yet. Time to make some waves!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
