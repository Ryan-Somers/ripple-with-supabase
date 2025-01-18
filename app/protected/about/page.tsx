import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AboutPage() {
  

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
        <h2>About</h2>
    </div>
  );
}
