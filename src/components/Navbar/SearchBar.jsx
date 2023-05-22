import {React, useState,useEffect} from "react";
import SearchBarCard from "./../Card/SearchBarCard";
import Link from "next/link";

//API Petition
const filteredMedia = async (search) => {
    const body = JSON.stringify({
      search,
    });
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'search/media', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    return response.json();
};

export default function SearchBar() {

    // Filter variables
    const [search, setSearch] = useState('');
    const [showFiltered, setShowFiltered] = useState(true);
    const [mediaComponentsAnime, setMediaComponentsAnime] = useState([]);
    const [mediaComponentsManga, setMediaComponentsManga] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const closeModal = () => {
        setIsChecked(false);
        setIsOpen(false)
    };

    // call filter when search length >= 2
    useEffect(() => {
        if(search.length >= 2)
        {
            handleClick();
        }
    
    },[search]);

    // clean search bar
    useEffect(() => {
        if (!isOpen) {
          setSearch('');
        }
    }, [isOpen]);

    const handleSearchChange = (data) => {
        const formattedValue = capitalizeFirstLetter(data);
        setSearch(formattedValue);
    };

    // Capital letter at the beginning of each word
    const capitalizeFirstLetter = (str) => {
        const words = str.split(" ");
        const capitalizedWords = words.map((word) => {
          const firstLetter = word.charAt(0).toUpperCase();
          const restOfWord = word.slice(1);
          return firstLetter + restOfWord;
        });
        return capitalizedWords.join(" ");
    };

    function emptyFields() {
        if(search == "") 
        {
          return true;
        }
    
        return false;
    }

    // Call filtered medias every time a variable changes
    function handleClick() {

        filteredMedia(search)
        .then((res) => {
            if (res.status === "success" && res.media_length > 0) {
                setMediaComponentsAnime([]);
                setMediaComponentsManga([]);
                setShowFiltered(emptyFields());

                const animes = res.anime.data;
                animes.forEach((media,index) => {
                    setMediaComponentsAnime(mediaComponentsAnime => [...mediaComponentsAnime, media])
                })

                const mangas = res.manga.data;
                mangas.forEach((media,index) => {
                    setMediaComponentsManga(mediaComponentsManga => [...mediaComponentsManga, media])
                })
            }
            else{
                setMediaComponentsAnime([]);
                setMediaComponentsManga([]);
                setShowFiltered(emptyFields());
            }
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
        
    }

    function emptyFields() {
        if(search == "") 
        {
          return true;
        }
    
        return false;
    }



    return(
        <>
            <input
				type='checkbox'
                checked={isChecked} 
                onChange={handleCheckboxChange}
				id='my-modal-5'
				className='modal-toggle'
                onClick={() => setIsOpen(!isOpen)}
			/>
			<label
				htmlFor='my-modal-5'
				className='modal hidden lg:flex -mt-96'>
				<label
					className='modal-box border-0 bg-transparent max-w-3xl shadow-none fixed left-50 right-50 top-0 pt-32'
					htmlFor=''>
					<div className='max-w-3xl mx-auto'>
						<form className='flex items-center'>
							<label
								htmlFor='search'
								className='sr-only'>
								Search
							</label>
							<div className='relative w-full'>
								<input
									type='text'
                                    value={search}
                                    onChange={(event) => handleSearchChange(event.target.value)}
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
                    {/* Aqui va la busqueda */}
                    {showFiltered == false && search.length != 0 ? (
                    <div className="flex text-accent max-w-full">
                        {/* Anime */}
                        {mediaComponentsAnime.length != 0 ? (
                            <div className="w-1/2 mt-10">
                                <p className="text-xs font-semibold text-white pb-2">Anime</p> 
                                <div className="bg-base-100 rounded-t-lg px-4 pb-2">
                                    {mediaComponentsAnime.map((media, index) => {
                                        return <SearchBarCard key={index} media={media} index={index} closeModal={closeModal}/>
                                    })}
                                </div>
                                <div className="bg-base-100 rounded-b-lg text-center text-xs py-1 hover:bg-primary hover:text-white">
                                    <Link href={'/search/anime'} onClick={closeModal}>View all anime</Link>
                                </div>
                            </div>
                            ) : ('')
                        }
                        {mediaComponentsManga.length != 0 ? (
                            <div className="w-1/2 mt-10 ml-3">
                                <p className="text-xs font-semibold text-white pb-2">Manga</p>
                                <div className="bg-base-100 rounded-t-lg px-4 pb-2">
                                    {mediaComponentsManga.map((media, index) => {
                                        return <SearchBarCard key={index} media={media} index={index} closeModal={closeModal}/>
                                    })}
                                </div>
                                <div className="bg-base-100 rounded-b-lg text-center text-xs py-1 hover:bg-primary hover:text-white">
                                    <Link href={'/search/manga'} onClick={closeModal}>View all manga</Link>
                                </div>
                            </div>
                        ) : ('')}
                        {/* Manga */}
                    </div>

                    ) : ('')}
                    
				</label>
			</label>
        </>
    );

}