'use client'

import { createClient } from '@/utils/supabase/client'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


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
            // const { data, error } = await supabase
            //     .from('users')
            //     .select('words')
            //     .eq('email', userEmail);
            // if (error) {
            //     console.error("Error fetching data:", error);
            //     return [];
            // }
            // const existingWords = data && data[0] && data[0].words 
            //     ? JSON.parse(data[0].words) 
            //     : [''];

            // if (error) {
            //     const { error: upsertError } = await supabase
            //         .from('users')
            //         .upsert({ email: userEmail, words: [] })
            //         .select();
            //     if (upsertError) {
            //         console.error("データベースへのアップサートエラー:", upsertError)
            //         router.push('/error');
            //         return [];
            //     }
            // }
            // return existingWords;
            const { data, error } = await supabase.from('users').select('messages').eq('email', userEmail);
            const messages = data && data[0] && data[0].messages 
                ? JSON.parse(data[0].messages) 
                : [''];
            const wordsData = await fetch('http://127.0.0.1:8000/getWords', {
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
    )
}
