import React from "react";
import styles from "../../styles/Navbar.module.css";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { FaBookOpen, FaUser, FaPlay } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <div className={"navbar bg-base-content  " + styles.nb}>
        <div className="navbar-start text-slate-200 my-auto">
          <a className="btn btn-ghost uppercase tracking-wide text-2xl md:text-3xl ">
            <img src="./avatar/oni_logo.png" alt="" className="w-8 h-8" />
            <span className={"" + styles.title}>Oni</span>List
          </a>
        </div>
        <div className="navbar-center hidden lg:flex text-slate-200">
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
                      <div className={"lg:text-xs mt-2 px-6 " + styles.links}>
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
                      <div className={"lg:text-xs mt-2 px-6 " + styles.links}>
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
              <a className=" text-slate-200 hover:text-slate-400 active:bg-transparent">
                Login
              </a>
            </li>
            <li>
              <a className={"btn normal-case " + styles.sing_up_btn}>Sign Up</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end pr-6">
          <button className="btn btn-ghost btn-circle text-slate-200 hover:text-slate-400">
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar/evangelion.jpeg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-400 "
            >
              <li>
                <span className=" hover:text-slate-600 hover:bg-base-100 active:bg-transparent">
                  <FaUser className="text-lg" />
                  <a className="justify-between">Profile</a>
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
                  <a>Settings</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
