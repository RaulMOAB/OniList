import React from "react";
import styles from "../../styles/Navbar.module.css";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { useContext } from "react";
import { FaBookOpen, FaUser, FaPlay } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import HamMenu from "@/components/Navbar/HamMenu";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <div className={"hidden lg:flex navbar bg-base-content  " + styles.nb}>
        <div className="navbar-start text-slate-200 my-auto">
          <Link
            href={"/"}
            className="btn btn-ghost uppercase tracking-wide text-2xl md:text-3xl "
          >
            <Image src="/avatar/oni_logo.png" alt="" width={40} height={40} />
            <span className={"" + styles.title}>Oni</span>List
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-slate-200">
          {user ? (
            <div>
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    href={"/home"}
                    className=" text-slate-200 hover:text-slate-400 active:bg-transparent"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/profile"}
                    className=" text-slate-200 hover:text-slate-400 active:bg-transparent"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/anime-list"}
                    className=" text-slate-200 hover:text-slate-400 active:bg-transparent"
                  >
                    Anime List
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/manga-list"}
                    className=" text-slate-200 hover:text-slate-400 active:bg-transparent"
                  >
                    Manga List
                  </Link>
                </li>
                <li tabIndex={0}>
                  <a
                    className=" text-slate-200 hover:text-slate-400 
                active:bg-transparent"
                  >
                    Browse
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul className="px-2 bg-base-100 shadow z-50">
                    <li>
                      <div className={"text-slate-400 " + styles.media_dp}>
                        <div className="text-left">
                          <span className="flex  hover:text-slate-600">
                            <FaPlay className="my-auto" />
                            <a className="px-3">Anime</a>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <a className=" hover:text-slate-600" href="">
                              Top 100
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Trending
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Top Movies
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={"text-slate-400 " + styles.media_dp}>
                        <div className="text-left">
                          <span className="flex  hover:text-slate-600">
                            <FaBookOpen className="my-auto" />
                            <a className="px-3">Manga</a>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <a className=" hover:text-slate-600" href="">
                              Top 100
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Trending
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Top Novels
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="menu menu-horizontal px-1">
                <li tabIndex={0}>
                  <a
                    className=" text-slate-200 hover:text-slate-400 
                active:bg-transparent"
                  >
                    Browse
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul className="px-2 bg-base-100 shadow z-50">
                    <li>
                      <div className={"text-slate-400 " + styles.media_dp}>
                        <div className="text-left">
                          <span className="flex  hover:text-slate-600">
                            <FaPlay className="my-auto" />
                            <a className="px-3">Anime</a>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <a className=" hover:text-slate-600" href="">
                              Top 100
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Trending
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Top Movies
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={"text-slate-400 " + styles.media_dp}>
                        <div className="text-left">
                          <span className="flex  hover:text-slate-600">
                            <FaBookOpen className="my-auto" />
                            <a className="px-3">Manga</a>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <a className=" hover:text-slate-600" href="">
                              Top 100
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Trending
                            </a>
                            <a className=" hover:text-slate-600" href="">
                              Top Novels
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href={"/login"}
                    className=" text-slate-200 hover:text-slate-400 active:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/register"}
                    className={"btn normal-case " + styles.sing_up_btn}
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {user ? (
          <div className="navbar-end pr-6">
            <button className="btn btn-ghost btn-circle text-slate-200 hover:text-slate-400">
              <label htmlFor="my-modal-5" className="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </label>
            </button>
            <button className="btn btn-ghost btn-circle text-slate-200 hover:text-slate-400">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-error indicator-item"></span>
              </div>
            </button>

            <div className="dropdown">
              <div
                className="flex bg-slate-600 rounded-full px-2 py-1"
                tabIndex={0}
              >
                <label className="flex btn btn-circle avatar">
                  <Image
                    src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png"
                    alt="profile image"
                    className="flex rounded-full"
                    width={40}
                    height={40}
                  />
                </label>
                <span className=" inline-block align-middle text-white my-auto w-2/3 pl-1 truncate">
                  {user.username}
                </span>
                <button className="" tabIndex={0}>
                  <svg
                    className="fill-current hover:text-slate-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </button>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-400 "
              >
                <li>
                  <span className=" hover:text-slate-600 hover:bg-base-100 active:bg-transparent">
                    <FaUser className="text-lg" />
                    <Link href={"/profile"} className="justify-between">
                      Profile
                    </Link>
                  </span>
                </li>
                <li>
                  <span className=" hover:text-slate-600 hover:bg-base-100 active:bg-transparent">
                    <IoNotifications className="text-lg" />
                    <a>Notifications</a>
                  </span>
                </li>
                <li>
                  <span className=" hover:text-slate-600 hover:bg-base-100 active:bg-transparent">
                    <IoSettingsSharp className="text-lg" />
                    <Link href={"/settings/"}>Settings</Link>
                  </span>
                </li>
                <li>
                  <span className=" hover:text-slate-600 hover:bg-base-100 active:bg-transparent">
                    <FiLogOut className="text-lg" />
                    <button onClick={() => logout()}>Log out</button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end pr-6"></div>
        )}
      </div>
      <HamMenu />
      {/* MODAL*/}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className="modal hidden lg:flex -mt-80">
        <label
          className="modal-box border-none bg-transparent w-11/12 max-w-5xl"
          htmlFor=""
        >
          <div className="max-w-2xl mx-auto">
            <form className="flex items-center">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  placeholder="Search a media..."
                  required=""
                />
                <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </label>
      </label>
    </>
  );
}
