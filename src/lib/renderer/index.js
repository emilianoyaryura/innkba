import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import styles from './renderer.module.css'
import HintIcon from 'components/atoms/icons/hint'
import WorldIcon from 'components/atoms/icons/world'
import KeyIcon from 'components/atoms/icons/key'
import WarningIcon from 'components/atoms/icons/warning'
import clsx from 'clsx'
import Button from 'components/primitives/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Video from 'components/atoms/video'

const renderBody = (document, size, category, center) => {
  let color
  switch (category) {
    case 'Lifestyle':
      color = '#1A5AFF'
      break
    case 'Arte y Literatura':
      color = '#F9A826'
      break
    case 'Cultura':
      color = '#9733EE'
      break
    case 'Viajes':
      color = '#D84B4B'
      break
    default:
      color = '#1A5AFF'
      break
  }

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <p className={clsx('max-w-2xl', styles.heading)}>{children}</p>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <p className={clsx('max-w-2xl', styles.heading__3)}>{children}</p>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <p className={clsx('max-w-2xl', styles.heading__4)}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p
          className={clsx('max-w-2xl mx-auto', styles.paragraph, {
            'text-center mb-2': center,
            'mb-5': !center
          })}
        >
          {children}
        </p>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={clsx('max-w-2xl', styles.list__item)}>
          <div />
          <p>{children}</p>
        </li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (
          node.data.target.fields.file.contentType === 'video/mp4' ||
          node.data.target.fields.file.contentType === 'video/ogg'
        ) {
          return (
            <video controls className={size ? styles.bigVideo : styles.video}>
              <source
                src={`https:${node.data.target.fields.file.url}`}
                type="video/mp4"
              />
              <source
                src={`https:${node.data.target.fields.file.url}`}
                type="video/ogg"
              />
              Your browser does not support the video tag.
            </video>
          )
        } else {
          return (
            <>
              <img
                className={size ? styles.bigImage : styles.image}
                src={node.data.target.fields.file.url}
                alt={node.data.target.fields.file.title ?? 'imagen'}
              />
              <p className={styles.image__footer}>
                {node.data.target.fields.description ?? ''}
              </p>
            </>
          )
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType?.sys.id === 'callout') {
          return (
            <div
              className={clsx(
                'max-w-2xl mx-auto w-full flex flex-col sm:flex-row p-4 sm:p-6 rounded-lg my-8',
                {
                  'bg-lightYellow': node.data.target.fields.type === 'Hint',
                  'bg-lightRed': node.data.target.fields.type === 'Warning',
                  'bg-lightBlue': node.data.target.fields.type === 'Travel',
                  'bg-lightViolet': node.data.target.fields.type === 'Key'
                }
              )}
            >
              <i>
                {node.data.target.fields.type === 'Hint' ? (
                  <HintIcon />
                ) : node.data.target.fields.type === 'Warning' ? (
                  <WarningIcon />
                ) : node.data.target.fields.type === 'Key' ? (
                  <KeyIcon />
                ) : node.data.target.fields.type === 'Travel' ? (
                  <WorldIcon />
                ) : null}
              </i>
              <p className="text-14 leading-6 mt-3 ml-1 sm:mt-1 sm:ml-4">
                {node.data.target.fields.content}
              </p>
            </div>
          )
        } else if (
          node.data.target.sys.contentType?.sys.id === 'documentQuote'
        ) {
          return (
            <div className="rounded-xl w-full my-8 border border-solid border-gray-400 px-8 pt-10 pb-4 flex flex-col">
              <p className="self-center font-bold mb-3 text-18">
                {node.data.target.fields.title}
              </p>
              <p className={styles.paragraph}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {node.data.target.fields.quote}
                </ReactMarkdown>
              </p>
              <Button
                isExternal
                type="alternative"
                className="self-end -mr-8"
                href={node.data.target.fields.ctaHref}
              >
                {node.data.target.fields.ctaLabel}
              </Button>
            </div>
          )
        } else if (node.data.target.sys.contentType?.sys.id === 'video') {
          return (
            <Video
              src={node.data.target.fields.videoUrl}
              name={node.data.target.fields.name}
              poster={
                node.data.target.fields.poster
                  ? `https:${node.data.target.fields.poster.fields.file.url}`
                  : null
              }
              className={styles.customVideo}
              color={color}
            />
          )
        } else if (node.data.target.sys.contentType?.sys.id === 'postQuote') {
          return (
            <div className={styles.quote}>
              <p className={styles.quote_quote}>
                {node.data.target.fields.quote}
              </p>
              <p className={styles.quote_author}>
                {node.data.target.fields.author}, {node.data.target.fields.year}
              </p>
            </div>
          )
        } else if (node.data.target.sys.contentType?.sys.id === 'spacing') {
          return <div className={styles.spacing}></div>
        } else if (
          node.data.target.sys.contentType?.sys.id === 'horizontalImages'
        ) {
          return (
            <div className={styles.horizontal_images}>
              {node.data.target.fields.images.map((img, idx) => (
                <div key={idx}>
                  <img
                    className={styles.image}
                    src={img.fields.file.url}
                    alt={img.fields.file.title ?? 'imagen'}
                  />
                  <p className={styles.image__footer}>
                    {img.fields.description ?? ''}
                  </p>
                </div>
              ))}
            </div>
          )
        }
      },
      [MARKS.BOLD]: (node, children) => (
        <b className={styles.bold}>{children}</b>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          className={styles.link}
          target="_blank"
          href={node.data.uri}
          rel="noopener"
          aria-label={node.data.uri}
        >
          {children}
        </a>
      )
    }
  }

  return documentToReactComponents(document, options)
}

export { renderBody }
