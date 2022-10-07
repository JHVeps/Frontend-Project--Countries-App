import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import ReactDOM from 'react-dom'

const WithProvider = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))
