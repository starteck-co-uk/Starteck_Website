"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { height: 50, width: 50 },
  md: { height: 70, width: 70 },
  lg: { height: 140, width: 140 },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const dims = sizeMap[size];
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/logo/StarTeck_logo_transparent.png"
        alt="StarTeck"
        width={dims.width}
        height={dims.height}
        className="object-contain"
        style={{
          filter: "drop-shadow(0 0 2px rgba(255,255,255,0.15)) drop-shadow(0 0 8px rgba(217,165,92,0.3))",
        }}
        priority
      />
    </Link>
  );
}
