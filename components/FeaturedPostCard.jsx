import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedPostCard = ({ post }) => {
    return (
        <div className='relative h-72 mr-3 mb-3' >
            <div className='absolute rounded-lg bg-cover bg-center bg-no-repeat shadow-lg inline-block shadow-md w-full h-72' style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
            <div className='absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-500 to-black w-full h-72' />
            <div className='flex flex-col justify-center items-center absolute w-full h-full p-4' >
                <p className='text-white font-semibold text-center text-shadow text-xs mb-4' >{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <p className='font-semibold text-white text-center text-shadow text-2xl mb-4' >{post.title}</p>
                <div className='flex items-center justify-center w-full absoulte bottom-5' >
                    <Image
                        unoptimized
                        alt={post.author.name}
                        height='30px'
                        width='30px'
                        className='rounded-full align-middle'
                        src={post.author.photo.url}
                    />
                    <p className='ml-2 text-white align-middle inline font-medium text-shadow' >{post.author.name}</p>

                </div>
            </div>
            <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
        </div>
    )
}

export default FeaturedPostCard