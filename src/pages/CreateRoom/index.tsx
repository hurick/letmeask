import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import questionsIllustration from '../../assets/images/questions-illustration.svg'
import applicationLogo from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'

import styles from './CreateRoom.module.sass'

const CreateRoom = (): ReactElement => (
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
        <img
          src={applicationLogo}
          alt="Letmeask's logo"
          className={styles.AC__Letmesak}
        />

        <h2 className={styles.AC__Title}>Create a new room</h2>

        <form className={styles.AC__Room}>
          <input
            type="text"
            placeholder="What's the room name?"
            className={styles.ACR__Name}
          />

          <Button type="submit">
            Create room
          </Button>
        </form>

        <p className={styles.AC__Join}>
          Want to join a existing room? <Link to="/" title="Click here" className={styles.ACJ__Link}>Click here!</Link>
        </p>
      </div>
    </main>
  </section>
)

export default CreateRoom
