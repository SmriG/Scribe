import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components';
import {getPosts} from '../services';
import FeaturedPost from '../sections/FeaturedPost'
import { Key } from 'react';

export default function Home ({posts}:any){
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>SCRIBE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPost/>
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12' >
      <div className='lg:col-span-8 col-span-1'>
        {posts.map((post: { node: { id: Key | null | undefined; }; })=>(
          <div key={post.node.id} >
            <PostCard post={post.node} />
          </div>
        ))}
      </div>
      <div className='lg:col-span-4 col-span-1' >
        <div className='lg:sticky relative top-8' >
          <PostWidget categories={null} slug={null}/>
          <Categories/>
        </div>
      </div>
    </div>
    </div>

  )
};


export async function getStaticProps(){
  const posts = (await getPosts()) || [];
  return {
    props:{
      posts
    }
  }
}
