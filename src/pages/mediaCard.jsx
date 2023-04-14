export default function MediaCard() {
    
    let img = "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx7-6uh1fPvbgS9t.png"
    let title  = "Witch Hunter ROBIN"
    let gender = "Action, Drama, Mystery, Supernatural"
    let score  = 7.9

    return (
      <>
        <div className="mx-auto relative rounded-lg" style={{backgroundImage: `url('${img}')`,width:"230px",height:"345px"}}>
            <div className="absolute inset-x-0 bottom-0 h-16 text-white backdrop-blur-sm">
                <div className="flex">
                    <p className="text-base mt-2 ms-2 w-4/6">{title}</p>
                    <div className="w-2/6 mt-2 text-center">
                        <i className="fa-solid fa-star" style={{color: "#f5c211"}}></i>
                        <p className="inline-block">{score}</p>
                    </div>
                    
                </div>
                
                <p class="text-xs mt-1 ms-2">{gender}</p>
            </div>
        </div>
      </>
    );
  }