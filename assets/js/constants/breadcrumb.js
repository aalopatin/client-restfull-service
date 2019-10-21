const BASIC_ADMIN = {text: 'Основное', to: '/admin'}

export const ADMIN_COMPANIES = [
  BASIC_ADMIN,
  {text: 'Компании', to: '/admin/companies'}
]

export const ADMIN_COMPANIES_CREATE = [
  BASIC_ADMIN,
  {text: 'Компании', to: '/admin/companies'},
  {text: 'Создание', to: '/admin/companies/create'}
]

export const ADMIN_USERS = [
  BASIC_ADMIN,
  {text: 'Пользователи', to: '/admin/users'}
]

export const ADMIN_PERIODS = [
  BASIC_ADMIN,
  {text: 'Периоды', to: '/admin/periods'}
]

export const ADMIN_PERIODS_CREATE = [
  BASIC_ADMIN,
  {text: 'Периоды', to: '/admin/periods'},
  {text: 'Создание', to: '/admin/periods/create'}
]

export const ADMIN_TYPES_REPORTS = [
  BASIC_ADMIN,
  {text: 'Типы отчетов', to: '/admin/typesreports'}
]

export const ADMIN_TYPES_REPORTS_CREATE = [
  BASIC_ADMIN,
  {text: 'Типы отчетов', to: '/admin/typesreports'},
  {text: 'Создание', to: '/admin/typesreports/create'}
]
