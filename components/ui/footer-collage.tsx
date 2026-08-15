import Image from "next/image";
import { AdminEntry } from "@/components/ui/admin-entry";

export function FooterCollage() {
  return (
    <div aria-hidden className="relative w-full bg-transparent">
      <Image
        alt=""
        className="h-auto w-full object-contain object-bottom"
        height={81}
        src="/footer-collage.png"
        unoptimized
        width={1024}
      />
      <AdminEntry />
    </div>
  );
}
