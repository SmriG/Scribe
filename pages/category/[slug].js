import React from 'react'
import { PostCard } from '../../components';
import { getCategories, getCategoryPost } from '../../services';

const CategoryPosts = ({posts}) => {
  return (
    <div>
        {posts.map((post)=>{
            <PostCard key={post.id} post={post} />
        })}
    </div>
  )
}

export default CategoryPosts;

export async function getStaticProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    console.log(posts)
    return{
        props:{posts}
    }
}

export async function getStaticPaths(){
    const categories = await getCategories();
    return{
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true
    }
}
