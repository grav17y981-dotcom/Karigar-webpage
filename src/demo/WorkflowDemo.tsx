import { useRef, useState, type KeyboardEvent } from 'react'
import { Icon } from '../components/Icons'
import './workflow-demo.css'

const workflowSteps = [
  {
    label: 'Plan the job',
    title: 'Plan the parts before the vehicle arrives.',
    description: 'Attach a checked parts list to the booked repair. The team can see what to prepare before the appointment begins.',
    screen: 'Appointment parts',
  },
  {
    label: 'Check the shelf',
    title: 'Compare the job with what is on the shelf.',
    description: 'See available stock, quantities reserved for this job, and the exact shortage. Shelf locations keep picking straightforward.',
    screen: 'Inventory check',
  },
  {
    label: 'Restock the gap',
    title: 'Turn the shortage into a clear restock plan.',
    description: 'Group the missing parts into a suggested order for the team to review. A suggestion still needs approval and supplier confirmation.',
    screen: 'Restock suggestion',
  },
  {
    label: 'Ready the bay',
    title: 'Share one clear readiness status.',
    description: 'After the missing part is received and checked, the job can move to ready. Everyone sees the same parts checklist before work starts.',
    screen: 'Job readiness',
  },
]

const parts = [
  { name: 'Front brake pads', needed: '1 set', stock: '1 set', reserved: '1 set', location: 'A-02', status: 'Available' },
  { name: 'Front brake rotors', needed: '2', stock: '1', reserved: '1', location: 'B-04', status: 'Short 1' },
  { name: 'Brake fluid', needed: '1 bottle', stock: '3 bottles', reserved: '1 bottle', location: 'C-01', status: 'Available' },
]

function ProductScreen({ step }: { step: number }) {
  return (
    <div className="workflow-screen" aria-label={`${workflowSteps[step].screen} sample product screen`}>
      <div className="workflow-screen__bar"><span>karigar / workshop</span><span>Sample data</span></div>
      <div className="workflow-screen__body">
        <div className="workflow-screen__heading">
          <div><span className="workflow-screen__eyebrow">Job K-1042 · Tomorrow, 09:00</span><h4>{workflowSteps[step].screen}</h4><p>2018 Honda Civic · Front brake service</p></div>
          <span className={`workflow-status ${step === 3 ? 'workflow-status--ready' : 'workflow-status--waiting'}`}>{step === 3 ? 'Parts ready' : 'Needs 1 rotor'}</span>
        </div>
        {step === 0 ? (
          <>
            <div className="workflow-screen__summary"><Icon name="calendar" /><span>Bay 02<span>Parts checklist for the booked repair</span></span></div>
            <ul className="workflow-parts-list">
              {parts.map((part) => <li key={part.name}><span>{part.name}</span><strong>{part.needed}</strong></li>)}
            </ul>
            <p className="workflow-screen__note">Next: check this list against available inventory.</p>
          </>
        ) : step === 1 ? (
          <>
            <div className="workflow-table-wrap" tabIndex={0} role="region" aria-label="Inventory quantities">
              <table className="workflow-stock-table">
                <caption>Inventory and quantities reserved for this appointment</caption>
                <thead><tr><th scope="col">Part / bin</th><th scope="col">On hand</th><th scope="col">Reserved</th><th scope="col">Status</th></tr></thead>
                <tbody>{parts.map((part) => <tr key={part.name}><th scope="row">{part.name}<span>Bin {part.location}</span></th><td>{part.stock}</td><td>{part.reserved}</td><td><span className={part.status === 'Short 1' ? 'workflow-shortage' : ''}>{part.status}</span></td></tr>)}</tbody>
              </table>
            </div>
            <p className="workflow-screen__note"><Icon name="alert" /> One additional rotor is needed for this job.</p>
          </>
        ) : step === 2 ? (
          <>
            <div className="workflow-order">
              <span className="workflow-screen__eyebrow">Suggested supplier · Local Parts Co. (sample)</span>
              <h5>Front brake rotor <strong>× 1</strong></h5>
              <dl><div><dt>Needed for</dt><dd>Job K-1042</dd></div><div><dt>Order status</dt><dd>Awaiting team review</dd></div></dl>
              <span className="workflow-order__review"><Icon name="clipboard" /> Review before ordering</span>
            </div>
            <p className="workflow-screen__note">The shop confirms fitment, price, and availability with the supplier.</p>
          </>
        ) : (
          <>
            <div className="workflow-ready"><Icon name="check" /><div><strong>All required parts staged</strong><span>The second rotor has been received and checked in this example.</span></div></div>
            <ul className="workflow-parts-list">
              {parts.map((part) => <li key={part.name}><span><Icon name="check" />{part.name}</span><strong>{part.needed}</strong></li>)}
            </ul>
            <p className="workflow-screen__note">The team verifies fitment and quantities before starting the repair.</p>
          </>
        )}
      </div>
    </div>
  )
}

export function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowDown') next = (index + 1) % workflowSteps.length
    else if (event.key === 'ArrowUp') next = (index - 1 + workflowSteps.length) % workflowSteps.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = workflowSteps.length - 1
    else return
    event.preventDefault()
    setActiveStep(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="demo-connected" id="how-it-works" data-demo-scene="how-it-works" aria-labelledby="demo-connected-title">
      <div className="demo-shell">
        <div className="demo-connected__header">
          <h2 id="demo-connected-title">From booking to <strong>bay-ready.</strong></h2>
          <p>Explore one brake-service job, from the parts list to a ready bay.</p>
        </div>
        <div className="workflow-demo">
          <div className="demo-connected__rows" role="tablist" aria-label="Repair workflow" aria-orientation="vertical">
            {workflowSteps.map((step, index) => (
              <button
                key={step.label}
                id={`workflow-tab-${index}`}
                ref={(element) => { tabRefs.current[index] = element }}
                className={index === activeStep ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={index === activeStep}
                aria-controls={`workflow-panel-${index}`}
                tabIndex={index === activeStep ? 0 : -1}
                onClick={() => setActiveStep(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="workflow-tab-number">{String(index + 1).padStart(2, '0')}</span><span>{step.label}</span><Icon name="arrow" />
              </button>
            ))}
          </div>
          <div className="workflow-demo__panels">
            {workflowSteps.map((step, index) => (
              <div key={step.screen} id={`workflow-panel-${index}`} className="workflow-demo__panel" role="tabpanel" aria-labelledby={`workflow-tab-${index}`} hidden={index !== activeStep} tabIndex={0}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ProductScreen step={index} />
              </div>
            ))}
          </div>
        </div>
        <p className="workflow-demo__disclosure">Interactive concept · Sample data · No live inventory or supplier connection</p>
      </div>
    </section>
  )
}
