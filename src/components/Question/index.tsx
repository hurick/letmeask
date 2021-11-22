import { ReactElement } from 'react'

import { Like } from '../Icons/Like'
import { Avatar } from '../Avatar'

import styles from './Question.module.sass'

type QuestionProps = {
  content: string
  authorAvatar: string
  authorName: string
}

export const Question = ({ content, authorAvatar, authorName }: QuestionProps): ReactElement => {
  return (
    <li className={styles.Question}>
      <p className={styles.Q__Content}>{content}</p>

      <div className={styles.Q__Footer}>
        <Avatar avatar={authorAvatar} name={authorName} />

        <button className={styles.QF__Like}>
          <span className={styles.QFL__Counter}>21</span>
          <Like stroke="#737380" />
        </button>
      </div>
    </li>
  )
}
