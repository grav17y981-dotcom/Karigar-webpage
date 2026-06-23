import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const root = createRoot(document.getElementById('root')!)
const path = window.location.pathname.replace(/\/$/, '') || '/'

function render(Component: ComponentType) {
  root.render(
    <StrictMode>
      <Component />
    </StrictMode>,
  )
}

if (path === '/' || path === '/demo-redesign') {
  document.documentElement.classList.add('demo-redesign-bootstrap')
  document.body.classList.add('demo-redesign-bootstrap')
  void import('./demo/DemoRedesign').then(({ default: DemoRedesign }) => render(DemoRedesign))
} else {
  render(App)
}
