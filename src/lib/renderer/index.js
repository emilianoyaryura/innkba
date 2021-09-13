import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import styles from './renderer.module.css'

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
            {node.data.target.fields.title ?? ''}
          </p>
        </>
      ),
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
