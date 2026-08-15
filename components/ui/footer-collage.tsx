import Image from "next/image";

export function FooterCollage() {
  return (
    <div aria-hidden className="relative w-full bg-white">
      <Image
        alt=""
        className="h-auto w-full object-cover object-bottom"
        height={280}
        src="/footer-collage.png"
        width={2400}
      />
    </div>
  );
}
