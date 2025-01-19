import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {fetchAuthenticatedUser} from "@/utils/queries";

export default async function AboutPage() {

    const user = await fetchAuthenticatedUser();

    if (!user) {
        return redirect("/sign-in");
    }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
        <h2>About</h2>
    </div>
  );
}
