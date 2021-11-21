import { ReactElement, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { getDatabase, ref, get } from 'firebase/database'

import questionsIllustration from '../../assets/images/questions-illustration.svg'
import applicationLogo from '../../assets/images/logo.svg'
import googleLogo from '../../assets/images/google-logo.svg'

import { Button } from '../../components/Button'

import styles from './Login.module.sass'

const Login = (): ReactElement => {
  const navigate = useNavigate()

  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode ] = useState<string>()

  const handleCreateRoom = async (): Promise<void> => {
    !user && await signInWithGoogle()
    navigate('/rooms/create')
  }

  const handleJoinRoom = async (ev: FormEvent): Promise<void> => {
    ev.preventDefault()

    if (roomCode?.trim() === '') { return } else {
      const roomRef = await get(ref(getDatabase(), `rooms/${roomCode}`))

      if (!roomRef.exists()) {
        alert('Room does not exists :(')
        return
      }

      navigate(`/rooms/${roomCode}`)
    }
  }

  return (
    <section className={styles.Home}>
      <aside className={styles.Calling}>
        <img
          src={questionsIllustration}
          alt="Question messages illustration"
          className={styles.C__Illustration}
        />
        <strong className={styles.C__Title}>Create live Q&amp;A rooms</strong>
        <p className={styles.C__Subtitle}>Answer your audience questions in real time!</p>
      </aside>

      <main className={styles.Auth}>
        <div className={styles.A__Content}>
          <div className={styles.AC__Google}>
            <img
              src={applicationLogo}
              alt="Letmeask's logo"
              className={styles.ACG__Letmesak}
            />

            <Button onClick={handleCreateRoom} className={styles.ACG__Create}>
              <img
                src={googleLogo}
                alt="Google's logo"
                className={styles.ACGC__Logo}
              />
              Create your room with Google
            </Button>
          </div>

          <p className={styles.AC__Divider}>or join a created room</p>

          <form className={styles.AC__Room} onSubmit={handleJoinRoom}>
            <input
              autoFocus
              type="text"
              placeholder="Insert created room number"
              className={styles.ACR__Number}
              onChange={ev => setRoomCode(ev.target.value)}
              value={roomCode}
            />

            <Button type="submit">Join room</Button>
          </form>
        </div>
      </main>
    </section>
  )
}

export default Login
