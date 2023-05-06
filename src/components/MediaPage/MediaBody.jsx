import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Common/PageContainer/Container";
import FilterMedia from '@/components/UserList/FilterMedia';
import MediaRelations from './MediaRelations'

/**
 * Get media relationship and related media info
 * @param {*} media_id 
 * @returns Array of relation and medias related
 */
const getMediaRelatedTo = async (media_id) => {
 const response = await fetch(
  process.env.NEXT_PUBLIC_API_ENDPOINT + `${media_id}/relations`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
 );
 return response.json();   
}

//console.log(getMediaRelatedTo(1));

function MediaBody() {
  const router = useRouter();
  const { id } = router.query;
  const [relation, setRelation] = useState([]);

  

  useEffect(() => {
    getMediaRelatedTo(id)
    .then((res) =>  {
      console.log(res)
      setRelation(res)
    })
  },[id]);

  //console.log(relation)
  return (
    <Container>
        <div className='grid lg:grid-cols-5 gap-10 py-6 lg:px-20'>
					<div className=' h-96 bg-neutral'>
           
					
					</div>
					<div className=' col-span-4  grid-cols-6 h-96 bg-neutral'>
						<MediaRelations relation={relation}/>
					</div>
				</div>
    </Container>
  )
}

export default MediaBody
