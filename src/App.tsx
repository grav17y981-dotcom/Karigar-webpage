import { useState } from 'react'
import { BrandMark } from './components/BrandMark'
import { FeatureStory, ProblemAndWorkflow } from './components/ProductStory'
import { WorkshopExperience } from './components/WorkshopExperience'
import { LeadForm, type FormMode } from './components/LeadForm'
import { Icon } from './components/Icons'
import { useScrollFlow } from './hooks/useScrollFlow'

const roles = [
  { icon: 'shop' as const, title: 'Owners', text: 'See what is moving, what is low, and what needs attention without chasing details.' },
  { icon: 'clipboard' as const, title: 'Managers', text: 'Keep inventory and appointment parts aligned for a steadier shop day.' },
  { icon: 'user' as const, title: 'Service advisors', text: 'Check availability while scheduling and set more realistic expectations.' },
  { icon: 'tools' as const, title: 'Technicians', text: 'Know what you need and where to find it before leaving the bay.' },
  { icon: 'box' as const, title: 'Parts clerks', text: 'Pick, track, and restock with bin-level clarity.' },
]

const heroBenchFeatures = ['Today\u2019s jobs', 'Parts needed', 'Shelf & bin', 'Shortage risk', 'Restock plan']

function Header({ onDemo }: { onDemo: () => void }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a className="header-brand" href="#top" aria-label="Karigar home" onClick={close}>
        <BrandMark compact light={false} />
      </a>
      <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="Main navigation">
        <a href="#workshop" onClick={close}>Workshop</a>
        <a href="#how-it-works" onClick={close}>How it works</a>
        <a href="#for-shops" onClick={close}>For shops</a>
        <a href="#trust" onClick={close}>Trust</a>
        <a className="button button--ink header-cta" href="#contact" onClick={() => { close(); onDemo() }}>Request a demo</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-scroll-scene" id="top" aria-labelledby="hero-title" data-hero-scroll>
      <div className="hero">
        <div className="hero-content">
          <h1 id="hero-title">Keep every<br />lift moving.</h1>
          <p>Karigar connects today&rsquo;s jobs, shelf counts, storage locations, and restocking in one shop-ready command center.</p>
        </div>
        <div className="hero-art">
          <div className="hero-art-camera">
            <img
              src="/assets/karigar-garage-editorial.png"
              alt="Hand-rendered isometric view of an organized three-bay Karigar workshop"
              fetchPriority="high"
              draggable="false"
            />
            <div className="hero-focus-marker" aria-hidden="true"><span>Workbench + parts staging</span></div>
            <div className="hero-bench-features" aria-hidden="true">
              {heroBenchFeatures.map((feature, index) => <span key={feature} data-feature-index={index}>{feature}</span>)}
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Scroll to inspect the workshop</span>
          <i><b /></i>
        </div>
      </div>
    </section>
  )
}

function BuiltForShops() {
  return (
    <section className="roles-section" id="for-shops" aria-labelledby="roles-title">
      <div className="section-shell" data-scroll-flow>
        <h2 id="roles-title">Built for the way independent shops already work.</h2>
        <ul className="role-list">
          {roles.map((role, index) => (
            <li key={role.title} data-scroll-flow data-flow-index={index}>
              <Icon name={role.icon} />
              <h3>{role.title}</h3>
              <p>{role.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="trust-section" id="trust" aria-labelledby="trust-title">
      <div className="section-shell trust-strip" data-scroll-flow>
        <Icon name="shield" />
        <h2 id="trust-title">Honest limits.</h2>
        <p>Karigar is an early product concept using sample data. Shops must verify part numbers, fitment, availability, and quantities&mdash;and mechanic judgment always comes first.</p>
        <a href="#contact">See what it does <Icon name="arrow" /></a>
      </div>
    </section>
  )
}

function ContactSection({ mode, onModeChange }: { mode: FormMode; onModeChange: (mode: FormMode) => void }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-shell">
        <div className="contact-cta" data-scroll-flow>
          <img src="/assets/karigar-parts-counter-cta.png" alt="" aria-hidden="true" />
          <div className="contact-copy">
            <h2 id="contact-title">Bring calm to the parts counter.</h2>
            <p>Less hunting. Fewer surprises. A better day for every part of your shop.</p>
            <div className="contact-actions">
              <button className="button button--ink" type="button" onClick={() => onModeChange('waitlist')}><Icon name="user" /> Join the waitlist</button>
              <button className="button button--ink" type="button" onClick={() => onModeChange('demo')}><Icon name="calendar" /> Request a demo</button>
            </div>
          </div>
        </div>
        <div className="contact-form-wrap" data-scroll-flow>
          <div className="contact-form-intro">
            <h3>{mode === 'demo' ? 'Request a Karigar walkthrough.' : 'Join the early pilot list.'}</h3>
            <p>This frontend-only prototype validates locally and does not send or store your information.</p>
          </div>
          <LeadForm mode={mode} onModeChange={onModeChange} />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div><BrandMark compact light={false} /><p>Parts. Planning. Peace of mind.</p></div>
        <nav aria-label="Footer navigation"><a href="#workshop">Workshop</a><a href="#how-it-works">How it works</a><a href="#for-shops">For shops</a></nav>
        <nav aria-label="Company navigation"><a href="#trust">Trust & privacy</a><a href="#contact">Join waitlist</a><a href="#contact">Request demo</a></nav>
        <div className="footer-meta"><p>Early product concept</p><p>&copy; {new Date().getFullYear()} Karigar</p></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [mode, setMode] = useState<FormMode>('waitlist')
  useScrollFlow()

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="page-progress" aria-hidden="true"><span /></div>
      <Header onDemo={() => setMode('demo')} />
      <main id="main">
        <Hero />
        <ProblemAndWorkflow />
        <WorkshopExperience />
        <FeatureStory />
        <BuiltForShops />
        <TrustSection />
        <ContactSection mode={mode} onModeChange={setMode} />
      </main>
      <Footer />
    </>
  )
}
