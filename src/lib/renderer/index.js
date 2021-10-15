import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import styles from './renderer.module.css'
import HintIcon from 'components/atoms/icons/hint'
import WorldIcon from 'components/atoms/icons/world'
import KeyIcon from 'components/atoms/icons/key'
import WarningIcon from 'components/atoms/icons/warning'
import clsx from 'clsx'

const renderBody = (document) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <p className={styles.heading}>{children}</p>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <p className={styles.heading__3}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={styles.paragraph}>{children}</p>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={styles.list__item}>
          <div />
          <p>{children}</p>
        </li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <>
          <img
            className={styles.image}
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.file.title ?? 'imagen'}
          />
          <p className={styles.image__footer}>
            {node.data.target.fields.description ?? ''}
          </p>
        </>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === 'callout') {
          return (
            <div
              className={clsx(
                'flex flex-col sm:flex-row p-4 sm:p-6 rounded-lg my-8',
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
