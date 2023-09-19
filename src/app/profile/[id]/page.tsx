export default function UserProfile({params}:any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-xl">User Profile</h1>
            <hr />
            <p className="text-4xl">My Profile</p>
            <p className="text-4xl">User #: {[params.id]}</p>
            <p className="text-4xl">Username:</p>

        </div>
    )
}