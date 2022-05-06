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
}