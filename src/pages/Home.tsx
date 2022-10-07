import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Headline from '../components/headline/Headline'
import { Link } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Button,
  Switch,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  TablePagination,
  FormControlLabel,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../components/searchfield/searchfield_components/SearchFieldComponents'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import EnhancedTableHead, {
  Data,
  Order,
} from '../components/tablehead/TableHead'
import { RootState } from '../store'
import { getComparator } from '../utils/utils'

const Home = (props: {
  change:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined
  check: boolean | undefined
}) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { countries, cart } = useSelector((state: RootState) => state)
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = countries.items.map((n) => n.name.common)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - countries.items.length)
      : 0

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="change theme">
              <Switch
                color="default"
                onChange={props.change}
                checked={props.check}
              />
            </Tooltip>
            <Headline
              headline={{
                text: 'Countries',
              }}
            />
            <Tooltip title="Search for a country">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  type="text"
                  placeholder="Search…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Search>
            </Tooltip>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Show cart">
                <IconButton>
                  <Badge badgeContent={cart.total} color="error">
                    <Link
                      style={{ textDecoration: 'none', color: '#FFF' }}
                      to={`/cart`}
                    >
                      <ShoppingCart sx={{ fontSize: 50 }} />
                    </Link>
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={countries.items.length}
              />

              <TableBody>
                {countries.items
                  .filter((country) => {
                    if (text === '') {
                      return country
                    } else if (
                      country.name.common
                        .toLocaleLowerCase()
                        .includes(text.toLocaleLowerCase())
                    ) {
                      return country
                    }
                    return null
                  })
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((country, index) => {
                    const isItemSelected = isSelected(country.flag)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, country.flag)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={country.flag}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Tooltip title="More info on country">
                            <Link
                              style={{ textDecoration: 'none' }}
                              to={`/countries/${country.name.common}`}
                            >
                              {country.name.common}
                            </Link>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <img
                            style={{ height: 50 }}
                            src={country.flags.png}
                            alt="..."
                          />
                        </TableCell>
                        <TableCell>{country.region}</TableCell>
                        <TableCell>{country.population}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Add country to cart">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => dispatch(addToCart(country))}
                            >
                              ADD
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={countries.items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  )
}

export default Home
