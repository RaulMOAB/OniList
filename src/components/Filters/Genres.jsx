import React from 'react'

export default function Genres({value, handle, filter}) {

  const genres = ['Action','Adventure','Comedy','Drama','Ecchi','Fantasy','Horror','Mahou Shoujo','Mecha','Music','Mystery','Psychological','Romance','Sci-Fi','Slice of Life','Sports','Supernatural','Thiller'];

  // const tags = ["4-koma", "Achronological Order", "Afterlife", "Age Gap", "Airsoft", "Aliens", "Alternate Universe", "American Football", "Amnesia", "Anti-Hero", "Archery", "Assassins", "Athletics", "Augmented Reality", "Aviation","Badminton", "Band", "Bar", "Baseball", "Basketball", "Battle Royale", "Biographical", "Bisexual", "Body Swapping", "Boxing", "Bullying", "Calligraphy", "Card Battle", "Cars", "CGI", "Chibi", "Chuunibyou", "Classic Literature", "College", "Coming of Age", "Cosplay", "Crossdressing", "Crossover", "Cultivation", "Cute Girls Doing Cute Things", "Cyberpunk", "Cycling","Dancing", "Delinquents", "Demons", "Development", "Dragons", "Drawing", "Dystopian", "Economics", "Educational", "Ensemble Cast", "Environmental", "Episodic", "Espionage", "Fairy Tale", "Family Life", "Fashion", "Female Protagonist", "Fishing", "Fitness", "Flash", "Food", "Football", "Foreign", "Fugitive", "Full CGI", "Full Colour","Gambling", "Gangs", "Gender Bending", "Gender Neutral", "Ghost", "Gods", "Gore", "Guns", "Gyaru", "Harem", "Henshin", "Hikikomori", "Historical", "Ice Skating", "Idol", "Isekai", "Iyashikei", "Josei", "Kaiju", "Karuta", "Kemonomimi", "Kids", "Love Triangle", "Mafia", "Magic", "Mahjong", "Maids", "Male Protagonist", "Martial Arts", "Memory Manipulation", "Meta", "Military","Monster Girl", "Mopeds", "Motorcycles", "Musical", "Mythology","Nekomimi", "Ninja", "No Dialogue", "Noir", "Nudity", "Otaku Culture", "Outdoor", "Parody", "Philosophy", "Photography", "Pirates", "Poker", "Police", "Politics", "Post-Apocalyptic", "Primarily Adult Cast", "Primarily Female Cast", "Primarily Male Cast", "Puppetry", "Real Robot", "Rehabilitation", "Reincarnation", "Revenge", "Reverse Harem", "Robots", "Rugby", "Rural","Samurai", "Satire", "School", "School Club", "Seinen", "Ships", "Shogi", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slapstick", "Slavery", "Space", "Space Opera", "Steampunk", "Stop Motion", "Super Power", "Super Robot", "Superhero", "Surreal Comedy", "Survival", "Swimming", "Swordplay","Table Tennis", "Tanks", "Teacher", "Tennis", "Terrorism", "Time Manipulation", "Time Skip", "Tragedy", "Trains", "Triads", "Tsundere", "Urban Fantasy", "Vampire", "Video Games", "Virtual World", "Volleyball", "War", "Witch", "Work", "Wrestling", "Writing", "Wuxia", "Yakuza", "Yandere", "Youkai", "Zombie"];

  return (
    <div className='md:w-2/6 lg:w-1/6 w-3/6'>
        <span className='text-accent text-sm font-semibold'>Genres</span>
        <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => handle(event.target.value)} 
                      className='select select-bordered select-sm w-full h-9 focus:outline-none opacity-60 text-accent text-sm bg-neutral'
                    >
                        <option value="">Any</option>
                        {genres.map((item, i) => (
                          <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
          </div>
    </div>
  )
}