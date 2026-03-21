// This is the profile page.
import { ProfileData } from "@/components/dashboard/ProfileData";

export default function Profile() {
    return <div className="space-y-6">

        <div>
            <h1 className="text-2xl font-semibold text-white">
                Profile
            </h1>
            <p className="text-sm text-white/50">
                Manage your personal information
            </p>
        </div>

        <ProfileData />

    </div>
}