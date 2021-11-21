import { Fragment, ReactElement } from 'react'

import { useParams } from 'react-router-dom'
import { useRoom } from '../../../hooks/useRoom'

import { Header } from '../../../components/Header'
import { Question } from '../../../components/Question'

import styles from './Admin.module.sass'

const Admin = (): ReactElement => {
  const params = useParams() as { id: string }

  const { roomTitle, questionsList } = useRoom(params)

  return (
    <Fragment>
      <Header roomId={params.id} />

      <main className={styles.R__Main}>
        <h1 className={styles.RM__Heading}>
          <span className={styles.RMH__Title}>{ roomTitle }</span>
          {questionsList?.length > 0 && <span className={styles.RMH__Counter}>
            {questionsList.length} {questionsList.length === 1 ? 'Question' : 'Questions'}
          </span>}
        </h1>

        <ul className={styles.RM__Questions}>
          {questionsList.length > 0
            ? questionsList.map(question => (
              <Question
                key={question.id}
                content={question.content}
                authorAvatar={question.author.avatar}
                authorName={question.author.name}
              />
            ))
            : <p>No questions yet. Be the first one!</p>
          }
        </ul>
      </main>
    </Fragment>
  )
}

export default Admin
