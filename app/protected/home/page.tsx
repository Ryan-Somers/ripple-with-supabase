
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {SocialCard} from "@/components/ui/social-card";
import { formatDistanceToNow } from 'date-fns';


export default async function HomePage() {
    const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("id, title, content, author, created_at")
    .order("created_at", { ascending: false });

    return (
        <div className="">
            <div>
                {posts.map(post => (
                    <SocialCard
                        key={post.id}
                        author={{
                            name: post.author.name,
                            username: post.author.username,
                            timeAgo: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
                        }}
                        content={{
                            text: post.content,
                        }}
                    />
                ))}
            </div>
        </div>
    );

}
