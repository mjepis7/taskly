import { Navigate } from 'react-router-dom'

// Bloqueia o acesso a páginas privadas quando não há token de sessão,
// redirecionando o usuário para a tela de login.
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}