'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// export async function login(formData: FormData) {
//     const supabase = await createClient()
//     const data = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//     }
//     console.log("data:", data)
//     const { data: authData, error } = await supabase.auth.signInWithPassword(data)
//     console.log("error:", error)
//     if (error) {
//         const { error } = await supabase.auth.signUp(data)

//         if (error) {
//             redirect('/error')
//         }
//     }

//     console.log("authData:", authData)

//     revalidatePath('/chat', 'layout')
//     redirect('/chat')
// }

interface SignWithOTPInput {
    email: string;
}

export async function signWithOTP(input: SignWithOTPInput) {
    const supabase = await createClient()
    const fromForm = {
        email: input.email,
    }
    const { data, error } = await supabase.auth.signInWithOtp({
        email: fromForm.email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/chat`,
        },
    })
    if (error) {
        redirect('/error')
    }
    redirect('/confirm')
}

// export async function signup(formData: FormData) {
//     const supabase = await createClient()
//     const data = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//     }

//     const { error } = await supabase.auth.signUp(data)

//     if (error) {
//         redirect('/error')
//     }

//     revalidatePath('/', 'layout')
//     redirect('/')
// }