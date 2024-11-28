'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

import Image from 'next/image'
import submitIconSrc from "@/public/design-dev-icons/SVG icons/dev-icon-181.svg"
import menuIconSrc from "@/public/design-dev-icons/SVG icons/dev-icon-235.svg"



export default function Learning() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [messages, setMessages] = useState<string[]>([]);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                router.push('/login');
            }
            setUserEmail(data?.user?.email);
            return data;
        };
        const getData = async (userEmail: string) => {
            const { data, error } = await supabase
            .from('users')
            .select('messages')
            .eq('email', userEmail);
            if (error) {
                console.error("データベースの取得エラー:", error);
                redirect('/error');
                return;
            }
            if (!data || data.length === 0) {
                const { error: insertError } = await supabase
                .from('users')
                .insert({ email: userEmail, messages: JSON.stringify(['Hello! How are you?']) });
                setMessages(['Hello! How are you?']);

                if (insertError) {
                    console.error("データベースへの挿入エラー:", insertError);
                    redirect('/error');
                }
            }
            
            try {
                const parsedMessages = data && data.length > 0 && data[0].messages
                    ? (typeof data[0].messages === 'string' 
                        ? JSON.parse(data[0].messages)
                        : data[0].messages)
                    : ['Hello! How are you?'];
                setMessages(Array.isArray(parsedMessages) ? parsedMessages : [parsedMessages]);
            } catch (e) {
                console.error('メッセージのパースエラー:', e);
                setMessages(['Hello! How are you?']);
            }
        };

        checkUser().then(userData => {
            if (userData?.user?.email) {
                getData(userData.user.email);
            }
        });
    }, [router]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const addInputMessages = [...messages, input];
        await setMessages(addInputMessages);
        console.log(addInputMessages);
        const reply = await fetch('https://chat-en-app-5044aa6f7d13.herokuapp.com/createResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'postData': addInputMessages }),
        })
        .then((res) => res.json())
        .then((data) => data.response)
        .catch((error) => {
            console.error("Error sending message:", error);
            return "Sorry, I'm not available right now.";
        });

        const addReplyMessages = [...addInputMessages, reply];
        setMessages(addReplyMessages);
        console.log('userEmail:', userEmail);
        const { error } = await supabase
            .from('users')
            .update({ messages: JSON.stringify(addReplyMessages) })
            .eq('email', userEmail);
        if (error) {
            console.error("Error sending message:", error);
            return;
        }
        setInput("");
        setIsLoading(false);
        setIsEmpty(true);
    }
    // useEffect(() => {
    //     const updateWords = async () => {
    //         if (!messages || messages.length === 0) return;

    //         const { data, error } = await supabase.from('users').select('words').eq('email', userEmail);
    //         if (error) {
    //             console.error("Error fetching data:", error);
    //             return;
    //         }
    //         const existingWords = data && data[0] && data[0].words 
    //             ? JSON.parse(data[0].words) 
    //             : [''];
    //         console.log('existingWords', existingWords);
    //         console.log('messages', messages);
    //         console.log(JSON.stringify({ 'postData': messages, 'storedData': existingWords }));
    //         const wordsNew = await fetch('http://127.0.0.1:8000/splitSentence', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ 'postData': messages, 'storedData': existingWords }),
    //         })
    //         .then((res) => res.json())
    //         .then((data) => data.words)
    //         .catch((error) => {
    //             console.error("Error sending message:", error);
    //             return;
    //         });
    //         await supabase
    //             .from('users')
    //             .update({ words: JSON.stringify(wordsNew) })
    //             .eq('email', userEmail);
    //     };
    //     updateWords();
    // }, [messages]);
