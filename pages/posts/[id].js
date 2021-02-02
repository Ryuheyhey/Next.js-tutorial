// dynamic rooting

import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
          <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds() 
  return {
    paths,
    // ここで指定されていないpathのページのときの処理
    fallback: false
  }
}

export async function getStaticProps({params}) {
  // joinでparamsのファイル名を連結
  const postData =  await getPostData(params.id)


  // ファイルの中身をオブジェクト型で返す
  return {
    props: {
      postData
    }
  }
}



