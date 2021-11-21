import { ReactElement } from "react";

import applicationLogo from '../../assets/images/logo.svg'

import { Code } from '../Code'

import styles from './Header.module.sass'

type HeaderProps = {
  roomId: string
}

export const Header = ({ roomId }: HeaderProps): ReactElement => {
  return (
    <header className={styles.Header}>
      <img
        src={applicationLogo}
        alt="Letmeask's logo"
        className={styles.H__Logo}
      />

      <div className={styles.H__Room}>
        <Code code={roomId} />
      </div>
    </header>
  )
}
