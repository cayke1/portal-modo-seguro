import type { ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerProps = {
  children: ReactNode
  size?: 'default' | 'narrow'
}

export function Container({ children, size = 'default' }: ContainerProps) {
  return <div className={`${styles.container} ${styles[size]}`}>{children}</div>
}
