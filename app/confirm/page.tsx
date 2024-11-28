import Link from "next/link"

export default function ErrorPage() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center text-sm">
                <p>送信されたメールを確認し、ログインしてください。</p>
            </div>
        </div>
    )
}