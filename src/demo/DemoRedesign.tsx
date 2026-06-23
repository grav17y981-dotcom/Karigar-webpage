import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import './demo-redesign.css'
import { BrandMark } from '../components/BrandMark'
import { Icon } from '../components/Icons'
import { useDemoCinematicScroll } from './useDemoCinematicScroll'

const navItems = [
  { href: '#problem', label: 'What it solves' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#for-shops', label: 'For shops' },
  { href: '#roadmap', label: 'Roadmap' },
]

const scenes = [
  { id: 'top', label: 'Promise' },
  { id: 'problem', label: 'Connected flow' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'for-shops', label: 'For shops' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'early-access', label: 'Early access' },
] as const

const services = [
  {
    title: 'Appointment planning',
    text: 'Every booked repair becomes a clear list of required parts before the vehicle reaches the bay.',
  },
  {
    title: 'Inventory visibility',
    text: 'Know what is on hand, what is reserved, and what will run short while there is still time to act.',
  },
  {
    title: 'Restocking',
    text: 'Missing parts move into one practical reorder flow instead of living in notes, memory, and phone calls.',
  },
  {
    title: 'Repair readiness',
    text: 'Give the whole team one confident answer: the job is ready, or it is waiting on a specific part.',
  },
]

const connectedRows = [
  'The appointment knows the parts.',
  'Inventory knows the demand.',
  'Missing parts become a reorder.',
  'The team knows what is ready.',
]

const audiences = [
  'Independent repair shops',
  'Auto body shops',
  'Small garage teams',
  'Mechanics who manage parts manually',
  'Shops that lose time because parts are not ready',
]

const phases = [
  { when: 'Now', title: 'Interactive concept', text: 'Explore the parts-ready workflow and help us sharpen the experience.' },
  { when: 'Next', title: 'Shop pilot', text: 'Validate the workflow with a small group of independent repair teams.' },
  { when: 'Later', title: 'Production integrations', text: 'Connect Karigar with the systems and suppliers shops already rely on.' },
]

function DemoSeo() {
  useEffect(() => {
    document.documentElement.classList.add('demo-redesign-document')
    document.body.classList.add('demo-redesign-document')
    document.title = 'Karigar | Auto Repair Inventory & Appointment Planning Software'

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        document.head.appendChild(element)
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value))
    }

    const description = 'Karigar helps auto repair shops plan appointments, track required parts, manage inventory, and prepare repair jobs before vehicles arrive.'
    const isDemoRoute = window.location.pathname.replace(/\/$/, '') === '/demo-redesign'
    const canonicalUrl = isDemoRoute
      ? 'https://karigar-workshop.vercel.app/demo-redesign'
      : 'https://karigar-workshop.vercel.app/'
    const socialImage = new URL('/assets/karigar-workbench-hero.png', window.location.origin).href

    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: isDemoRoute ? 'noindex, nofollow' : 'index, follow' })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: 'Karigar | Parts-ready repair planning' })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: 'Karigar | Parts-ready repair planning' })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImage })

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const structuredData = document.createElement('script')
    structuredData.id = 'karigar-demo-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Karigar',
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description,
      audience: { '@type': 'BusinessAudience', audienceType: 'Independent auto repair shops and body shops' },
    })
    document.getElementById(structuredData.id)?.remove()
    document.head.appendChild(structuredData)

    return () => {
      document.documentElement.classList.remove('demo-redesign-document')
      document.body.classList.remove('demo-redesign-document')
      structuredData.remove()
    }
  }, [])

  return null
}

function Wordmark() {
  return <BrandMark inverted className="demo-wordmark" />
}

function OpeningSequence() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setLeaving(true), 1900)
    const removeTimer = window.setTimeout(() => setVisible(false), 2700)
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={leaving ? 'demo-opening is-leaving' : 'demo-opening'} aria-hidden="true">
      <div className="demo-opening__mark"><Wordmark /></div>
      <div className="demo-opening__line" />
      <span className="demo-opening__word">Plan.</span>
      <span className="demo-opening__word">Prepare.</span>
      <span className="demo-opening__word">Ready.</span>
    </div>
  )
}

function DemoHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="demo-header">
      <a className="demo-header__brand" href="#top" aria-label="Karigar redesign demo home" onClick={() => setOpen(false)}>
        <Wordmark />
      </a>
      <button
        className="demo-menu-button"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="demo-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <nav id="demo-navigation" className={open ? 'is-open' : ''} aria-label="Redesign demo navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="demo-header__cta" href="#early-access" onClick={() => setOpen(false)}>Early access <Icon name="arrow" /></a>
      </nav>
    </header>
  )
}

function SceneProgress({ activeSceneIndex }: { activeSceneIndex: number }) {
  return (
    <aside className="demo-scene-progress" aria-hidden="true">
      <ol>
        {scenes.map((scene, index) => (
          <li key={scene.id} className={index === activeSceneIndex ? 'is-active' : index < activeSceneIndex ? 'is-complete' : ''}>
            <span />
          </li>
        ))}
      </ol>
    </aside>
  )
}

function useHeroDepth(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const tick = () => {
      frame = 0
      currentX += (targetX - currentX) * 0.11
      currentY += (targetY - currentY) * 0.11
      hero.style.setProperty('--hero-x', `${(currentX * 16).toFixed(2)}px`)
      hero.style.setProperty('--hero-y', `${(currentY * 12).toFixed(2)}px`)
      hero.style.setProperty('--hero-copy-x', `${(currentX * -7).toFixed(2)}px`)
      hero.style.setProperty('--hero-copy-y', `${(currentY * -5).toFixed(2)}px`)
      hero.style.setProperty('--hero-tilt-x', `${(currentY * -0.7).toFixed(3)}deg`)
      hero.style.setProperty('--hero-tilt-y', `${(currentX * 0.9).toFixed(3)}deg`)
      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) frame = window.requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2
      targetY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2
      schedule()
    }

    const onPointerLeave = () => {
      targetX = 0
      targetY = 0
      schedule()
    }

    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', onPointerLeave)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [heroRef])
}

