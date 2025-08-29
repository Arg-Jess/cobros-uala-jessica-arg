import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionsProvider } from './context/TransactionsContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <TransactionsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TransactionsProvider>
  </QueryClientProvider>,
)