return (
    <>
    <header className="w-screen h-12 border-b flex items-center justify-between bg-opacity-0">
        <Dialog>
            <DialogTrigger className='text-xs my-auto ml-4 pt-1'>データを消去</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>本当に宜しいですか？</DialogTitle>
                    <DialogDescription>
                        この操作は取り消しできません。
                    </DialogDescription>
                </DialogHeader>
                <Button
                className="ml-auto mr-0 bg-red-600"
                onClick={async () => {
                    // messagesを削除
                    await supabase
                    .from('users')
                    .update({ messages: null })
                    .eq('email', userEmail);
                    // 画面をリロード
                    location.reload();
                }}
                >
                    はい
                </Button>
            </DialogContent>
        </Dialog>
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
                    <p className='text-xs ml-2 mt-2 p-2'>保存された単語数と、ランダムに出題されるテストの結果をもとにスコアが算出さます</p>
                </li>
            </ul>
        </SheetContent>
        </Sheet>
    </header>
    <main className="w-full h-[calc(100vh-124px)]">
    <ScrollArea
    className="h-full w-4/5 lg:w-3/5 mx-auto p-4 mt-2">
    <Contents
    messages={messages || []}
    />
    </ScrollArea>
    </main>
    <form
    onSubmit={handleSendMessage}
    className="fixed bottom-5 h-10 left-0 w-full flex justify-center"
    >
        <Input
        value={input}
        onChange={(e) => {
                setInput(e.target.value);
                setIsEmpty(e.target.value === "");
                }}
        className="w-4/5 lg:w-3/5 ml-auto shadow"
        />
        <button
        type="submit"
        className="ml-4 mr-auto"
        disabled={isLoading || isEmpty}
        >
        <Image
        src={submitIconSrc}
        alt="Icon"
        width={24}
        height={24}
        className=""
        />
        </button>
    </form>
    </>
);
}

interface ContentsProps {
    messages: string[];
}


function Contents({ messages }: ContentsProps) {
    const [userTranslatedMessage, setUserTranslatedMessage] = useState<string>("");
    const [aiTranslatedMessage, setAiTranslatedMessage] = useState<string>("");
    const [isTranslatedUser, setIsTranslatedUser] = useState<boolean>(false);
    const [isTranslatedAi, setIsTranslatedAi] = useState<boolean>(false);
    const handleTranslate = async (message: string, isUser: boolean) => {
        const translatedMessage = await fetch('https://chat-en-app-5044aa6f7d13.herokuapp.com/createTranslation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message }),
        });
        const data = await translatedMessage.json();
        if (isUser) {
            setUserTranslatedMessage(data.translation);
        } else {
            setAiTranslatedMessage(data.translation);
        }
        console.log(`isUser: ${isUser}`);
        console.log(`userTranslatedMessage: ${userTranslatedMessage}`);
        console.log(`aiTranslatedMessage: ${aiTranslatedMessage}`);
        console.log(`data.translation: ${data.translation}`);
        console.log(`isTranslatedUser: ${isTranslatedUser}`);
        console.log(`isTranslatedAi: ${isTranslatedAi}`);
    }
    return (
        <>
        {messages.map((message, index) => (
            // Add key to the outer fragment
            <div key={`message-group-${index}`}>
                <div className={`shadow w-fit max-w-[80%] mt-6 py-1 px-2 rounded-md ${index%2 === 1 ? 'mr-0 ml-auto' : ''} `}>
                    {message}
                </div>
                {index >= messages.length - 2 && (
                    <button
                    onClick={() => {
                        if (index%2 === 1) {
                            setIsTranslatedUser(true);
                        } else {
                            setIsTranslatedAi(true);
                        }
                        handleTranslate(message, index%2==1);
                    }}
                    disabled={index%2 === 1 ? isTranslatedUser : isTranslatedAi}
                    className={`text-xs w-full px-3 text-slate-500 ${index%2 === 1 ? 'text-right' : 'text-left'}`}
                    >
                        {index%2 === 1
                        ? isTranslatedUser ? userTranslatedMessage : '直訳する'
                        : isTranslatedAi ? aiTranslatedMessage : '直訳する'
                        }
                    </button>
                )}
            </div>
        ))}
        </>
    );
}