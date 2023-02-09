
const fetchUsers = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/api/users`);
    if (!res.ok) {
        throw new Error("Failed to fecth users");
    }
    return res.json()
}


const Page = async () => {
    const users = await fetchUsers();

    return (
        <div>
            <div className="flex items-center relative mb-8">
                <div className="text-3l font-bold">
                    Users ({users.length})
                </div>
                <button className="absolute right-0 bg-blue-600 p-2 px-4 rounded-lg text-white">
                    Add User
                </button>
            </div>
            <div className="mb-8">
                <input className="border border-gray-300 p-3 rounded-md w-full" type="text" placeholder="search user" />
            </div>
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">
            {users.map((user: any) => (
                <div key={user.id} className="border border-gray-500 rounded-md text-center py-8">
                    <p className="text-lg font-bold">{user.name}</p>
                    <p className="text-sm">created on: {user.createdAt}</p>
                    <button className="bg-yellow-300 p-2 px-4 rounded-lg mt-3">
                        View details
                    </button>
                </div>
            ))}
            </div>
        </div>
        

    )
}


export default Page;