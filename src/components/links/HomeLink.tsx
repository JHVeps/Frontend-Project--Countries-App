import React from 'react'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import Home from '@mui/icons-material/Home'

const HomeLink = () => {
  return (
    <Tooltip title="homepage">
      <Link style={{ textDecoration: 'none', padding: 40 }} to={`/`}>
        <Home color="primary" sx={{ fontSize: 40 }} />
      </Link>
    </Tooltip>
  )
}

export default HomeLink
