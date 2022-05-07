import { gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query GET_POSTS{
            postsConnection {
                edges {
                  node {
                    author {
                      id
                      name
                      bio
                      photo {
                        url
                      }
                    }
                    createdAt
                    excerpt
                    slug
                    title
                    id
                    featuredImage {
                        url
                    }
                  }
                }
              }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
    const query = gql`
        query GET_POST_DETAILS(){
            posts(
                orderBy: createdAt_ASC
                last:3
             ){
                 title
                 featuredImage{
                     url
                 }
                 createdAt
                 slug
             }

        }
    `
    const result = await request(graphqlAPI, query);
    return result.posts;

};

export const getSimilarPosts = async () => {
    const query = gql`
        query GET_SIMILAR_POSTS($slug: String!, $categories: [String!]){
            posts(
                where:{
                    slug_not: $slug,
                    AND:{ categories_same: {slug_in: $categories } }
                }
                last : 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.posts;

}