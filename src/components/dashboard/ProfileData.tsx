import { auth } from "@clerk/nextjs/server";

export async function ProfileData(){
    const {userId} = await auth();
    const userData = await fetch('/api/user',{method:'GET'});
    // error handling to be done later 

    return <div>
        {/* name, date of birth and other things shows that are fetched from api */}
    </div>

}