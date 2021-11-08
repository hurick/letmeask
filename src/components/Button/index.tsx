import { ReactElement, ButtonHTMLAttributes } from 'react'

import styles from './Button.module.sass'

export const Button = ({ type, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  const BUTTON_CLASSES = [
    styles.Button,
    className && className
  ].join(' ')

  return (
    <button
      type={type ?? 'button'}
      className={BUTTON_CLASSES}
      {...rest}
    >
      {children}
    </button>
  )
}
