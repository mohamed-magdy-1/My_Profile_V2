import { useEffect, useState } from "react"
import GlobalApi from "../_utils/GlobalApi"
import './home.css'
import Image from "next/image"


export default function Home() {

    const [data,setData] = useState(null)

    useEffect(()=>{
        try{
            async function HomeFunApi() {
                let res = await GlobalApi.HomeApi()
                setData(res)
            }
            HomeFunApi()
        }catch(err){
            console.log(err)
        }
    },[])

if (!data) {
    return <div>Loading...</div>;
}

  return (
    <div className="home">
        <div className="my-photo">
        <Image 
        className="img-1"
              src={`http://localhost:1337${data?.my_photo?.url}`} 
              alt="Background Image" 
              layout="fill" 
              quality={75} 
              priority  
            />
        <Image 
        className="img-2"
              src={`http://localhost:1337${data?.cover?.url}`} 
              alt="Background Image" 
              layout="fill" 
              quality={75} 
              priority  
            />
        </div>
        <div className="about-my">
            <h1>{data.name}</h1>
            <h3>{data.job}</h3>
            <p>{data.abou_my}</p>
        </div>
    </div>
  )
}
