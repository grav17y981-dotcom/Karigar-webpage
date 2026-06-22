import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'

const steps = [
  { title: 'Today\u2019s jobs', detail: 'Three bays, three appointments, one shared view of what is coming through the door.', meta: 'Planning board \u00b7 Bay 01 \u00b7 9:30 AM', icon: 'calendar' as const, focus: { x: 0.08, y: 0.34, scale: 1.72 } },
  { title: 'Parts needed', detail: 'See planned parts and quantities before the vehicle reaches the lift.', meta: 'Prep bench \u00b7 Pads \u00d7 1 \u00b7 Rotors \u00d7 2', icon: 'clipboard' as const, focus: { x: 0.2, y: 0.72, scale: 1.58 } },
  { title: 'Shelf & bin location', detail: 'Turn a part search into a physical location the team can walk to.', meta: 'Central storage \u00b7 Shelf B \u00b7 Bin 08', icon: 'pin' as const, focus: { x: 0.53, y: 0.29, scale: 1.68 } },
  { title: 'Shortage risk', detail: 'Compare stock, minimums, and planned demand before a job is delayed.', meta: 'Inspection shelf \u00b7 On hand 2 \u00b7 Low', icon: 'alert' as const, focus: { x: 0.71, y: 0.27, scale: 1.76 } },
  { title: 'Restock suggestion', detail: 'Group practical reorder suggestions for human review.', meta: 'Receiving zone \u00b7 Suggested 6 \u00b7 Demo data', icon: 'cart' as const, focus: { x: 0.88, y: 0.58, scale: 1.64 } },
]

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount

export function WorkshopExperience() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const activeStepRef = useRef(0)
  const selected = steps[activeStep]

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let progress = 0
    let target = 0
    let animationFrame = 0
    let running = false

    const renderCamera = () => {
      progress = lerp(progress, target, 0.08)
      const stepped = Math.min(progress * steps.length, steps.length - 0.001)
      const stepIndex = Math.floor(stepped)
      const local = stepped - stepIndex
      const nextIndex = Math.min(stepIndex + 1, steps.length - 1)
      const currentFocus = steps[stepIndex].focus
      const nextFocus = steps[nextIndex].focus
      const handoff = smoothstep(clamp((local - 0.72) / 0.28))
      const zoomIn = smoothstep(clamp(local / 0.22))
      const zoomOut = 1 - smoothstep(clamp((local - 0.66) / 0.24))
      const zoomEnvelope = zoomIn * zoomOut
      const focusX = lerp(currentFocus.x, nextFocus.x, handoff)
      const focusY = lerp(currentFocus.y, nextFocus.y, handoff)
      const focusScale = lerp(currentFocus.scale, nextFocus.scale, handoff)
      const scale = 1.035 + (focusScale - 1.035) * zoomEnvelope

      stage.style.setProperty('--stage-scale', scale.toFixed(4))
      stage.style.setProperty('--stage-x', `${((0.5 - focusX) * 100).toFixed(3)}%`)
      stage.style.setProperty('--stage-y', `${((0.5 - focusY) * 100).toFixed(3)}%`)
      stage.style.setProperty('--stage-origin-x', `${(focusX * 100).toFixed(3)}%`)
      stage.style.setProperty('--stage-origin-y', `${(focusY * 100).toFixed(3)}%`)
      stage.style.setProperty('--stage-focus-opacity', smoothstep(clamp((zoomEnvelope - 0.18) / 0.5)).toFixed(4))
      stage.style.setProperty('--stage-step-progress', local.toFixed(4))

      if (activeStepRef.current !== stepIndex) {
        activeStepRef.current = stepIndex
        setActiveStep(stepIndex)
      }

      if (Math.abs(progress - target) > 0.0001) {
        animationFrame = window.requestAnimationFrame(renderCamera)
      } else {
        running = false
      }
    }

    const measure = () => {
      const rect = section.getBoundingClientRect()
      target = clamp(-rect.top / Math.max(section.offsetHeight - window.innerHeight, 1))
      if (!running) {
        running = true
        animationFrame = window.requestAnimationFrame(renderCamera)
      }
    }

    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    measure()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section className="workshop workshop--scroll" id="workshop" aria-labelledby="workshop-title" ref={sectionRef}>
      <div className="workshop-sticky">
        <div className="section-shell workshop-heading">
          <div><h2 id="workshop-title">The whole shop day, in one view.</h2><p>The camera follows your scroll from planning to restocking.</p></div>
          <span className="workshop-scroll-note">Scroll to move through the shop <Icon name="arrow" /></span>
        </div>

        <div className="section-shell workshop-layout">
          <ol className="demo-step-list" aria-label="Scroll-driven workshop steps">
            {steps.map((step, index) => (
              <li key={step.title} className={index === activeStep ? 'is-active' : ''} aria-current={index === activeStep ? 'step' : undefined}>
                <span className="demo-step-number">0{index + 1}</span>
                <Icon name={step.icon} />
                <span><strong>{step.title}</strong><small>{step.detail}</small></span>
              </li>
            ))}
          </ol>

          <div className="workshop-stage" ref={stageRef}>
            <div className="workshop-image-camera" aria-hidden="true">
              <img src="/assets/karigar-scroll-workshop.png" alt="" />
            </div>
            <div className="workshop-camera-focus" aria-hidden="true"><i /></div>
            <div className="workshop-status"><span>Scroll-driven sample workshop</span><span>Illustrated view</span></div>
            <div className="demo-card" aria-live="polite">
              <div className="demo-card__step">Step {activeStep + 1} of {steps.length}</div>
              <div className="demo-card__title"><Icon name={selected.icon} /><h3>{selected.title}</h3></div>
              <p>{selected.detail}</p>
              <strong>{selected.meta}</strong>
              <div className="demo-card__progress" aria-hidden="true"><span /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
