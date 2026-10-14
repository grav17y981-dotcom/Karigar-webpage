import type { MouseEventHandler } from 'react'
import { Icon } from '../components/Icons'
import './hero-readiness.css'

const previewJobs = [
  { time: '09:00', title: 'Front brake service', detail: 'K-1042 · Honda Civic', status: 'Needs 1 rotor', ready: false },
  { time: '10:30', title: 'Oil & filter service', detail: 'K-1043 · Toyota Corolla', status: 'Parts ready', ready: true },
]

export function HeroReadiness({ onExplore }: { onExplore: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <div className="hero-readiness" aria-label="Sample Karigar workshop board">
      <div className="hero-readiness__bar"><span><i aria-hidden="true" /> Workshop board</span><span>Concept preview</span></div>
      <div className="hero-readiness__body">
        <div className="hero-readiness__heading"><span>Plan ahead. Start prepared.</span><h2>Tomorrow&rsquo;s workshop</h2><p>2 appointments · 1 parts-ready · 1 to check</p></div>
        <ol className="hero-readiness__jobs">
          {previewJobs.map((job) => (
            <li key={job.time} className={job.ready ? '' : 'needs-attention'}>
              <span className="hero-readiness__time">{job.time}</span>
              <div><h3>{job.title}</h3><p>{job.detail}</p><span className={job.ready ? 'hero-readiness__status is-ready' : 'hero-readiness__status'}><Icon name={job.ready ? 'check' : 'alert'} />{job.status}</span></div>
            </li>
          ))}
        </ol>
        <div className="hero-readiness__restock"><Icon name="cart" /><div><strong>A shortage with a next step.</strong><span>1 rotor → a restock suggestion for review.</span></div></div>
        <a className="hero-readiness__link" href="#how-it-works" onClick={onExplore}>See how this job gets ready <Icon name="arrow" /></a>
      </div>
      <p className="hero-readiness__caption">Sample shop data · Explore the product concept</p>
    </div>
  )
}
