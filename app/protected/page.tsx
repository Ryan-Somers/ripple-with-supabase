import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Query the 'profiles' table using the user ID
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("id", user.id) 
    .single(); 

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2>You are signed in as {profile?.full_name}</h2>
      <p>Your bio is: {profile?.bio}</p>
     

    </div>
  );
}
