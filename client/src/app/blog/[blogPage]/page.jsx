
'use client'

import GlobalApi from '@/app/_utils/GlobalApi'
import Header from '@/app/components/header/header'
import React, { useEffect, useState } from 'react'
import './blogPage.css'
import Link from 'next/link'
import Image from 'next/image'

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { useParams } from 'next/navigation'

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);


export default function BlogPage() {

    let {blogPage} = useParams()

  const [data,setData] = useState(null)

  useEffect(()=>{
      try{
          async function BlogPageFunApi() {
              let res = await GlobalApi.BlogPageApi(blogPage)
              setData(res)
          }
          BlogPageFunApi()
      }catch(err){
          console.log(err)
      }
  },[])



  return (
    <>
        <Header title={data?.title}/>
        <div className='BlogPage'>
            <div className='BlogPage_Top_content'>
                <h1>{data?.title}</h1>


<div className='icons'>
{data?.project?.wap &&(
<Link href={`${data?.project?.wap}`} target='_blank' className='wap'>
  <lord-icon
    src="/icons/globe.json"
    trigger="loop"
    delay="2000"
    style={{width:"30px",height:"30px"}}
  ></lord-icon>
  SEE
</Link>
)}
<Link href={`/blog/allBlogs`} className='blog'>
<lord-icon
    src="/icons/document.json"
    trigger="loop"
    delay="2000"
    style={{width:"30px",height:"30px"}}
  ></lord-icon>
AllBlogs
</Link>
</div>
            </div>
            <div className='BlogPage_Image'>
                {
                data?.cover[0]?.url  &&
                <Image 
                className="img-1"
                        src={`http://localhost:1337${data?.cover[0]?.url}`} 
                        alt="BlogPage Image" 
                        layout="fill" 
                        quality={75} 
                        priority  
                    />
                }

            </div>
            <div className='BlogPage_Content_blog' dangerouslySetInnerHTML={{__html: data?.content}}/>
        </div>
        
    </>

  )
}
