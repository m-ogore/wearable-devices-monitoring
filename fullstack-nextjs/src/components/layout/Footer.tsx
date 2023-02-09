import Image from "next/image"

function Footer() {
  return (
    <div className="absolute bg-slate-100 w-full py-4 bottom-0 text-center text-sm">
        <footer className="w-full">
            <div className="flex justify-center space-x-8 mb-8">
                <Image src="/aceiot_logo.jpeg" width={96} height={96} alt="aceiot" />
                <Image src="/narada_logo.png" width={96} height={96} alt="aceiot" />
            </div>
            <p>Wearable Devices Monitoring - {new Date().getFullYear()}</p>
        </footer>
    </div>
  )
}

export default Footer