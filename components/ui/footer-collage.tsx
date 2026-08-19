import Image from "next/image";
import { AdminEntry } from "@/components/ui/admin-entry";

/** Bottom collage — PNG transparency preserved. */
export function FooterCollage() {
  return (
    <footer
      aria-hidden
      className="relative z-20 w-full bg-transparent"
      id="site-footer"
    >
      <Image
        alt=""
        className="block h-auto w-full object-contain object-bottom"
        height={81}
        src="/footer-collage.png"
        unoptimized
        width={1024}
      />
      <AdminEntry />
    </footer>
  );
}
