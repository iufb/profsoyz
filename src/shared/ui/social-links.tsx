import { Database, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const links = [
  {
    name: "Base",
    image: <Database className="text-base1" />,
    href: process.env.profbase,
  },

  {
    name: "Instagram",
    image: <Instagram className="text-base1" />,
    href: "https://www.instagram.com",
  },
  {
    name: "Facebook",
    image: <Facebook className="text-base1" />,
    href: "https://www.facebook.com",
  },
  {
    name: "YouTube",
    image: <Youtube className="text-base1" />,
    href: "https://www.youtube.com/channel/UCBahmcthWl_O9zsdiRtsWvA",
  },
];
export const SocialLinks = () => {
  return (
    <ul className="flex gap-4">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href={link.href} target="_blank">
            {link.image}
          </a>
        </li>
      ))}
    </ul>
  );
};
