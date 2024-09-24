import { ChangeLocale } from "@/features";
import { AnimatedText, SocialLinks } from "@/shared/ui";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-auto relative   bg-base2 flex flex-col gap-2   w-full  ">
      <section className="h-16  mr-0  md:pr-10 flex gap-6 items-center md:static fixed bg-base4 z-50 left-0 right-0 top-0  justify-end pt-3 pr-3">
        <Links />
        <SocialLinks />
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <section className="min-h-[100px] md:min-h-[130px] grid-cols-1  before:w-full  before:h-2 md:before:h-5  relative before:z-50 before:absolute before:left-0 before:right-0 before:bg-navbar-texture before:bg-repeat-x before:-bottom-2  md:before:-bottom-5  before:rotate-180 before:fill-base2     md:px-20 px-5  grid mt-14 md:mt-0 md:grid-cols-[100px_1fr]  items-center gap-5">
        <Image
          src={"/logo.svg"}
          height={80}
          width={80}
          alt="Logo"
          className="justify-self-center w-[75px] h-[75px] md:w-[100px] md:h-[100px] "
        />
        <Navbar />
      </section>
    </header>
  );
};
const Links = () => {
  return (
    <div className="text-base2 gap-10  hidden lg:flex">
      <div className="flex gap-4">
        <Phone />
        <a href="tel:+7 /7172/ 21-71-06">+7 /7172/ 21-71-06</a>
      </div>
      <div className="flex gap-4">
        <Mail />
        <a href="email:prof_adilet@mail.ru">prof_adilet@mail.ru</a>
      </div>
      <div className="flex gap-4">
        <MapPin />
        <span>Астана, проспект Абая, 38, офис 401</span>
      </div>
    </div>
  );
};
