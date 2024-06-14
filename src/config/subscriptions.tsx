import { IoBicycleOutline } from 'react-icons/io5'
import { PiCarProfile } from 'react-icons/pi'
import { SiStarship } from 'react-icons/si'
import { FaMotorcycle } from 'react-icons/fa6'
import { FaCarAlt } from 'react-icons/fa'
import { GiFallingStar } from 'react-icons/gi'
import Image from 'next/image'
import { BiLabel } from 'react-icons/bi'
export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  lead: string
  support: string
  browser: string
  stripePriceId: string
  price: number
  yearlyPrice: number
  icon: any
  yearlyIcon: any
}

export const storeSubscriptionPlansMonthly: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: '10 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Single Browser',
    stripePriceId: 'dd',
    price: 0,
    yearlyPrice: 0,
    // icon: <Image src={'/free.svg'} alt={'free'} width={50} height={50}/>,
    icon: <BiLabel />,
    yearlyIcon: <BiLabel />,
  },
  {
    id: 'starter',
    name: 'Starter',
    description: '75 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Single Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER ?? '',
    price: 39,
    yearlyPrice: 29,
    icon: <IoBicycleOutline />,
    yearlyIcon: <FaMotorcycle />,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: '375 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Dual Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO ?? '',
    price: 79,
    yearlyPrice: 59,
    icon: <PiCarProfile />,
    yearlyIcon: <FaCarAlt />,
  },
  {
    id: 'star',
    name: 'Enterprise',
    description: 'Unlimited DMS Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Priority Support',
    browser: 'Dual Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STAR ?? '',
    price: 159,
    yearlyPrice: 129,
    icon: <SiStarship />,
    yearlyIcon: <GiFallingStar />,
  },
  // {
  //   id: "test",
  //   name: "Stripe Test",
  //   description:
  //   "Unlimited DMS Daily (Test)",
  //   lead:"Automated Lead Generation (Test)",
  //   support: "24/7 Priority Support (Test)",
  //   browser:"Dual Browser (Test)",
  //   stripePriceId: process.env.NEXT_PUBLIC_STRIPE_TEST_PRODUCT ?? "",
  //   price: 1,
  //   yearlyPrice: 1,
  //   icon:<SiStarship />,
  //   yearlyIcon: <GiFallingStar />

  // },
]
export const storeSubscriptionPlansYearly: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: '10 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Single Browser',
    stripePriceId: 'dd',
    price: 0,
    yearlyPrice: 0,
    // icon: <Image src={'/free.svg'} alt={'free'} width={50} height={50}/>,
    icon: <BiLabel />,
    yearlyIcon: <BiLabel />,
  },
  {
    id: 'starter_yearly',
    name: 'Starter',
    description: '75 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Single Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY ?? '',
    price: 39,
    yearlyPrice: 29,
    icon: <IoBicycleOutline />,
    yearlyIcon: <FaMotorcycle />,
  },
  {
    id: 'pro_yearly',
    name: 'Pro',
    description: '375 DMS a Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Support',
    browser: 'Dual Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY ?? '',
    price: 79,
    yearlyPrice: 59,
    icon: <PiCarProfile />,
    yearlyIcon: <FaCarAlt />,
  },
  {
    id: 'star_yearly',
    name: 'Enterprise',
    description: 'Unlimited DMS Daily',
    lead: 'Automated Lead Generation',
    support: '24/7 Priority Support',
    browser: 'Dual Browser',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STAR_YEARLY ?? '',
    price: 159,
    yearlyPrice: 129,
    icon: <SiStarship />,
    yearlyIcon: <GiFallingStar />,
  },
]

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  ...storeSubscriptionPlansMonthly,
  ...storeSubscriptionPlansYearly,
]
