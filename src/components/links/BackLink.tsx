import React from 'react'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BackLink = () => {
  return (
    <Tooltip title="Back to previous page">
      <Link style={{ textDecoration: 'none' }} to={`/`}>
        <ArrowBackIcon color="primary" sx={{ fontSize: 40 }} />
      </Link>
    </Tooltip>
  )
}

export default BackLink
