import styles from "../../styles/Slug.module.css";
import {GraphQLClient, gql} from 'graphql-request';



const graphcms = new GraphQLClient("API goes here");

const query = gql`
query Post($slug: String!) {
  post(where: {slug: $slug}) {
    id,
    title,
    slug,
    datePublished,
    author{
      id,
      name,
      avatar{
        url
      }
    }
    content{
      html
    }
    coverPhoto{
      id,
      url
    }
  }
}
`;

const slugList = gql`
  {
    posts {
      slug
    }
  }
`

//making the static paths 
export async function getStaticPaths() {
  const { posts } = await graphcms.request(slugList);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

//Fetch slugs for different paths
export async function getStaticProps({params}){
  const slug = params.slug;
  const data = await graphcms.request(query, {slug});
  const post = data.post
  return{
    props: {
      post,
    },
    revalidate: 20,
  }
}

export default function BlogCard({post}) {
  return(
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} className={styles.cover} alt="" />
      <div className={styles.title}>
        <img src={post.author.avatar} alt="" />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>{post.datePublished}</h6>
        </div>
      </div>
      <h2>{post.title}</h2>
      <div> {post.content.html}</div>
    </main>
  )
}