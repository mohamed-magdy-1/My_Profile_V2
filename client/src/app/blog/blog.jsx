import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import "./blog.css";
import Link from "next/link";
import Image from "next/image";

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);


import { PiPlusBold } from "react-icons/pi";


export default function Blog() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      async function ProjectsFunApi() {
        let res = await GlobalApi.BlogApi();
        setData(res);
      }
      ProjectsFunApi();
    } catch (err) {
      console.log(err);
    }
  }, []);



  return (
    <>
              <Link href={'/blog/allBlogs'} className='more' >
            <div className='plus'>
            <PiPlusBold />
            </div>
      more
      </Link>
        <div className="blog">



{data?.map((item) => (
          <Link key={item.id} className="blog-card" href={`/blog/${item?.slug}`}>
          <div className="blog-img">
            <Image
              className="img-1"
              src={`http://localhost:1337${item?.cover[0]?.url}`}
              alt="Background Image"
              layout="fill"
              quality={75}
              priority
            />
          </div>
          <div className="blog-content">
            <h4 className="blog-date">{item?.project?.old_date}
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
            <h1 className="blog-title">{item?.title}</h1>
            <p className="blog-des" dangerouslySetInnerHTML={{__html: item?.project?.des}}></p>
          </div>
        </Link>
))}
</div>
    </>

  );
}
