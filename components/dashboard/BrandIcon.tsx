import Image from "next/image";

export default function BrandIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Image src="/icon-512x512.png" width={size} height={size} alt="Discipline OS" className={`rounded-[28%] ${className}`} priority />;
}
