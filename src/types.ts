export type Country = {
  name: {
    common: string
  }
  capital: string[]
  currencies: {
    [key: string]: { name: string }
  }
  languages: {
    [key: string]: string
  }
  flags: {
    png: string
  }
  flag: string
  population: number
  region: string
  maps: {
    googleMaps: string
  }
}

export type HeadlineProps = {
  headline: {
    text: string
  }
}

export type CountryHeadersProps = {
  headers: {
    region: string
    population: string
    flag: string
    capital: string
    currencies: string
    languages: string
    map: string
  }
}
