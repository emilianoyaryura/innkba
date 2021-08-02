import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { posts } from 'hardcodedData'

const HomePage = () => {
  return (
    <PageLayout navProps={{ selected: 'inicio' }}>
      <div>
        <PostGrid
          title="New Blog Posts"
          copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
          posts={posts}
        />
      </div>
    </PageLayout>
  )
}

export default HomePage
