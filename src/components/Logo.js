import Image from "next/image";

export default function Logo({compact=false}){
  return <Image className="brand-logo" src="/logo.png" width={759} height={244} priority={compact} sizes={compact?"160px":"210px"} alt="PropWealth — Trust, Invest, Grow"/>
}
