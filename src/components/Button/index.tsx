import { ReactElement, ButtonHTMLAttributes } from 'react'

import styles from './Button.module.sass'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export const Button = ({ type, className, children, isOutlined = false, ...props }: ButtonProps): ReactElement => {
  const BUTTON_CLASSES = [
    styles.Button,
    className && className,
    isOutlined && styles.B__IsOutlined
  ].join(' ')

  return (
    <button
      type={type ?? 'button'}
      className={BUTTON_CLASSES}
      {...props}
    >
      {children}
    </button>
  )
}
