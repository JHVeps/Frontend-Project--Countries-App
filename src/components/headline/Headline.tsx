import React from 'react'
import { HeadlineProps } from '../../types'
import Typography from '@mui/material/Typography'

const Headline = ({ headline }: HeadlineProps) => {
  return <Typography variant="h5">{headline.text}</Typography>
}

export default Headline
