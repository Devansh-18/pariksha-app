"use client"

export default function Error({error,reset}:{error:Error,reset:()=>void}){
    return(
        <div>
            <h2>Something went wrong</h2>
            <p>The server is currently not responding. Please try again later.</p>
            <p>{error.message}</p>
            <button onClick={()=>reset()}>
                Try again
            </button>
        </div>
    )
}