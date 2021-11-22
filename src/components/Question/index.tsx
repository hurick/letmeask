import { ReactElement, ReactNode } from 'react'

import { Avatar } from '../Avatar'

import styles from './Question.module.sass'

type QuestionProps = {
  content: string
  authorAvatar: string
  authorName: string
  children?: ReactNode
}

export const Question = ({ content, authorAvatar, authorName, children }: QuestionProps): ReactElement => {
  return (
    <li className={styles.Question}>
      <p className={styles.Q__Content}>{content}</p>

      <div className={styles.Q__Footer}>
        <Avatar avatar={authorAvatar} name={authorName} />

        { children }
      </div>
    </li>
  )
}
