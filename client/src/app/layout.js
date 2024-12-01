import localFont from "next/font/local";
import "./globals.css";

const Orbitron = localFont({
  src: "./fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});



export const metadata = {
  title: "Mohamed Magdy",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

    try{
      
        let res = await fetch("http://localhost:1337/api/background-img?populate=*",{
          headers:{
            Authorization:`Bearer ${process.env.NEXT_TOKEN}`
          }
        })
        const data = await res.json();

        return (
          <html lang="en">
            <body className={`${Orbitron.variable}`} 
            style={{
              backgroundImage: `url(http://localhost:1337/${data?.data.backgroundImg.url})`,
              objectFit:data.data?.object_fit ? "cover" : "none"
              }}>
              {children}
            </body>
          </html>
        );
    
    }catch(err){
      return (
        <html lang="en">
          <body className={`${Orbitron.variable}`} >
            {children}
          </body>
        </html>
      );
    }
}