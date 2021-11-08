import styles from './Button.module.sass'

// @todo: accept onClick prop

type ButtonProps = {
  type: 'button' | 'submit' | 'reset',
  className?: string,
  disabled?: boolean,
  children: React.ReactNode
}

export const Button = ({ type, className, disabled, children }: ButtonProps) => (
  <button
    type={type}
    className={`${styles.Button} ${className ?? ''}`}
    disabled={disabled}
  >
    {children}
  </button>
)
