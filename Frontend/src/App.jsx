import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import ChatWidget from './components/chat/ChatWidget'

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'

  return (
    <>
      {normalizedPath === '/register' ? <RegistrationPage /> : <HomePage />}
      <ChatWidget />
    </>
  )
}
