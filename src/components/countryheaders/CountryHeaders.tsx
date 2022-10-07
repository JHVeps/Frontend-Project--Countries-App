import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { CountryHeadersProps } from '../../types'

const CountryHeaders = ({ headers }: CountryHeadersProps) => {
  return (
    <TableRow>
      <TableCell>{headers.region}</TableCell>
      <TableCell>{headers.population}</TableCell>
      <TableCell>{headers.flag}</TableCell>
      <TableCell>{headers.capital}</TableCell>
      <TableCell>{headers.currencies}</TableCell>
      <TableCell>{headers.languages}</TableCell>
      <TableCell>{headers.map}</TableCell>
    </TableRow>
  )
}

export default CountryHeaders
