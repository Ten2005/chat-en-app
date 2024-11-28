'use client'

import { signWithOTP } from './actions'

import * as React from "react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  

export default function LoginPage() {
  const [isPushed, setIsPushed] = useState(false);
return (
    <div className="flex justify-center items-center h-screen w-screen px-10">
    <Card className='w-full max-w-[350px]'>
      <CardHeader>
        <CardTitle>ログイン・新規登録</CardTitle>
        <CardDescription className='text-xs'>新規登録は認証メールが送信されます</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>
          <div className="flex justify-end mt-6 px-2">
            {/* <Button variant="outline" formAction={signup}>Sign up</Button> */}
            <Button
            className='disabled:opacity-50'
            formAction={isPushed ? undefined : signWithOTP}
            disabled={isPushed}>新規登録・ログイン</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>

)
}