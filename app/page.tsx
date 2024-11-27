import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

function TabsTop() {
  return (
    <Tabs defaultValue="step1" className="w-[400px] m-auto">
      <TabsList className="flex justify-around w-full">
        <TabsTrigger className="w-[33%]" value="step1">step1</TabsTrigger>
        <TabsTrigger className="w-[33%]" value="step2">step2</TabsTrigger>
        <TabsTrigger className="w-[33%]" value="step3">step3</TabsTrigger>
      </TabsList>
      <TabsContent value="step1">
        <Card>
          <CardHeader>
            <CardTitle>会話をしよう</CardTitle>
            <CardDescription>
            日本語と英語の両方に対応しています。英語で伝えられたらいいなと感じることを自由に会話しましょう。
            下の翻訳するボタンを押すと訳が作成、表示されます。また、音声ボタンでは発音が確認できます。このステップでは最終ゴールをイメージしましょう。
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="step2">
        <Card>
          <CardHeader>
            <CardTitle>理解しよう</CardTitle>
            <CardDescription>
            一通り会話をしたら、会話中の表現について理解を深めましょう。
            単語の意味や例文、文章構造が表示されます。
            最終ゴールは単語のイメージを掴むことです。訳語や文法知識を丸暗記することは非効率な学習です。
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="step3">
        <Card>
          <CardHeader>
            <CardTitle>競い合おう</CardTitle>
            <CardDescription>
            最後に仲間と競い合いましょう。会話で使用した単語の数×テストの正答率があなたのスコアになります。
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="ml-auto mr-0"><Link href={'/chat'}>学習を始める</Link></Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}



export default async function Index() {
  return (
    <>
    <main className="w-screen h-screen flex items-center justify-center p-10">
      <TabsTop />
    </main>
    </>
  );
}
