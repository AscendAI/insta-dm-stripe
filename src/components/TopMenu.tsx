'use client'

import Link from 'next/link'
import Image from 'next/image'

import { UserNav } from './user-nav'

export default function TopMenu() {
  return (
    <div className="w-full py-[12px]">
      <div className="flex h-16 items-center px-4">
        <div className="md:container lg:mx-auto max-sm:w-full flex justify-between items-center  max-sm:mt-5">
          <Link href="https://www.instadm.ai/">
            <div className="flex items-center">
              <Image
                alt="instaDM logo"
                width={48}
                height={51}
                src="/sz-logo.png"
                className="rounded-full mr-[4px]"
              />
              <p className="text-[25px] font-bold tracking-normal max-sm:hidden">
                InstaDM
              </p>
            </div>
          </Link>
          <UserNav />
        </div>
        {/* <UserNav /> */}
      </div>
    </div>
  )
}
