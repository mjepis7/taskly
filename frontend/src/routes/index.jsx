import { Routes, Route } from 'react-router-dom'
import { Welcome } from '../pages/Welcome'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Tasks } from '../pages/Tasks'
import { Profile } from '../pages/Profile'
import { NewTask } from '../pages/NewTask'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas (exigem login) */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-task"
        element={
          <ProtectedRoute>
            <NewTask />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
