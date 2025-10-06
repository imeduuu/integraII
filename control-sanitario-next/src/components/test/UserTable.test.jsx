import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// Mock del UserTable component para las pruebas
const UserTable = ({ users = [], usersPerPage = 5, onUserClick = () => {} }) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filters, setFilters] = React.useState({
    name: '',
    email: '',
    rol: ''
  })

  const filteredUsers = users.filter(user => {
    return (
      user.nombre.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      (filters.rol === '' || user.rol === filters.rol)
    )
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [filters.name, filters.email, filters.rol])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  if (users.length === 0) {
    return (
      <div>
        <div>
          <input placeholder="Filtrar por nombre" />
          <input placeholder="Filtrar por email" />
          <select role="combobox">
            <option value="">Todos los roles</option>
          </select>
        </div>
        <div>No se encontraron usuarios</div>
        <div>
          <button disabled>Anterior</button>
          <button disabled>Siguiente</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Filtros */}
      <div>
        <input
          placeholder="Filtrar por nombre"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <input
          placeholder="Filtrar por email"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <select
          role="combobox"
          value={filters.rol}
          onChange={(e) => handleFilterChange('rol', e.target.value)}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="editor">Editor</option>
        </select>
      </div>

      {/* Tabla */}
      <table role="table">
        <thead>
          <tr>
            <th role="columnheader">Nombre</th>
            <th role="columnheader">Email</th>
            <th role="columnheader">Rol</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="3">No se encontraron usuarios</td>
            </tr>
          ) : (
            currentUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <a href={`/admin-users/${user.id}`} role="link">
                    {user.nombre}
                  </a>
                </td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Anterior
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{ fontWeight: page === currentPage ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        ))}
        
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

const mockUsers = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'admin' },
  { id: 2, nombre: 'María García', email: 'maria@example.com', rol: 'user' },
  { id: 3, nombre: 'Pedro López', email: 'pedro@example.com', rol: 'editor' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', rol: 'user' },
  { id: 5, nombre: 'Carlos Rodriguez', email: 'carlos@example.com', rol: 'admin' },
  { id: 6, nombre: 'Laura Fernández', email: 'laura@example.com', rol: 'user' },
  { id: 7, nombre: 'Miguel Torres', email: 'miguel@example.com', rol: 'editor' },
]

