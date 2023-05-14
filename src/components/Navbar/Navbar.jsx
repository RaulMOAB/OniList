/* eslint-disable @next/next/no-img-element */
import {React, useState} from "react";
import styles from "../../styles/Navbar.module.css";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { useContext } from "react";
import { FaBookOpen, FaUser, FaPlay } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import HamMenu from "@/components/Navbar/HamMenu";
import ConfirmModal from "@/components/Modals/ConfirmModal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className={" hidden lg:flex navbar bg-base-100 " + styles.nb}>
        <div className="navbar-start  my-auto">
          <Link
            href={"/"}
            className="btn btn-ghost uppercase text-accent-focus tracking-wide text-2xl md:text-3xl hover:bg-transparent"
          >
            <Image src="/avatar/oni_logo.png" alt="" width={40} height={40} />
            <span className={"" + styles.title}>Oni</span>List
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          {Object.keys(user).length !== 0 ? (
            <div>
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    href={"/home/" + user.username}
                    className=" active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/home/" + user.username + "/animelist"}
                    className=" active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus"
                  >
                    Anime List
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/home/" + user.username + "/mangalist"}
                    className=" active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus"
                  >
                    Manga List
                  </Link>
                </li>
                <li tabIndex={0} className="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Link
                    href={"/search/anime"}
                    className="active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus  h-14"
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
                  </Link>
                  <ul className="p-2 bg-base-200 shadow z-50 " >
                    {isDropdownOpen && (
                    <li>
                      <div
                        className={
                          "text-accent active:bg-transparent hover:bg-transparent  hover:text-accent-focus hover:bg-base-100"
                        }
                      >
                        <div className="text-left">
                          <span className="flex  ">
                            <FaPlay className="my-auto text-accent hover:text-accent-focus " />
                            <Link
                              href={"/search/anime"}
                              className="px-3 text-accent hover:text-accent-focus "
                            >
                              Anime
                            </Link>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/top-100"}
                            >
                              Top 100
                            </Link>
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/trending"}
                            >
                              Trending
                            </Link>
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/trending"}
                            >
                              Top Movies
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>

                    )
                    }

                    <li>
                      <div
                        className={
                          "text-accent hover:bg-base-100 active:bg-transparent hover:bg-transparent  hover:text-accent-focus"
                        }
                      >
                        <div className="text-left">
                          <span className="flex  ">
                            <FaBookOpen className="my-auto text-accent hover:text-accent-focus " />
                            <Link
                              href={"/search/manga"}
                              className="px-3 text-accent hover:text-accent-focus "
                            >
                              Manga
                            </Link>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/top-100"}
                            >
                              Top 100
                            </Link>
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/trending"}
                            >
                              Trending
                            </Link>
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/top-manhwa"}
                            >
                              Top Novels
                            </Link>
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
                <li tabIndex={0} className="">
                  <Link
                    href={"/search/anime"}
                    className="  active:bg-transparent hover:bg-transparent text-accent  hover:text-accent-focus  h-14"
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
                  </Link>
                  <ul className="p-2 bg-base-200 shadow z-50 ">
                    <li>
                      <div
                        className={
                          "text-accent active:bg-transparent hover:bg-transparent  hover:text-accent-focus hover:bg-base-100"
                        }
                      >
                        <div className="text-left">
                          <span className="flex  ">
                            <FaPlay className="my-auto text-accent hover:text-accent-focus " />
                            <Link
                              href={"/search/anime"}
                              className="px-3 text-accent hover:text-accent-focus "
                            >
                              Anime
                            </Link>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/top-100"}
                            >
                              Top 100
                            </Link>
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/trending"}
                            >
                              Trending
                            </Link>
                            <Link
                              className="text-accent hover:text-accent-focus "
                              href={"/search/anime/top-movies"}
                            >
                              Top Movies
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className={
                          "text-accent hover:bg-base-100 active:bg-transparent hover:bg-transparent  hover:text-accent-focus"
                        }
                      >
                        <div className="text-left">
                          <span className="flex  ">
                            <FaBookOpen className="my-auto text-accent hover:text-accent-focus " />
                            <Link
                              href={"/search/manga"}
                              className="px-3 text-accent hover:text-accent-focus "
                            >
                              Manga
                            </Link>
                          </span>
                          <div
                            className={"lg:text-xs mt-2 px-6 " + styles.links}
                          >
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/top-100"}
                            >
                              Top 100
                            </Link>
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/trending"}
                            >
                              Trending
                            </Link>
                            <Link
                              className=" text-accent hover:text-accent-focus "
                              href={"/search/manga/top-manhwa"}
                            >
                              Top Novels
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href={"/login"}
                    className=" text-accent hover:text-accent-focus  active:bg-transparent hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/register"}
                    className={"btn normal-case mt-1 " + styles.sing_up_btn}
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {Object.keys(user).length !== 0 ? (
          <div className="navbar-end pr-6">
            <button className="mr-1">
              <label
                htmlFor="my-modal-5"
                className="btn btn-circle border-0 bg-base-300 hover:bg-base-300 text-accent hover:text-accent-focus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 "
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
            <button className="btn btn-circle border-0 bg-base-300 hover:bg-base-300 text-accent hover:text-accent-focus mr-1">
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

						<div className='dropdown dropdown-bottom dropdown-start group'>
							<div
								className='flex bg-base-300 rounded-full px-2 py-1'
								tabIndex={0}>
								<label className='flex btn btn-circle avatar'>
									<img
										src={
											process.env.NEXT_PUBLIC_RESOURCES_PROFILE +
											"" +
											user.profile_image
										}
										alt='profile image'
										className='flex rounded-full'
										width={35}
										height={35}
									/>
								</label>
								<span className=' inline-block align-middle text-accent hover:text-accent-focus my-auto w-2/3 pl-1 truncate'>
									{user.username}
								</span>
								<button
									className=''
									tabIndex={0}>
									<svg
										className='fill-current text-accent hover:text-accent-focus'
										xmlns='http://www.w3.org/2000/svg'
										width='40'
										height='40'
										viewBox='0 0 24 24'>
										<path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
									</svg>
								</button>
							</div>
							<ul
								tabIndex={0}
								className='menu  menu-compact dropdown-content mt-3 group p-2 shadow bg-base-100  rounded-box w-fit  '>
								<li>
									<Link
										href={"/settings"}
										className='active:bg-transparent'>
										<FaUser className='text-lg text-accent' />
										<span className='  hover:bg-base-100  active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus'>
											Profile
										</span>
									</Link>
								</li>
								<li>
									<Link
										href={"/settings/account"}
										className='active:bg-transparent'>
										<IoSettingsSharp className='text-lg text-accent' />
										<span className='  hover:bg-base-100  active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus'>
											Settings
										</span>
									</Link>
								</li>
								<li>
									<label
										htmlFor='confirm-logout'
										className='active:bg-transparent'>
										<FiLogOut className='text-lg text-accent' />
										<span className='  hover:bg-base-100  active:bg-transparent hover:bg-transparent text-accent hover:text-accent-focus'>
											Log out
										</span>
									</label>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div className='navbar-end pr-6'></div>
				)}
			</div>
			<HamMenu />
			<ConfirmModal
				id={"confirm-logout"}
				header={"Confirm logout"}
				message={"Are you sure you want to logout?"}
				confirm_button_text='Yes, logout'
				action={logout}
			/>
			{/* MODAL*/}
			<input
				type='checkbox'
				id='my-modal-5'
				className='modal-toggle'
			/>
			<label
				htmlFor='my-modal-5'
				className='modal hidden lg:flex -mt-80'>
				<label
					className='modal-box border-0 bg-transparent max-w-2xl shadow-none'
					htmlFor=''>
					<div className='max-w-2xl mx-auto'>
						<form className='flex items-center'>
							<label
								htmlFor='search'
								className='sr-only'>
								Search
							</label>
							<div className='relative w-full'>
								<input
									type='text'
									id='voice-search'
									className='text-accent text-sm rounded-lg block w-full pl-10 p-2.5 bg-base-100'
									placeholder='Search a media...'
									required=''
								/>
								<div className='flex absolute inset-y-0 left-0 items-center px-3 pointer-events-none'>
									<svg
										className='w-5 h-5 text-accent'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
											clipRule='evenodd'
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
