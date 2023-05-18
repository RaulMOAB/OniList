import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";
import Container from "@/components/Common/PageContainer/Container";
import MediaPageCard from "@/components/Card/MediaPageCard";
import ReadMore from './../utils/ReadMore'
import Head from "next/head";

const getStaff = async (id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `staff/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};


function StaffHeader() {

  const router = useRouter();
  const { id } = router.query;
  const [staff, setStaff] = useState({})
  const [job, setJob] = useState("")


  useEffect(() => {
    if (id) {
        getStaff(id)
        .then((res) => {
          console.log(res.person)
          console.log(res.job.job)
          setStaff(res.person);
          setJob(res.job.job ?? '');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  return(
    <>
      <Head>
				<title>{staff.romaji} · OniList</title>
			</Head>
      <div
          className={"hero opacity-80 bg-neutral " + style.banner_character}
      >
        <div className={style.banner_shadow}></div>
      </div>
      <Container>
        <div className="grid grid-cols-6 gap-8 md:grid-flow-col xl:px-52">
          <div className="mx-auto lg:col-span-2 md:col-span-3 col-span-6 -mt-28 z-30 w-fit md:pl-12 xl:pl-0">
            <MediaPageCard img={staff.image_large} />
          </div>
          <div className="md:py-10 lg:col-span-4 md:col-span-3 col-span-6 2xl:-ml-10 md:-ml-6 lg:-ml-0 md:pl-0 pl-5 text-left z-30">
            <h2 className="2xl:text-3xl md:text-xl text-2xl font-bold md:-mt-32 text-accent">{staff.romaji}</h2>
            <h3 className="text-md mt-1 md:mb-12 mb-6 text-accent">{staff.name}</h3>
            {
              staff.age != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Age:</span> {staff.age} 
                </p> : ""
            }
            {
              staff.gender != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Gender:</span> {staff.gender} 
                </p> : ""
            }
            {
              staff.date_of_birth != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Birthday:</span> {staff.date_of_birth} 
                </p> : ""
            }
            {
              staff.date_of_death != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Death:</span> {staff.date_of_death} 
                </p> : ""
            }
            {
              staff.blood_type != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Blood Type:</span> {staff.blood_type} 
                </p> : ""
            }
            {
              staff.years_active != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Years active:</span> {staff.years_active} 
                </p> : ""
            }
            {
              staff.home_town != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Hometown:</span> {staff.home_town} 
                </p> : ""
            }
            {
                job != '' ? <p className="text-sm">
                  <span className="font-semibold text-accent">Job:</span> {job} 
                </p> : ""
            }
            <div className={"mt-3 2xl:text-sm md:text-sm " + style.description}>
            {
              staff.description != null ? <div className="text-sm">
                  <ReadMore>
                    {staff.description}
                  </ReadMore> 
                </div> : ""
            }
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
export default StaffHeader;