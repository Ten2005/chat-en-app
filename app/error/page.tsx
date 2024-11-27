import Link from "next/link"

export default function ErrorPage() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
            <p>Sorry, something went wrong</p>
                <Link href="/login" className="text-blue-500 text-xs text-right w-full">Go back to login page</Link>
            </div>
        </div>
    )
}