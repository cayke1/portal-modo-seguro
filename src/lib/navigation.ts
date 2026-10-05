export type NavLink = { href: string; label: string; description?: string }

/** Links principais do header. */
export const primaryNav: NavLink[] = [
  { href: '/modulos', label: 'Módulos' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/quiz', label: 'Quiz' },
]

/** Agrupados em "Materiais" no header. */
export const materialsNav: NavLink[] = [
  { href: '/cartilha', label: 'Cartilha', description: 'O resumo do curso em PDF' },
  { href: '/live', label: 'Live', description: 'Gravação do encerramento' },
  { href: '/perguntas', label: 'Perguntas', description: 'Dúvidas da comunidade' },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: 'Curso', links: [...primaryNav] },
  { title: 'Materiais', links: materialsNav.map(({ href, label }) => ({ href, label })) },
  {
    title: 'Projeto',
    links: [
      { href: '/sobre', label: 'Sobre a equipe' },
      { href: '/sobre#privacidade', label: 'Privacidade' },
    ],
  },
]
