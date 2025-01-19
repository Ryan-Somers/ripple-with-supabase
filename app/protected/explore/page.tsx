import {fetchAuthenticatedUser} from "@/utils/queries";
import {redirect} from "next/navigation";

export default async function ExplorePage() {

    const user = await fetchAuthenticatedUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
      <div className="flex-1 w-full flex flex-col gap-12">
          <h2>Explore</h2>
      </div>
    );
  }
