import Button from 'components/primitives/button'
import { PostWithoutImagePreview } from 'ts/models'

const PostWithoutImage = ({ title, copy, link }: PostWithoutImagePreview) => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-28 leading-normal mb-3 md:max-w-md">
          {title}
        </h1>
        <p className="max-w-md md:max-w-sm mb-7 text-16 text-gray-500 font-medium pr-8 md:pr-0">
          {copy}
        </p>
      </div>

      <Button className="max-w-max">{link.label ?? 'Keep Reading'}</Button>
    </div>
  )
}

export default PostWithoutImage
