import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountriesThunk } from '../../features/country/countriesSlice'
import { RootState } from '../../store'

export interface Data {
  name: string
  flag: string
  region: string
  population: number
}

export type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }
  const { countries } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCountriesThunk())
  }, [dispatch])

  if (countries.isLoading) {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">Loading...</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }
  if (countries.error) {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">ERROR</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }

  interface HeadCell {
    disablePadding: boolean
    id: keyof Data
    label: string
    numeric: boolean
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Country',
    },
    {
      id: 'flag',
      numeric: false,
      disablePadding: false,
      label: 'Flag',
    },
    {
      id: 'region',
      numeric: false,
      disablePadding: false,
      label: 'Region',
    },
    {
      id: 'population',
      numeric: true,
      disablePadding: false,
      label: 'Population',
    },
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span">
                  {order === 'desc'
                    ? ': sorted descending'
                    : ': sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
