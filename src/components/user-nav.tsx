// import { Avatar, AvatarFallback, AvatarImage } from '@/components//ui/avatar'
import { Button } from '@/components//ui/button'
import { signOutUser } from '@/lib/firebase/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components//ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserStore } from '@/lib/stores'
import Avatar from 'react-avatar'

export function UserNav() {
  const router = useRouter()
  let user = useUserStore((state) => state.user)

  const handleLogout = () => {
    signOutUser(() => {
      router.push('/signin')
    })
  }
  return (
    <>
      {' '}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar name={`${user?.email}`} size="30" round={true} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {user && (
              <>
                {' '}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs leading-none text-muted-foreground pt-2">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={() => handleLogout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-5 ">
          <Link href="/signin">
            <Button className="min-w-[80px]">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button className="min-w-[90px]">Sign Up</Button>
          </Link>
        </div>
      )}
    </>
  )
}
