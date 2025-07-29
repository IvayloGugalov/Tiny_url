import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredContainerProps {
  children: ReactNode
  delay?: number
  staggerChildren?: number
  className?: string
  style?: React.CSSProperties
}

export const StaggeredContainer = ({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = '',
  style = {},
}: StaggeredContainerProps) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}