function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroDepth(heroRef)

  return (
    <section ref={heroRef} className="demo-scroll-scene demo-cinematic-hero demo-hero" id="top" data-demo-scene="top" aria-labelledby="demo-hero-title">
      <div className="demo-scene__sticky">
        <div className="demo-hero__stage">
          <img className="demo-hero__background" src="/assets/karigar-workbench-hero.png" alt="Empty automotive workbench with organized tools" width="1536" height="864" fetchPriority="high" />
          <div className="demo-hero__grain" />
          <div className="demo-hero__grid" />
          <div className="demo-shell demo-hero__layout">
            <div className="demo-hero__copy">
              <h1 id="demo-hero-title">Never start a repair without the <strong>parts</strong> ready.</h1>
              <p>Karigar connects appointments, inventory, and restocking so every repair can begin with confidence.</p>
            </div>
            <div className="demo-hero__index" aria-hidden="true"><span>Appointments</span><span>Inventory</span><span>Restocking</span><span>Ready</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesStage({ activeService }: { activeService: number }) {
  return (
    <section className="demo-scroll-scene demo-services" id="problem" data-demo-scene="services" data-demo-workflow aria-labelledby="demo-services-title">
      <div className="demo-scene__sticky">
        <div className="demo-services__texture" />
        <div className="demo-shell demo-services__layout">
          <div className="demo-services__intro">
            <h2 id="demo-services-title">One connected <strong>shop flow.</strong></h2>
            <p>{services[activeService].text}</p>
          </div>
          <ol className="demo-services__list">
            {services.map((service, index) => (
              <li key={service.title} className={index === activeService ? 'is-active' : ''} data-demo-workflow-step={index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b aria-hidden="true"><Icon name="arrow" /></b>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="demo-services__images" aria-hidden="true">
          <picture className="demo-services__image demo-services__image--one" data-demo-flow-object data-demo-flow-start="0.02" data-demo-flow-end="0.42" data-demo-flow-travel="850">
            <source media="(max-width: 820px)" srcSet="/assets/demo-redesign/cinematic-parts-shelf-mobile.webp" />
            <img src="/assets/demo-redesign/cinematic-parts-shelf.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
          </picture>
          <picture className="demo-services__image demo-services__image--two" data-demo-flow-object data-demo-flow-start="0.24" data-demo-flow-end="0.68" data-demo-flow-travel="850">
            <source media="(max-width: 820px)" srcSet="/assets/demo-redesign/cinematic-planning-wall-mobile.webp" />
            <img src="/assets/demo-redesign/cinematic-planning-wall.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
          </picture>
          <picture className="demo-services__image demo-services__image--three" data-demo-flow-object data-demo-flow-start="0.5" data-demo-flow-end="0.94" data-demo-flow-travel="950">
            <source media="(max-width: 820px)" srcSet="/assets/demo-redesign/cinematic-parts-cart-mobile.webp" />
            <img src="/assets/demo-redesign/cinematic-parts-cart.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
    </section>
  )
}

function ConnectedStage() {
  const [activeRow, setActiveRow] = useState(1)

  return (
    <section className="demo-connected" id="how-it-works" data-demo-scene="how-it-works" aria-labelledby="demo-connected-title">
      <div className="demo-connected__header demo-shell">
        <h2 id="demo-connected-title">From booking to <strong>bay-ready.</strong></h2>
        <img src="/assets/karigar-parts-editorial.png" alt="Organized brake parts and repair tools in an empty workshop" width="1536" height="1024" loading="lazy" decoding="async" />
      </div>
      <div className="demo-connected__rows">
        {connectedRows.map((row, index) => (
          <button
            className={index === activeRow ? 'is-active' : ''}
            key={row}
            type="button"
            onMouseEnter={() => setActiveRow(index)}
            onPointerEnter={() => setActiveRow(index)}
            onFocus={() => setActiveRow(index)}
            onClick={() => setActiveRow(index)}
          >
            <span>{row}</span><Icon name="arrow" />
          </button>
        ))}
      </div>
    </section>
  )
}

function AudienceStage() {
  return (
    <section className="demo-audience" id="for-shops" data-demo-scene="for-shops" aria-labelledby="demo-audience-title">
      <div className="demo-shell demo-audience__layout">
        <div className="demo-audience__headline">
          <h2 id="demo-audience-title">Built for <strong>independent</strong> repair shops.</h2>
          <figure>
            <img src="/assets/demo-redesign/cinematic-parts-shelf.webp" alt="Organized automotive parts shelf without people" width="1536" height="1024" loading="lazy" decoding="async" />
          </figure>
        </div>
        <ul>
          {audiences.map((audience, index) => (
            <li key={audience}><span>{String(index + 1).padStart(2, '0')}</span><strong>{audience}</strong><Icon name="arrow" /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RoadmapStage() {
  return (
    <section className="demo-scroll-scene demo-roadmap" id="roadmap" data-demo-scene="roadmap" aria-labelledby="demo-roadmap-title">
      <div className="demo-scene__sticky">
        <div className="demo-roadmap__texture" />
        <div className="demo-shell demo-roadmap__layout">
          <h2 id="demo-roadmap-title">Built in the open, <strong>with shops.</strong></h2>
          <p>Karigar is an early product concept. We are validating the workflow with repair teams before building deeper integrations.</p>
          <ol>
            {phases.map((phase, index) => (
              <li key={phase.when} data-demo-flow-object data-demo-flow-start={String(0.1 + index * 0.24)} data-demo-flow-end={String(0.34 + index * 0.24)} data-demo-flow-travel="70">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{phase.when} <strong>{phase.title}</strong></h3>
                <p>{phase.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

type FormValues = { email: string; role: string; message: string }
const emptyForm: FormValues = { email: '', role: '', message: '' }

function EarlyAccess() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!values.email.trim()) next.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.role) next.role = 'Choose the description that fits you best.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      if (next.email) emailRef.current?.focus()
      else roleRef.current?.focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <section className="demo-early-access" id="early-access" data-demo-scene="early-access" aria-labelledby="demo-early-title">
      <div className="demo-shell demo-early-access__layout">
        <div className="demo-early-access__copy">
          <h2 id="demo-early-title">Join <strong>early access.</strong></h2>
          <p>Help shape a parts-ready workflow built for real repair shops.</p>
        </div>
        <div className="demo-early-access__form-wrap">
          {submitted ? (
            <div className="demo-form-success" role="status" tabIndex={-1} ref={successRef}>
              <span><Icon name="check" /></span>
              <h3>Thanks &mdash; your interest has been recorded for this demo.</h3>
              <p>This demo did not send or store your information.</p>
              <button type="button" onClick={() => { setSubmitted(false); setValues(emptyForm) }}>Send another response</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="demo-email">Email</label>
              <input id="demo-email" name="email" type="email" autoComplete="email" placeholder="you@workshop.com" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'demo-email-error' : undefined} ref={emailRef} />
              {errors.email ? <span className="demo-field-error" id="demo-email-error">{errors.email}</span> : null}
              <label htmlFor="demo-role">Role / description</label>
              <select id="demo-role" name="role" value={values.role} onChange={(event) => update('role', event.target.value)} aria-invalid={Boolean(errors.role)} aria-describedby={errors.role ? 'demo-role-error' : undefined} ref={roleRef}>
                <option value="">Select one</option>
                <option>Shop owner</option>
                <option>Mechanic</option>
                <option>Student</option>
                <option>Investor</option>
                <option>Interested visitor</option>
              </select>
              {errors.role ? <span className="demo-field-error" id="demo-role-error">{errors.role}</span> : null}
              <label htmlFor="demo-message">Optional message</label>
              <textarea id="demo-message" name="message" rows={4} maxLength={500} placeholder="Tell us what would make Karigar useful in your shop..." value={values.message} onChange={(event) => update('message', event.target.value)} />
              <button className="demo-form-submit" type="submit">Join Early Access <Icon name="arrow" /></button>
              <p className="demo-form-note"><Icon name="shield" /> Demo only &mdash; this form does not send or store your information.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function DemoFooter() {
  return (
    <footer className="demo-footer">
      <div className="demo-shell demo-footer__layout">
        <div><Wordmark /><p>Parts ready before the appointment begins.</p></div>
        <nav aria-label="Redesign demo footer navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a href="#early-access">Join Early Access</a>
        </nav>
      </div>
      <div className="demo-shell demo-footer__meta"><span>Early product concept</span><span>&copy; {new Date().getFullYear()} Karigar</span></div>
    </footer>
  )
}

export default function DemoRedesign() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { activeSceneIndex, activeWorkflowStep } = useDemoCinematicScroll(rootRef, {
    workflowSceneId: 'services',
    workflowStepCount: services.length,
  })

  return (
    <div className="redesign-page" ref={rootRef}>
      <DemoSeo />
      <OpeningSequence />
      <a className="demo-skip-link" href="#demo-main">Skip to main content</a>
      <DemoHeader />
      <SceneProgress activeSceneIndex={activeSceneIndex} />
      <main id="demo-main">
        <CinematicHero />
        <ServicesStage activeService={activeWorkflowStep} />
        <ConnectedStage />
        <AudienceStage />
        <RoadmapStage />
        <EarlyAccess />
      </main>
      <DemoFooter />
    </div>
  )
}
