import { Fragment, ReactElement, useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { getDatabase, ref, push, remove } from 'firebase/database'

import { useAuth } from '../../../hooks/useAuth'
import { useRoom } from '../../../hooks/useRoom'

import { Question } from '../../../components/Question'
import { Header } from '../../../components/Header'
import { Avatar } from '../../../components/Avatar'
import { Button } from '../../../components/Button'
import { Like } from '../../../components/Icons/Like'

import styles from './Room.module.sass'

const Room = (): ReactElement => {
  const params = useParams() as { id: string }

  const { user, signInWithGoogle } = useAuth()
  const { roomTitle, questionsList } = useRoom(params)

  const [newQuestion, setNewQuestion] = useState<string>('')

  const handleNewQuestion = async (ev: FormEvent): Promise<void> => {
    ev.preventDefault()

    if (newQuestion.trim() === '')
      return

    if (!user)
      throw new Error('You must be logged in')

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await push(ref(getDatabase(), `rooms/${params.id}/questions`), question)

    setNewQuestion('')
  }

  const handleLike = async (questionId: string, likeId: string | undefined): Promise<void> => {
    !user
      ? alert('You need to log in first.')
      : likeId
        ? await remove(ref(getDatabase(), `rooms/${params.id}/questions/${questionId}/likes/${likeId}`))
        : await push(ref(getDatabase(), `rooms/${params.id}/questions/${questionId}/likes`), { authorId: user?.id })
  }

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

        <form className={styles.RM__Form} onSubmit={handleNewQuestion}>
          <textarea
            placeholder="What do you want to ask?"
            className={styles.RMF__Question}
            value={newQuestion}
            onChange={ev => setNewQuestion(ev.target.value)}
          />

          <div className={styles.RMF__Footer}>
            { !user
              ? <p className={styles.RMFF__Cta}>To ask anything, please <button className={styles.RMFFC__Login} onClick={signInWithGoogle}>log in</button>.</p>
              : <Avatar avatar={user.avatar} name={user.name} />
            }

            <Button
              type="submit"
              className={styles.RMFF__Send}
              disabled={!user || newQuestion === ''}
            >
              Send question
            </Button>
          </div>
        </form>

        {questionsList.length > 0 ? questionsList.map(question => (
          <ul className={styles.RM__Questions}>
            <Question
              key={question.id}
              content={question.content}
              authorAvatar={question.author.avatar}
              authorName={question.author.name}
            >

              <button className={styles.RMQ__Like} onClick={() => handleLike(question.id, question.likeId)}>
                { question.likeCount > 0 && <span className={styles.RMQL__Counter}>{question.likeCount}</span> }
                <Like stroke={`${question.likeId ? '#835afd' : '#737380'}`} />
              </button>
            </Question>
          </ul>
        )) : <p className={styles.RMQ__Empty}>No questions yet. Be the first one!</p> }
      </main>
    </Fragment>
  )
}

export default Room
