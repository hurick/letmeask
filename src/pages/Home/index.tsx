import questionsIllustration from '../../assets/images/questions-illustration.svg'
import applicationLogo from '../../assets/images/logo.svg'
import googleLogo from '../../assets/images/google-logo.svg'

import { Button } from '../../components/Button'

import styles from './Home.module.sass'

export const Home = () => (
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

          {/* @todo: Convert this <button> to a <Button /> component */}
          <button className={styles.ACG__Create}>
            <img
              src={googleLogo}
              alt="Google's logo"
              className={styles.ACGC__Logo}
            />
            Create your room with Google!
          </button>
        </div>

        <p className={styles.AC__Divider}>or join a created room</p>

        <form className={styles.AC__Room}>
          <input
            type="text"
            placeholder="Insert created room number"
            className={styles.ACR__Number}
          />

          <Button type="submit" className={styles.ACR__Join}>
            Join room
          </Button>
        </form>
      </div>
    </main>
  </section>
)