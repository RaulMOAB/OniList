import { Html, Head, Main, NextScript } from "next/document";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";



export default function Document() {
	return (
			<Html
				lang='en'>
				<Head>
					<link
						rel='"shortcut icon'
						href='/favicon.ico'
					/>
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
						integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
				</Head>
				<body className='body'>
					<Main />
					<NextScript />
				</body>
			</Html>
	);
}
