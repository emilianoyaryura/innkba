import clsx from 'clsx'
import dynamic from 'next/dynamic'
import s from './video.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { VideoProps } from '../../../ts/models'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const Play = ({
  onClick,
  color = '#F0E708'
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>
  color?: string
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backdropFilter: 'blur(10px)',
        border: `0.6px solid ${color}`
      }}
      className="z-10 scale-75 sm:scale-75 lg:scale-100 rounded-full flex items-center justify-center w-20 h-20 cursor-pointer bg-hslGray transition-all duration-150 lg:hover:scale-105"
    >
      <svg
        width="25"
        height="30"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2"
      >
        <path
          d="M24 13.268C25.3333 14.0378 25.3333 15.9623 24 16.7321L3 28.8564C1.66666 29.6262 -2.20537e-06 28.664 -2.20537e-06 27.1244L-2.20537e-06 2.87564C-2.20537e-06 1.33604 1.66666 0.373793 3 1.14359L24 13.268Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

const Video = ({ src, poster, className, name, color }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div
      className={clsx(
        'rounded overflow-hidden relative flex',
        className,
        s.wrapper
      )}
    >
      {poster && (
        <div
          className={clsx(
            'absolute w-full h-full top-0 left-0 z-10 flex items-center justify-center',
            {
              [s.dissapear]: isPlaying
            }
          )}
        >
          <Image alt={name ?? 'video'} src={poster} layout="fill" />
          <Play onClick={() => setIsPlaying(true)} color={color} />
        </div>
      )}
      {/* @ts-ignore */}
      <ReactPlayer
        url={src}
        width="100%"
        height="100%"
        fileconfig={{ attributes: { poster: poster } }}
        className={s.player}
        playing={isPlaying}
        controls
      />
    </div>
  )
}

export default Video
