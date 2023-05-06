import React from 'react'

function RelationCard({related_media, media_relationship, index}) {

    console.log(related_media)
    const link = "/" + related_media[0].type.toLowerCase() + "/" + related_media[0].id; //* it's like /anime/11345
    const image = related_media[0].medium_cover_image;
    const type = related_media[0]
    //console.log(image)
  return (
    <div className='relative h-full'>

    </div>
  )
}

export default RelationCard
