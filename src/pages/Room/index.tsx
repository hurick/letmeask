import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

import applicationLogo from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'
import { Code } from '../../components/Code'

import styles from './Room.module.sass'

const Room = (): ReactElement => {
  const params = useParams() as { id: string }

  return (
    <section>
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

        <form className={styles.RM__Form}>
          <textarea
            placeholder="What do you want to ask?"
            className={styles.RMF__Question}
          />

          <div className={styles.RMF__Footer}>
            <p className={styles.RMFF__Cta}>To ask anything, please <button className={styles.RMFFC__Login}>log in</button>.</p>
            <Button
              type="submit"
              className={styles.RMFF__Send}
              disabled
            >
              Send question
            </Button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default Room
