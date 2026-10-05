import type { Metadata } from 'next'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Sobre',
}

const DISCENTES = [
  'Cayke Daniel Pereira Veras',
  'Eduardo Lopes de Oliveira Torres',
  'Gabryel Dellanne Santiago Araujo',
  'João Pedro Oliveira Barbosa',
  'Lucas Farias',
  'Lucas Yudi Modesto',
  'Matheus Henrique Dreher dos Santos',
]

export default function SobrePage() {
  return (
    <article className={styles.prose}>
      <h1>Sobre o Modo Seguro</h1>
      <p className={styles.intro}>
        O Modo Seguro é um projeto de extensão da disciplina Prática Extensionista I (2026/2), do
        curso de Ciência da Computação.
      </p>

      <h2>Equipe</h2>
      <p>Discentes:</p>
      <ul>
        {DISCENTES.map((nome) => (
          <li key={nome}>{nome}</li>
        ))}
      </ul>
      <p>Docente: Dra. Anna Paula de Sousa Parente Rodrigues.</p>

      <h2 id="privacidade">Privacidade</h2>
      <p>Este site não pede cadastro e não guarda nenhum dado pessoal seu.</p>
      <ul>
        <li>
          <strong>Quiz:</strong> guardamos só as respostas e a pontuação, sem nome, e-mail ou
          qualquer coisa que identifique você.
        </li>
        <li>
          <strong>Checklist:</strong> o que você marca fica salvo apenas no seu navegador. Nada é
          enviado para a gente.
        </li>
        <li>
          <strong>Visitas:</strong> contamos quantas pessoas acessam o site, sem cookies e sem
          identificar ninguém.
        </li>
        <li>
          <strong>Inscrição e questionários:</strong> ficam no Google Forms da equipe, usados só
          para avaliar o minicurso, e são apagados depois da entrega do relatório final.
        </li>
        <li>
          <strong>Vídeos:</strong> só carregam do YouTube quando você clica para assistir.
        </li>
      </ul>
    </article>
  )
}
