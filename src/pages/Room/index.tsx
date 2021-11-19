import { Fragment, ReactElement, useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { getDatabase, ref, push } from 'firebase/database'

import applicationLogo from '../../assets/images/logo.svg'

import { useAuth } from '../../hooks/useAuth'

import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Code } from '../../components/Code'

import styles from './Room.module.sass'

const Room = (): ReactElement => {
  const { user, signInWithGoogle } = useAuth()
  const params = useParams() as { id: string }

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
          <span className={styles.RMH__Title}>Sala React Q&A</span>
          <span className={styles.RMH__Counter}>4 Questions</span>
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
      </main>
    </Fragment>
  )
}

export default Room
