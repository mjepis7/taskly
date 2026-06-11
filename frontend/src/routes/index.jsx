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
      <Route path="/entrar" element={<Login />} />
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/tarefas" element={<Tasks />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/novatarefa" element={<NewTask />} />
    </Routes>
  )
}
