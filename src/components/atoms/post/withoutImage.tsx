import Button from 'components/primitives/button'
import { ContentfulPost } from 'ts/models'

const PostWithoutImage = ({ post }: { post: ContentfulPost }) => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-28 leading-normal mb-3 md:max-w-lg">
          {post.title}
        </h1>
        <p className="max-w-md md:max-w-md mb-7 text-16 text-gray-500 font-medium pr-8 md:pr-0">
          {post.copy}
        </p>
      </div>

      <Button href={post.slug} className="max-w-max">
        Seguir Leyendo
      </Button>
    </div>
  )
}

export default PostWithoutImage
