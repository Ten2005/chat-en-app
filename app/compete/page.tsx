'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
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



export default function Compete() {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                router.push('/login');
            }
            return data;
        };

        checkUser();
    }, [router]);
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
    <main className="w-full h-[calc(100vh-124px)] flex items-center justify-center">
      coming soon
    </main>
    </>
);
}