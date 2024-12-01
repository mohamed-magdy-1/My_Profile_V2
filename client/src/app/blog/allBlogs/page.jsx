
'use client'

import GlobalApi from '@/app/_utils/GlobalApi'
import Header from '@/app/components/header/header'
import Pagination from '@/app/components/pagination/pagination'
import React, { useEffect, useState } from 'react'
import './allBlogs.css'
import Link from 'next/link'
import Image from 'next/image'

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);


export default function allBlogs() {


  const [data,setData] = useState(null)
  const [pageCount,setPageCount] = useState()
  const [pageIndex,setPageIndex] = useState(1)

  useEffect(()=>{
      try{
          async function AllProjectsFunApi() {
              let res = await GlobalApi.AllBlogsApi(pageIndex)
              setData(res?.data)
              setPageCount(res?.meta.pagination.pageCount)
          }
          AllProjectsFunApi()
      }catch(err){
          console.log(err)
      }
  },[pageIndex])




  return (
    <>
          <Header title={"AllBlogs"}/>
        <div className='allBlogs'>
        {data?.map((item) => (
          <Link key={item.id} className="allBlogs-card" href={`/blog/${item?.slug}`}>
          <div className="allBlogs-img">
            <Image
              className="img-1"
              src={`http://localhost:1337${item?.cover[0]?.url}`}
              alt="Background Image"
              layout="fill"
              quality={75}
              priority
            />
          </div>
          <div className="allBlogs-content">
            <h4 className="allBlogs-date">{item?.project?.old_date}
            <span className="line-2"></span>
            </h4>
            <div className='icons'>
            {item?.project?.wap && (
              <lord-icon
                src="/icons/globe.json"
                trigger="loop"
                delay="2000"
                style={{width:"50px",height:"50px"}}
              ></lord-icon>

          )}
          <lord-icon
                src="/icons/document.json"
                trigger="loop"
                delay="2000"
                style={{width:"50px",height:"50px"}}
              ></lord-icon>

          </div>
            <h1 className="allBlogs-title">{item?.title}</h1>
            <p className="allBlogs-des" dangerouslySetInnerHTML={{__html: item?.project?.des}}></p>
          </div>
        </Link>
))}
        </div>
        <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex}/>
    </>

  )
}
