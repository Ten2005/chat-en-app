import Link from "next/link"

export default function ErrorPage() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
            <p>エラーが発生しました。</p>
                <Link href="/login" className="text-blue-500 text-xs text-right w-full px-4 py-2">ログイン画面に戻る</Link>
            </div>
        </div>
    )
}