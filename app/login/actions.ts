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

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    // supabaseのデータベースにメールを追加
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