import { fetchUser } from "@/lib/actions/user/fetchUser";
import { notFound } from "next/navigation";

export async function ProfileData(){
    const userData = await fetchUser();
    
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