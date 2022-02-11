import { ReactElement, ReactNode } from 'react'

import { Avatar } from '../Avatar'

import styles from './Question.module.sass'

type QuestionProps = {
  content: string
  authorAvatar: string
  authorName: string
  children?: ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

export const Question = ({
  content,
  authorAvatar,
  authorName,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps): ReactElement => {
  const QUESTION_CLASSES = [
    styles.Question,
    isAnswered && styles.Q__Answered,
    isHighlighted && styles.Q__Highlighted
  ].join(' ')

  return (
    <li className={QUESTION_CLASSES}>
      <p className={styles.Q__Content}>{content}</p>

      <div className={styles.Q__Footer}>
        <Avatar avatar={authorAvatar} name={authorName} />

        <div className={styles.QF__Actions}>
          { children }
        </div>
      </div>
    </li>
  )
}
