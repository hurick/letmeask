import { Fragment, ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ref, getDatabase, remove, update } from 'firebase/database'

import { useRoom } from '../../../hooks/useRoom'

import { Header } from '../../../components/Header'
import { Question } from '../../../components/Question'

import deleteImg from '../../../assets/images/delete.svg'

import styles from './Admin.module.sass'

const Admin = (): ReactElement => {
  const navigate = useNavigate()
  const params = useParams() as { id: string }

  const { roomTitle, questionsList } = useRoom(params)

  const handleDelete = async (questionId: string): Promise<void> => {
    window.confirm('Are you sure you want to delete this question?')
      && await remove(ref(getDatabase(), `/rooms/${params.id}/questions/${questionId}`))
  }

  const handleEndRoom = async (): Promise<void> => {
    await update(ref(getDatabase(), `/rooms/${params.id}`), {
      closedAt: new Date()
    })

    navigate('/')
  }

  return (
    <Fragment>
      <Header
        roomId={params.id}
        isAdmin
        onEndRoom={handleEndRoom}
      />

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
              >
                <button
                  className={styles.RMQ__Delete}
                  title="Delete this question"
                  onClick={() => handleDelete(question.id)}
                >
                  <img src={deleteImg} alt="Trash can" />
                </button>
              </Question>
            ))
            : <p>No questions yet. Be the first one!</p>
          }
        </ul>
      </main>
    </Fragment>
  )
}

export default Admin
