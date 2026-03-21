// This will show and render profile data of user.
import { fetchUser } from "@/lib/actions/user/fetchUser";
import { notFound } from "next/navigation";

export async function ProfileData() {
    const userData = await fetchUser();

    if (!userData) {
        notFound();
    }

    return <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-medium text-white mb-4">
            Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div>
                <p className="text-white/50">First Name</p>
                <p className="font-medium text-white">
                    {userData.firstName}
                </p>
            </div>

            <div>
                <p className="text-white/50">Last Name</p>
                <p className="font-medium text-white">
                    {userData.lastName}
                </p>
            </div>

            <div className="md:col-span-2">
                <p className="text-white/50">Email</p>
                <p className="font-medium text-white">
                    {userData.email}
                </p>
            </div>

        </div>
    </div>

}