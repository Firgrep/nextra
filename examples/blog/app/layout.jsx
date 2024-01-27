/* eslint-env node */
import fs from 'fs/promises'
import path from 'path'
import { Footer, Layout } from 'nextra-theme-blog'
import { collectPageMap } from 'nextra/page-map'

export const metadata = {
  title: 'Blog Example',
  // description: 'Generated by Next.js',
}

export default async function RootLayout({ children }) {
  const rawJs = await collectPageMap({
    dir: path.join(process.cwd(), 'app'),
    route: '/'
  })
  const pageMapPath = path.join(process.cwd(), 'nextra-page-map.mjs')
  await fs.writeFile(pageMapPath, rawJs)
  const { pageMap } = await import('../nextra-page-map.mjs')

  return (
    <html lang="en">
      <body>
        <Layout
          pageOpts={{ frontMatter: {}, pageMap }}
          themeConfig={{
            darkMode: true,
            navs: [
              { url: '/posts', name: 'Posts' },
              { url: '/', name: 'About' }
            ]
          }}
        >
          {children}
          <Footer>
            <abbr
              title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
              style={{ cursor: 'help' }}
            >
              CC BY-NC 4.0
            </abbr>{' '}
            {new Date().getFullYear()} © Shu Ding.
            <a href="/feed.xml" style={{ float: 'right' }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </body>
    </html>
  )
}
