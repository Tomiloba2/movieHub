import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import { Root } from './pages/Root'
import { Home } from './pages/Home'
import { SearchPage } from './pages/Search'
import { Details } from './pages/Details'
import { Genres } from './pages/Genre'

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Root />, children: [
        { path: '/', element: <Home /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/details/:id', element: <Details /> },
        { path: '/genres/:id', element: <Genres /> }
      ]
    }
  ])
  return (
    <>
      <main className='container'>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
