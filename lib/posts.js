// fs...JavaScriptのファイルを扱う機能をまとめたモジュール
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

// postsディレクトリーを指定
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // postsディレクトリの中のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

  // ID名が返される関数
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map(fileName => {
    return {
      // paramsというキーを持たせる
      params: {
        // ファイル名の拡張子を除いた名前がIDになっている
        id: fileName.replace(/\.md$/, '')

        // id: ["shingeki", "almin"]
      }
    }
  })
}

// export function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Combine the data with the id
//   return {
//     id,
//     ...matterResult.data
//   }
// }

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  // ファイルの中身をutf8で取得
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // foleContentsのなかのメタデータを読み取る
  const matterResult = matter(fileContents)

  // マークダウン記法の中身をHTMLに直す処理
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    const contentHtml = processedContent.toString()

  
  return {
    id,
    contentHtml,
    ...matterResult.data
  }

}

