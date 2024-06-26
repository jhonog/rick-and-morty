import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './api/apolloClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>
)
