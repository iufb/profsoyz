import { VisitChecker } from "@/features/";
import { getNavbarPages } from "@/shared/api/pages";
import { AnimatedText, Separator } from "@/shared/ui";
import { BreadCrumbs, Header } from "@/widgets";
import { Mail, MapPin, Phone } from "lucide-react";
import { ReactNode } from "react";
const getPages = async (locale: string) => {
  const pages = await getNavbarPages(locale);
  return pages;
};
const HeroSection = ({
  params,
}: {
  params: { slug: string[]; locale: string };
}) => {
  return (
    <div
      className={`${params.slug[0] == "home" ? "left-0 z-0 right-0 before:w-full before:bg-brush-white  before:h-2 md:before:h-5  relative before:z-50 before:absolute before:left-0 before:right-0  before:bg-repeat-x before:-bottom-0  md:before:-bottom-0     " : "hidden"} `}
    >
      <div className=" left-0 right-0 top-0 bottom-0 absolute opacity-25 bg-base2 " />
      <img
        className="-z-20"
        alt="hero-bg"
        src="https://www.itcilo.org/themes/custom/itcilo_theme/dist/images/torino-landscape.jpg"
      />
      <AnimatedText
        className="z-10 max-w-[1200px] md:text-5xl text-xl w-fit -translate-x-1/2 md:-translate-x-0  left-1/2 right-1/2 top-1/2 bottom-1/2 absolute "
        text={[
          "ПРОФСОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ",
          "АСТАНА ҚАЛАСЫНЫҢ БІЛІМ БЕРУ ҚЫЗМЕТКЕРЛЕРІНІҢ КӘСІПОДАҒЫ",
        ]}
      />
    </div>
  );
};
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string[]; locale: string };
}) {
  const pages = await getPages(params.locale);
  return (
    <section className="bg-base4 ">
      <Header />
      <VisitChecker />
      <HeroSection params={params} />
      <main
        className={`max-w-[1400px]  min-h-[100svh] overflow-y-auto mx-auto px-5 xl:px-0   mb-10 ${params.slug[0] == "home" ? "mt-0" : "mt-5 md:mt-20 "} `}
      >
        <BreadCrumbs locale={params.locale} slug={params.slug} pages={pages} />
        <div className="shadow-lg rounded-3xl flex lg:p-10 p-3  flex-col gap-10">
          {children}
        </div>
      </main>
      <footer className="w-full h-auto mt-16  bg-base2 before:w-full before:h-2 md:before:h-5  relative before:absolute before:left-0 before:right-0 before:bg-navbar-texture before:bg-repeat-x before:-top-2  md:before:-top-5 before:text-cyan-500 ">
        <div className=" max-w-[1200px] mx-auto px-10 py-5 ">
          <div className=" flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-3 md:mb-10">
            <div className="flex flex-col gap-4  text-white">
              <h2 className="text-2xl">Наши контакты</h2>
              <div className="flex flex-col gap-3">
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
            </div>
          </div>
          <Separator />
          <span className="text-gray-600 block mt-14">
            ©{new Date().getFullYear()} Все права защищены.
          </span>
        </div>
      </footer>
    </section>
  );
}
