import { fetchUser } from "@/lib/actions/user/fetchUser";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export async function ProfileData(){
    const {userId} = await auth();
    if(!userId){
        await auth.protect();
        return;
    }
    
    const userData = await fetchUser(userId);
    if(!userData){
        notFound();
    }

    return <div>
        {/* name, date of birth and other things shows that are fetched from api */}
        Profile Data
        <p>
            <span>{userData.firstName} </span>
            <span>{userData.lastName} </span>
        </p>
        <p>{userData.email} </p>
    </div>

}