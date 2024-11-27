'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    console.log("ログインデータ:", data)

    const { data: authData, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.log("ログインエラー:", error)
        redirect('/error')
    }

    if (!authData?.user) {
        console.log("認証エラー: ユーザーデータが見つかりません")
        redirect('/error')
    }

    // Modified database operation to handle existing users
    const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', data.email)
        .single()

    if (!existingUser) {
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                { email: data.email },
            ])

        if (insertError) {
            console.error("データベースへの挿入エラー:", insertError)
            redirect('/error')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    const { error: insertError } = await supabase
        .from('users')
        .insert([
            { email: data.email },
        ])

    if (insertError) {
        console.error("データベースへの挿入エラー:", insertError)
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}