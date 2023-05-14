import React from 'react'
import { useState, useEffect } from 'react';
export default function NoContent({message}) {
  const ascii_emojis = [
		"(╯°□°）╯︵ ┻━┻",
		"(︶︹︶)",
		"	( º﹃º )",
		"(ÒДÓױ)",
		"(⊙＿⊙')",
		"ᕦ(ò_óˇ)ᕤ",
	];
  const randomIndex = Math.floor(Math.random() * ascii_emojis.length);
  const [emoji, setEmoji] = useState("");
  useEffect(()=>{
    setEmoji(ascii_emojis[randomIndex]);
  },[message])
  return (
		<div className='h-fit text-accent text-center text-2xl p-2'>
			<p>{emoji}</p>
			<i className='text-sm'>{message}</i>
		</div>
	);
}
