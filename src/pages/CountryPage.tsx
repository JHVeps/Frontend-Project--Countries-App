import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Country } from '../types'
import CountryHeaders from '../components/countryheaders/CountryHeaders'
import BackLink from '../components/links/BackLink'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Typography,
} from '@mui/material'
import { getCountriesThunk } from '../features/country/countriesSlice'

export default function CountryPage() {
  const { country } = useParams<{ country: string }>()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountriesThunk())
  }, [dispatch])

  const countryData = useSelector(
    (state: RootState) =>
      state.countries.items.find((p) => p.name.common === country) as Country
  )

  if (countryData === undefined) {
    return <Typography variant="h4">Loading...</Typography>
  }
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h2">{country}</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <CountryHeaders
              headers={{
                region: 'Region',
                population: 'Population',
                flag: 'Flag',
                capital: 'Capital',
                currencies: 'Currencies',
                languages: 'Languages',
                map: 'Map',
              }}
            />
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {countryData.region}
              </TableCell>
              <TableCell>{countryData.population}</TableCell>
              <TableCell>
                <img
                  style={{ height: 50 }}
                  src={countryData.flags.png}
                  alt="..."
                />
              </TableCell>
              <TableCell>
                {countryData.capital.map((cityName: string) => (
                  <li key={cityName}>{cityName}</li>
                ))}
              </TableCell>
              <TableCell>
                {Object.values(countryData.currencies).map((cur) => (
                  <li key={cur.name}>{cur.name}</li>
                ))}
              </TableCell>
              <TableCell>
                {Object.values(countryData.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </TableCell>
              <TableCell>
                <Tooltip title="link to map">
                  <a
                    style={{ textDecoration: 'none' }}
                    href={countryData.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GoogleMaps
                  </a>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <BackLink />
    </>
  )
}
