"use client";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FaTerminal,
  FaServer,
  FaUsers,
  FaRoute,
  FaCubes,
  FaBell,
} from "react-icons/fa6";
import { TbAirTrafficControl } from "react-icons/tb";
import { FaCog } from "react-icons/fa";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children, userInfo }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  let newNav = [];
  let nav = [
    {
      name: "Instances",
      href: "/",
      icon: FaTerminal,
      current: false,
      color: "bg-indigo-600",
    },
    {
      name: "Reverse Proxies",
      href: "/reverse-proxies",
      icon: FaRoute,
      current: false,
      color: "bg-yellow-600",
    },
    {
      name: "Nodes",
      href: "/nodes",
      icon: FaServer,
      current: false,
      color: "bg-green-600",
    },
    {
      name: "Image Servers",
      href: "#",
      icon: FaCubes,
      current: false,
      color: "bg-pink-600",
    },
    {
      name: "Users",
      href: "/users",
      icon: FaUsers,
      current: false,
      color: "bg-blue-600",
    },
    {
      name: "Settings",
      href: "#",
      icon: FaCog,
      current: false,
      color: "bg-gray-600",
    },
  ];
  let validRoles = ["viewer", "operator", "manager"];
  if (
    !validRoles.includes(userInfo.adminRole) &&
    !validRoles.includes(userInfo.usersRole)
  ) {
    nav = nav.filter((item) => item.name != "Users");
  }
  nav.map((item) => {
    if (item.href != "/") {
      item.current = pathname.startsWith(item.href);
    } else if (pathname == "/") {
      item.current = true;
    } else {
      item.current = false;
    }
    newNav.push(item);
  });
  nav = newNav;
  const [navigation, setNavigation] = useState(nav);
  useEffect(() => {
    setNavigation(newNav);
  }, [pathname]);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-14 w-auto"
                        src="https://www.hyeararat.com/img/araratLogo.png"
                        alt="Hye Ararat"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col border-r border-slate-800">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center my-auto border-b border-slate-800">
              <img
                className="h-14 my-auto py-3"
                src="https://hyecompany.com/logo-horizontal.png"
                alt="Hye Ararat"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-slate-850 text-white"
                              : "text-gray-300 hover:bg-slate-850 hover:text-white",
                            "group flex gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 active:scale-95 transition-all"
                          )}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${item.color} p-[6px] rounded-lg hover:animate-wiggle`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <p className="text-xs">© 2024 Hye Hosting LLC.</p>
                  <p className="text-xs">Hye Ararat Yerek (3.0.0-Dev)</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-800 bg-slate-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-4">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form> */}
              <div className="my-auto flex">
                {pathname.split("/").map((item, index) => {
                  if (item != "") {
                    return (
                      <>
                        <Link
                          href={`
                          /${
                            pathname === "/"
                              ? ""
                              : pathname
                                  .split("/")
                                  .slice(1, index + 1)
                                  .join("/")
                          }
                          `}
                          passHref
                        >
                          <p key={item} className="text-blue-400">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </p>
                        </Link>
                        {index < pathname.split("/").length - 1 && (
                          <ChevronRightIcon
                            className="h-4 my-auto mx-1 w-4  text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    );
                  }
                })}
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-4 ml-auto">
                <button
                  type="button"
                  className="-m-2.5  text-gray-400 hover:text-gray-500"
                ></button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={userInfo.image}
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-2 text-sm font-semibold leading-6 text-gray-300"
                        aria-hidden="true"
                      >
                        {userInfo.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-slate-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                focus ? "bg-slate-700" : "",
                                "block px-3 py-1 text-sm leading-6 text-white"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-4">
            <div className="px-4 sm:px-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
