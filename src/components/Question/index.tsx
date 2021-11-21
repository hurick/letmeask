import { ReactElement } from 'react'

import { Avatar } from '../Avatar'

import likeImg from '../../assets/images/like.svg'

import styles from './Question.module.sass'

type QuestionProps = {
  key?: string
  content: string
  authorAvatar: string
  authorName: string
}

export const Question = ({ key, content, authorAvatar, authorName }: QuestionProps): ReactElement => {
  return (
    <li key={key} className={styles.Question}>
      <p className={styles.Q__Content}>{content}</p>

      <div className={styles.Q__Footer}>
        <Avatar avatar={authorAvatar} name={authorName} />
        <button className={styles.QF__Like}>
          <span className={styles.QFL__Counter}>21</span>
          <img src={likeImg} alt="Thumbs up" />
        </button>
      </div>
    </li>
  )
}
