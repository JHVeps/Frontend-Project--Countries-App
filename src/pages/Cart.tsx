import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { Link } from 'react-router-dom'
import { removeItem } from '../features/cart/cartSlice'
import HomeLink from '../components/links/HomeLink'
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@material-ui/core'

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h2">Cart</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Flag</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.cartItems.map((country) => (
              <TableRow key={country.flag}>
                <TableCell align="right">
                  <Tooltip title="More info on country">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/countries/${country.name.common}`}
                    >
                      {country.name.common}
                    </Link>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <img
                    style={{ height: 50 }}
                    src={country.flags.png}
                    alt="..."
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Remove country from cart">
                    <IconButton>
                      <DeleteIcon
                        sx={{ fontSize: 40 }}
                        color="error"
                        onClick={() => dispatch(removeItem(country.flag))}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <HomeLink />
      </div>
    </>
  )
}

export default Cart
