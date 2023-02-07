function Header() {
    return (
        <div className="bg-slate-200 p-8">
            <div className="lg:flex items-center max-w-screen-2xl mx-auto space-x-48 relative">
                {/** Logo or SiteName */}
                <p className="text-center text-2xl font-bold">
                    Wearable Devices Monitoring
                </p>
                {/** Top Menu */}
                <div className="hidden lg:flex items-center space-x-8 font-bold">
                    <p>Home</p>
                    <p>About</p>
                    <p>Contact</p>
                </div>
                {/** Login Button */}
                <button className="hidden bg-green-600 text-white px-10 py-2 rounded-md lg:inline-block absolute right-0">
                    Login
                </button>
            </div>
        </div>

    )
}

export default Header