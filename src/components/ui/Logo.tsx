"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { height: 110, width: 110, pad: 6 },
  md: { height: 90, width: 90, pad: 12 },
  lg: { height: 140, width: 140, pad: 20 },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const dims = sizeMap[size];
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          padding: dims.pad,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, transparent 75%)",
        }}
      >
        <Image
          src="/images/logo/StarTeck_logo_transparent.png"
          alt="StarTeck - AI Development Company Manchester"
          width={dims.width}
          height={dims.height}
          className="object-contain"
          style={{
            filter:
              "brightness(1.3) drop-shadow(0 0 1px rgba(255,255,255,0.2)) drop-shadow(0 0 6px rgba(217,165,92,0.25))",
          }}
          priority
        />
      </div>
    </Link>
  );
}
