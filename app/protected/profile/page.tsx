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

    const { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        return redirect("/sign-in");
    }



    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <h2 className={"font-semibold text-2xl"}>Hello, {user.full_name}</h2>
            <p className={"text-muted-foreground"}>Here's your profile information:</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Full Name</span>
                    <span>{user.full_name}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Bio</span>
                    <span>{user.bio}</span>
                </div>
            <div className="">
                <Button variant={"default"}>Edit Profile</Button>
            </div>

            </div>
        </div>
    );
}
