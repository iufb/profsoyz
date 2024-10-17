import { ChangeLocale } from "@/features";
import { AnimatedText, SocialLinks } from "@/shared/ui";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-auto relative   bg-base2 flex flex-col gap-2 headerBrush   w-full  ">
      <section className="h-16  mr-0  md:pr-11 flex gap-3 lg:gap-6 items-center md:static fixed bg-base4 z-[60] left-0 right-0 top-0  justify-end pt-3 pr-3">
        <Links />
        <SocialLinks />
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <section className=" lg:w-[1200px] mx-auto min-h-52 grid-cols-1    md:px-5   lg:px-20 px-5  grid mt-14 md:mt-0 md:grid-cols-[160px_1fr]  lg:grid-cols-[180px_1fr]  items-center md:gap-5 lg:gap-0 ">
        <Image
          src={"/logo.svg"}
          width={200}
          height={200}
          alt="Logo"
          className="justify-self-center w-[100px] md:w-full  "
        />
        <div className="flex flex-col gap-5">
          <AnimatedText
            className="z-10 text-xl text-base5  md:text-2xl"
            text={[
              "ПРОФСОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ",
              "АСТАНА ҚАЛАСЫНЫҢ БІЛІМ БЕРУ ҚЫЗМЕТКЕРЛЕРІНІҢ КӘСІПОДАҒЫ",
            ]}
          />

          <Navbar />
        </div>
      </section>
    </header>
  );
};
const Links = () => {
  return (
    <div className="text-base1 gap-4  hidden lg:flex">
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
