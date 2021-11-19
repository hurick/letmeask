import { Fragment, ReactElement, useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { getDatabase, ref, push, onValue } from 'firebase/database'

import applicationLogo from '../../assets/images/logo.svg'
import likeImg from '../../assets/images/like.svg'

import { useAuth } from '../../hooks/useAuth'

import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Code } from '../../components/Code'

import styles from './Room.module.sass'

type QuestionListTypes = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}>

const Room = (): ReactElement => {
  const { user, signInWithGoogle } = useAuth()
  const params = useParams() as { id: string }

  const [roomTitle, setRoomTitle] = useState<string>('')
  const [newQuestion, setNewQuestion] = useState<string>('')
  const [questionsList, setQuestionsList] = useState<QuestionListTypes[]>([])

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

  useEffect(() => {
    const roomRef = ref(getDatabase(), `rooms/${params.id}`)

    onValue(roomRef, room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions
      const parsedQuestions = Object.entries(firebaseQuestions ?? []).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered
      }))

      setRoomTitle(databaseRoom.title)
      setQuestionsList(parsedQuestions)
    })
  }, [params.id])

  return (
    <Fragment>
      <header className={styles.R__Header}>
        <img
          src={applicationLogo}
          alt="Letmeask's logo"
          className={styles.RH__Logo}
        />

        <div className={styles.RH__Room}>
          <Code code={params.id} />
        </div>
      </header>

      <main className={styles.R__Main}>
        <h1 className={styles.RM__Heading}>
          <span className={styles.RMH__Title}>{ roomTitle }</span>
          {questionsList?.length > 0 && <span className={styles.RMH__Counter}>
            {questionsList.length} {questionsList.length > 1 ? 'Questions' : 'Question'}
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
            { !user ? (
              <p className={styles.RMFF__Cta}>To ask anything, please <button className={styles.RMFFC__Login} onClick={signInWithGoogle}>log in</button>.</p>
            ) : (
              <Avatar
                avatar={user.avatar}
                name={user.name}
              />
            ) }
            <Button
              type="submit"
              className={styles.RMFF__Send}
              disabled={!user || newQuestion === ''}
            >
              Send question
            </Button>
          </div>
        </form>

        <ul className={styles.RM__Questions}>
          {questionsList.map(question => (
            <li key={question.id} className={styles.RMQ__Question}>
              <p className={styles.RMQQ__Content}>{question.content}</p>

              <div className={styles.RMQQ__Footer}>
                <Avatar avatar={question.author.avatar} name={question.author.name} />
                <button className={styles.RMQQF__Like}>
                  <span className={styles.RMQQFL__Counter}>21</span>
                  <img src={likeImg} alt="Thumbs up" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Fragment>
  )
}

export default Room
