import { ReactElement } from "react";

import applicationLogo from '../../assets/images/logo.svg'

import { Code } from '../Code'
import { Button } from "../Button"

import styles from './Header.module.sass'

type HeaderProps = {
  roomId: string
  isAdmin?: boolean
}

export const Header = ({ roomId, isAdmin }: HeaderProps): ReactElement => {
  const ACTIONS_CLASES = [
    styles.H__Actions,
    isAdmin && styles.HA__Multiple
  ].join(' ')

  return (
    <header className={styles.Header}>
      <img
        src={applicationLogo}
        alt="Letmeask's logo"
        className={styles.H__Logo}
      />

      <div className={ACTIONS_CLASES}>
        <Code code={roomId} />
        { isAdmin && <Button isOutlined className={styles.HAM__Close}>Encerrar sala</Button> }
      </div>
    </header>
  )
}
