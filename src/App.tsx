import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Root } from './pages/Root'
import { Home } from './pages/Home'
import { SearchPage } from './pages/Search'
import { Details } from './pages/Details'
import { SearchProvider } from './context/SearchContext'

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Root />, children: [
        { path: '/', element: <Home /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/details/:id', element: <Details /> },
      ]
    }
  ])
  return (
    <>
      <main className='container'>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </main>
    </>
  )
}

export default App
