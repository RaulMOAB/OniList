import React from "react";
import styles from "../../styles/Navbar.module.css";
import { FaPlay } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <div className={"navbar bg-base-content " + styles.nb}>
        <div className="navbar-start text-slate-200">
          <div className="dropdown text-slate-200">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-content rounded-box w-52"
            >
              <li tabIndex={0}>
                <a className="justify-between">
                  Browse
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Anime</a>
                  </li>
                  <li>
                    <a>Manga</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Login</a>
              </li>
              <li>
                <a>Sign Up</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">OniList</a>
        </div>
        <div className="navbar-center hidden lg:flex text-slate-200">
          <ul className="menu menu-horizontal px-1">
            <li tabIndex={0}>
              <a className=" text-slate-200 hover:text-slate-400">
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
              <ul className="flex p-2 bg-base-100 text-gray-800">
                <li>
                  <span
                    className={
                      "text-slate-400 hover:text-slate-800 " + styles.media_dp
                    }
                  >
                    <FaPlay />
                    <section>
                      <div className="mx-auto grid grid-cols-1">
                        <a>Anime</a>
                        <div className={"text-xs mt-2 inline-block " + styles.links}>
                          <a href="">item</a>
                          <a href="">item</a>
                          <a href="">item</a>
                        </div>
                      </div>
                    </section>
                  </span>
                </li>
                <li>
                  <span
                    className={
                      "text-slate-400 hover:text-slate-800 " + styles.media_dp
                    }
                  >
                    <FaBookOpen />
                    <a>Manga</a>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <a className=" text-slate-200 hover:text-slate-400">Login</a>
            </li>
            <li>
              <a className={"btn normal-case " + styles.sing_up_btn}>Sign Up</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-content rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
