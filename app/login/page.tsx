import { login, signup } from './actions'

import * as React from "react"
 
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
return (
    <>
    <Card className="w-[350px] m-auto mt-[30vh]">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <div className="flex justify-between mt-6 px-2">
            <Button variant="outline" formAction={signup}>Sign up</Button>
            <Button formAction={login}>Log in</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </>

)
}