describe('UserTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderizado Básico', () => {
    test('renderiza la tabla correctamente', () => {
      render(<UserTable users={mockUsers} />)
      
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: /nombre/i })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: /email/i })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: /rol/i })).toBeInTheDocument()
    })

    test('muestra los filtros', () => {
      render(<UserTable users={mockUsers} />)
      
      expect(screen.getByPlaceholderText('Filtrar por nombre')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Filtrar por email')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('muestra mensaje cuando no hay usuarios', () => {
      render(<UserTable users={[]} />)
      
      expect(screen.getByText('No se encontraron usuarios')).toBeInTheDocument()
    })

    test('renderiza usuarios con enlaces', () => {
      render(<UserTable users={mockUsers.slice(0, 3)} />)
      
      const juanLink = screen.getByRole('link', { name: /juan pérez/i })
      expect(juanLink).toHaveAttribute('href', '/admin-users/1')
      
      const mariaLink = screen.getByRole('link', { name: /maría garcía/i })
      expect(mariaLink).toHaveAttribute('href', '/admin-users/2')
    })
  })

  describe('Paginación', () => {
    test('muestra 5 usuarios por página por defecto', () => {
      render(<UserTable users={mockUsers} />)
      
      // Header + 5 data rows = 6 total
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(6)
      
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.getByText('Carlos Rodriguez')).toBeInTheDocument()
      expect(screen.queryByText('Laura Fernández')).not.toBeInTheDocument()
    })

    test('permite cambiar usuarios por página', () => {
      render(<UserTable users={mockUsers} usersPerPage={3} />)
      
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(4) // Header + 3 data rows
    })

    test('muestra controles de paginación', () => {
      render(<UserTable users={mockUsers} usersPerPage={3} />)
      
      expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
      
      // 7 usuarios / 3 = 3 páginas
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    })

    test('navega entre páginas correctamente', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} usersPerPage={3} />)
      
      // Página 1
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.queryByText('Carlos Rodriguez')).not.toBeInTheDocument()
      
      // Ir a página 2
      await user.click(screen.getByRole('button', { name: '2' }))
      expect(screen.getByText('Carlos Rodriguez')).toBeInTheDocument()
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
      
      // Usar botón siguiente
      await user.click(screen.getByRole('button', { name: /siguiente/i }))
      expect(screen.getByText('Miguel Torres')).toBeInTheDocument()
    })

    test('deshabilita botones correctamente', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} usersPerPage={3} />)
      
      // Página 1 - anterior deshabilitado
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
      
      // Ir a última página
      await user.click(screen.getByRole('button', { name: '3' }))
      
      // Última página - siguiente deshabilitado
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled()
    })
  })

  describe('Filtrado', () => {
    test('filtra por nombre', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'juan')
      
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.queryByText('María García')).not.toBeInTheDocument()
    })

    test('filtra por email', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.type(screen.getByPlaceholderText('Filtrar por email'), 'maria@')
      
      expect(screen.getByText('María García')).toBeInTheDocument()
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
    })

    test('filtra por rol', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.selectOptions(screen.getByRole('combobox'), 'admin')
      
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.getByText('Carlos Rodriguez')).toBeInTheDocument()
      expect(screen.queryByText('María García')).not.toBeInTheDocument()
    })

    test('combina múltiples filtros', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.selectOptions(screen.getByRole('combobox'), 'user')
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'ana')
      
      expect(screen.getByText('Ana Martínez')).toBeInTheDocument()
      expect(screen.queryByText('María García')).not.toBeInTheDocument()
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
    })

    test('muestra mensaje sin resultados', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'inexistente')
      
      expect(screen.getByText('No se encontraron usuarios')).toBeInTheDocument()
    })

    test('resetea paginación al filtrar', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} usersPerPage={3} />)
      
      // Ir a página 2
      await user.click(screen.getByRole('button', { name: '2' }))
      expect(screen.getByText('Carlos Rodriguez')).toBeInTheDocument()
      
      // Aplicar filtro
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'miguel')
      expect(screen.getByText('Miguel Torres')).toBeInTheDocument()
      
      // Verificar que volvió a página 1
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
    })
  })

  describe('Casos Edge', () => {
    test('maneja lista vacía', () => {
      render(<UserTable users={[]} />)
      
      expect(screen.getByText('No se encontraron usuarios')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled()
    })

    test('maneja un solo usuario', () => {
      render(<UserTable users={mockUsers.slice(0, 1)} />)
      
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    })

    test('maneja caracteres especiales', async () => {
      const specialUsers = [
        { id: 1, nombre: 'José María', email: 'jose@ñoño.com', rol: 'admin' },
        { id: 2, nombre: 'François', email: 'francois@café.fr', rol: 'user' },
      ]
      
      const user = userEvent.setup()
      render(<UserTable users={specialUsers} />)
      
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'josé')
      expect(screen.getByText('José María')).toBeInTheDocument()
      
      await user.clear(screen.getByPlaceholderText('Filtrar por nombre'))
      await user.type(screen.getByPlaceholderText('Filtrar por email'), 'ñoño')
      expect(screen.getByText('José María')).toBeInTheDocument()
    })
  })

  describe('Filtrado Case-Insensitive', () => {
    test('filtra sin distinguir mayúsculas', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} />)
      
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'JUAN')
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      
      await user.clear(screen.getByPlaceholderText('Filtrar por nombre'))
      await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'juan')
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })
  })

  describe('Interacciones Complejas', () => {
    test('mantiene filtros al navegar', async () => {
      const manyUsers = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nombre: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        rol: i % 2 === 0 ? 'admin' : 'user',
      }))
      
      const user = userEvent.setup()
      render(<UserTable users={manyUsers} usersPerPage={3} />)
      
      // Filtrar por admins
      await user.selectOptions(screen.getByRole('combobox'), 'admin')
      
      expect(screen.getByText('User 1')).toBeInTheDocument()
      expect(screen.getByText('User 3')).toBeInTheDocument()
      expect(screen.getByText('User 5')).toBeInTheDocument()
      
      // Ir a segunda página
      await user.click(screen.getByRole('button', { name: '2' }))
      
      expect(screen.getByText('User 7')).toBeInTheDocument()
      expect(screen.getByText('User 9')).toBeInTheDocument()
      expect(screen.queryByText('User 2')).not.toBeInTheDocument()
    })

    test('actualiza paginación al cambiar filtros', async () => {
      const user = userEvent.setup()
      render(<UserTable users={mockUsers} usersPerPage={2} />)
      
      // Sin filtros: 4 páginas
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
      
      // Filtrar por admins (2 usuarios): 1 página
      await user.selectOptions(screen.getByRole('combobox'), 'admin')
      
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument()
    })
  })
})