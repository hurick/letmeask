import copyImg from '../../assets/images/copy.svg'

import styles from './Code.module.sass'

type CodeProps = {
  code: string
}

export const Code = ({ code }: CodeProps) => {
  return (
    <button
      className={styles.Code}
      onClick={() => navigator.clipboard.writeText(code)}
      title="Copy code to clipboard"
    >
      <div className={styles.C__Image}>
        <img src={copyImg} alt="Duplicated pages" />
      </div>

      <span className={styles.C__Text}>
        { code }
      </span>
    </button>
  )
}
