'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import Image from 'next/image'
import menuIconSrc from "@/public/design-dev-icons/SVG icons/dev-icon-235.svg"

export default function Words() {
    const [words, setWords] = useState<string[]>(['please wait...']);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                router.push('/login');
                return;
            }
            return data;
        };

        const getWords = async (userEmail: string): Promise<string[]> => {
            const { data, error } = await supabase.from('users').select('messages').eq('email', userEmail);
            const messages = data && data[0] && data[0].messages 
                ? JSON.parse(data[0].messages) 
                : [''];
            const wordsData = await fetch('https://chat-en-app-5044aa6f7d13.herokuapp.com/getWords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'messages': messages }),
            })
            .then((res) => res.json())
            .then((data) => data.words)
            .catch((error) => {
                console.error("Error sending message:", error);
                return [];
            });
            return wordsData;
        };

        const fetchData = async () => {
            const userData = await checkUser();
            if (userData?.user?.email) {
                const wordsData = await getWords(userData.user.email);
                setWords(wordsData);
            }
        };

        fetchData();
    }, [router, supabase]);

    return (
        <>
        <header className="w-screen h-12 border-b flex items-center justify-end bg-opacity-0">
            <Sheet>
            <SheetTrigger className="bg-slate-300 inline my-auto mr-4">
                <Image src={menuIconSrc} alt="Icon" width={24} height={24} className="" />
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>コンテンツ一覧</SheetTitle>
                <SheetDescription>
                </SheetDescription>
            </SheetHeader>
                <ul className='mt-4'>
                    <li className="mt-2">
                        <Link href={'/chat'} className='border-b border-slate-600 p-1'>会話する</Link>
                        <p className='text-xs ml-2 mt-2 p-2'>会話で使われた表現は保存され、自動で単語帳に追加されます</p>
                    </li>
                    <li className="mt-2">
                        <Link href={'/words'} className='border-b border-slate-600 p-1'>理解する</Link>
                        <p className='text-xs ml-2 mt-2 p-2'>単語の意味や例文、文章構造、発音が自動で作成され表示されます。</p>
                    </li>
                    <li className="mt-2">
                        <Link href={'/compete'} className='border-b border-slate-600 p-1'>競い合う</Link>
                        <p className='text-xs ml-2 mt-2 p-2'>保存された単語数と、ランダムに出題されるテストの結果をもとにスコアが算出さ���ます</p>
                    </li>
                </ul>
            </SheetContent>
            </Sheet>
        </header>
        <main className="p-4">
            <div className="w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {words.map((word, index) => (
                    <div 
                        key={index}
                        className="p-3 shadow rounded-md hover:shadow-md transition-shadow text-center"
                    >
                        {word}
                    </div>
                ))}
            </div>
        </main>
        </>
    )
}
