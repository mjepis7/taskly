import { Routes, Route } from 'react-router-dom'
import { Welcome } from '../pages/Welcome'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Tasks } from '../pages/Tasks'
import { Profile } from '../pages/Profile'
import { NewTask } from '../pages/NewTask'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new-task" element={<NewTask />} />
    </Routes>
  )
}
