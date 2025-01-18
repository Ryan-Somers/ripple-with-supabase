import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function Posts() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-muted">
        <div className="container mx-auto py-8 grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">@johndoe</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2h</div>
              </CardHeader>
              <CardContent className="p-4">
                <p>This is a sample tweet. It can contain text, images, videos, and other media.</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-4">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RepeatIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">Jane Doe</div>
                  <div className="text-xs text-muted-foreground">@janedoe</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">4h</div>
              </CardHeader>
              <CardContent className="p-4">
                <p>This is another sample tweet. It can contain text, images, videos, and other media.</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-4">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RepeatIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">Bob Smith</div>
                  <div className="text-xs text-muted-foreground">@bobsmith</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">6h</div>
              </CardHeader>
              <CardContent className="p-4">
                <p>This is a third sample tweet. It can contain text, images, videos, and other media.</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-4">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RepeatIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">Alice Johnson</div>
                  <div className="text-xs text-muted-foreground">@alicejohnson</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">8h</div>
              </CardHeader>
              <CardContent className="p-4">
                <p>This is a fourth sample tweet. It can contain text, images, videos, and other media.</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-4">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RepeatIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function RepeatIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}


function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}