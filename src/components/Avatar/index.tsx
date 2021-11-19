import { ReactElement } from 'react'

import styles from './Avatar.module.sass'

type AvatarProps = {
  avatar: string
  name: string
}

export const Avatar = ({ name, avatar }: AvatarProps): ReactElement => {
  return (
    <div className={styles.Avatar}>
      <img className={styles.A__Image} src={avatar} alt={name} />
      <h4 className={styles.A__Name}>{name}</h4>
    </div>
  )
}
