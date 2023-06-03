/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";

function scrollToElement(id: string) {
  const element = document.getElementById(id);
  const windowHeight = window.innerHeight;
  if (element) {
    const elementHeight = element.clientHeight;
    const offsetTop = element.offsetTop;
    const scrollPosition = offsetTop - (windowHeight - elementHeight) / 2;
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }
}

interface INavbarProps {
  shouldLinksScroll: boolean;
}

const Navbar = (props: INavbarProps) => {
  const { shouldLinksScroll } = props;

  const router = useRouter();
  const urlPath = router.asPath;

  const [selectedUrlId, setSelectedUrlId] = useState(urlPath.slice(urlPath.lastIndexOf("#") + 1));

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 shadow-lg dark:border-gray-600 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="https://www.kloniecki.vercel.app" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kloniecki</span>
        </a>
        <div className="flex md:order-2">
          <button
            name="Open menu"
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            {navbarLinks.map((link, i) => (
              <NavbarLink
                {...link}
                selectedUrlId={selectedUrlId}
                setSelectedUrlId={setSelectedUrlId}
                shouldLinksScroll={shouldLinksScroll}
                key={i}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

type NavbarLinkProps = {
  name: string;
  scrollId: string;
};

const navbarLinks: NavbarLinkProps[] = [
  {
    name: "Strona główna",
    scrollId: "strona-glowna",
  },
  {
    name: "O mnie",
    scrollId: "o-mnie",
  },
  {
    name: "Usługi",
    scrollId: "uslugi",
  },
  {
    name: "Kontakt",
    scrollId: "kontakt",
  },
];

const NavbarLink = (
  props: NavbarLinkProps & {
    setSelectedUrlId: (selectedId: string) => void;
    selectedUrlId: string;
    shouldLinksScroll: boolean;
  }
) => {
  const router = useRouter();
  const { scrollId, name, setSelectedUrlId, selectedUrlId, shouldLinksScroll } = props;

  return (
    <li>
      <a
        // href={`#${scrollId}`}
        // onClick={async () => {
        //   setSelectedUrlId(scrollId);
        //   shouldLinksScroll ? scrollToElement(scrollId) : void router.push(scrollId);
        // }}
        className={`${
          selectedUrlId === scrollId ? "text-blue-700" : "text-gray-700"
        } block cursor-pointer  rounded py-2 pl-3 pr-4  hover:bg-gray-100   md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent`}
      >
        {name}
      </a>
    </li>
  );
};
