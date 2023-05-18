import {React, useState,useEffect} from "react";
import Container from "@/components/Common/PageContainer/Container";

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
    const [mediaComponents, setMediaComponents] = useState([]);

    useEffect(() => {
        if(search.length >= 2)
        {
            handleClick();
        }
        
    
    },[search]);

    const handleSearchChange = (data) => {
        setSearch(data);
    };

    function emptyFields() {
        if(search == "") 
        {
          return true;
        }
    
        return false;
    }

    // call filtered medias every time variable change
    function handleClick() {
        console.log(search);

        filteredMedia(search)
        .then((res) => {
            if (res.status === "success" && res.media_length > 0) {
                setMediaComponents([]);
                console.log(res.media_length);
                console.log(res.data.data);
                // setShowFiltered(emptyFields());

                const medias = res.data.data;
                medias.forEach((media,index) => {
                    setMediaComponents(mediaComponents => [...mediaComponents, media])
                })
            }
            else{
                setMediaComponents([]);
            }
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
        
    }



    return(
        <>
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
                    
                    
				</label>
			</label>
        </>
    );

}