"use server";

import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

export async function fetchUserProfile() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.data.user?.id)
        .single();

    return data;
}