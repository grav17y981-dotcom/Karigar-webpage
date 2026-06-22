import { Icon } from './Icons'

const workflow = [
  { title: 'Today\u2019s jobs', text: 'See what is scheduled and what each job needs.', icon: 'calendar' as const },
  { title: 'Parts needed', text: 'Plan parts and quantities before the vehicle arrives.', icon: 'clipboard' as const },
  { title: 'Shelf & bin', text: 'Give the team an exact location they can walk to.', icon: 'pin' as const },
  { title: 'Shortage risk', text: 'Compare stock and upcoming demand early.', icon: 'alert' as const },
  { title: 'Restock suggestion', text: 'Review a supplier-grouped reorder list.', icon: 'cart' as const },
]

export function ProblemAndWorkflow() {
  return (
    <section className="story-section" id="how-it-works" aria-labelledby="problem-title">
      <div className="section-shell story-diptych" data-scroll-flow>
        <img src="/assets/karigar-parts-editorial.png" alt="Organized parts shelves beside a clean service bay and mechanic workbench" />
        <div className="story-copy">
          <h2 id="problem-title">Parts shouldn&rsquo;t be the reason a bay goes quiet.</h2>
          <p>Missing parts, searching shelves, and last-minute calls create delays that ripple across the day.</p>
          <p>Karigar keeps parts, locations, and appointments connected so the team finds what it needs and the schedule stays on track.</p>
          <a className="button button--ink" href="#workshop">See how Karigar works <Icon name="arrow" /></a>
        </div>
      </div>

      <div className="section-shell workflow-section">
        <div className="workflow-heading" data-scroll-flow>
          <h2>From appointment to shelf to restock.</h2>
          <p>Karigar connects the work on the floor with the inventory behind it.</p>
        </div>
        <ol className="workflow-rail">
          {workflow.map((item, index) => (
            <li key={item.title} data-scroll-flow data-flow-index={index}>
              <Icon name={item.icon} />
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WorkshopBoard() {
  return (
    <div className="product-panel board-panel" aria-label="Sample workshop board">
      <div className="panel-top"><div><strong>Workshop board</strong><span>Today &middot; Sample data</span></div><span className="live-dot">Demo</span></div>
      <div className="board-rows">
        <div><span className="bay-number">01</span><div><strong>9:30 AM &middot; Brake service</strong><span>Hatchback &middot; 3 planned parts</span></div><em className="status status--low">1 low</em></div>
        <div><span className="bay-number">02</span><div><strong>11:00 AM &middot; Oil + filter</strong><span>Sedan &middot; 2 planned parts</span></div><em className="status status--ok">Ready</em></div>
        <div><span className="bay-number">03</span><div><strong>2:15 PM &middot; Suspension check</strong><span>SUV &middot; 4 planned parts</span></div><em className="status status--watch">Watch</em></div>
      </div>
    </div>
  )
}

function InventoryPanel() {
  return (
    <div className="product-panel inventory-panel" aria-label="Sample inventory search result">
      <div className="search-field"><Icon name="search" /><span>Ceramic brake pad set</span><kbd>&#8984; K</kbd></div>
      <div className="inventory-row"><div><i className="part-shape" /><span><strong>Ceramic Brake Pad Set</strong><small>KRG-BRK-CP-001</small></span></div><b>2</b><span>Min 4</span><span>Shelf B &middot; Bin 08</span><em className="status status--low">Low</em></div>
      <div className="inventory-foot"><span><Icon name="history" /> Last activity</span><span>Issued to Bay 01 &middot; &minus;1</span></div>
    </div>
  )
}

function RestockPanel() {
  return (
    <div className="product-panel restock-panel" aria-label="Sample supplier-grouped restock queue">
      <div className="panel-top"><div><strong>Restock queue</strong><span>Human review required</span></div><span className="live-dot">Demo</span></div>
      <div className="restock-table">
        <div className="restock-header"><span>Part</span><span>On hand</span><span>Minimum</span><span>Suggested</span></div>
        <div><span>Ceramic Brake Pad Set</span><b>2</b><span>4</span><span>6</span></div>
        <div><span>Brake Disc Rotor</span><b>3</b><span>6</span><span>6</span></div>
        <div><span>Oil Filter</span><b>5</b><span>8</span><span>8</span></div>
      </div>
    </div>
  )
}

export function FeatureStory() {
  return (
    <section className="feature-story" id="features" aria-labelledby="feature-title">
      <div className="section-shell feature-layout">
        <div className="feature-intro" data-scroll-flow>
          <h2 id="feature-title">A clearer day,<br />from the front desk<br />to the parts room.</h2>
          <p>Karigar keeps the right parts moving, so your team can keep the work moving.</p>
        </div>
        <div className="feature-gallery">
          <article data-scroll-flow data-flow-index="0"><div className="feature-card-copy"><h3>Workshop board</h3><p>See what&rsquo;s needed, what&rsquo;s available, and what&rsquo;s next.</p></div><WorkshopBoard /></article>
          <article data-scroll-flow data-flow-index="1"><div className="feature-card-copy"><h3>Inventory search</h3><p>Find parts fast with location and status in the same result.</p></div><InventoryPanel /></article>
          <article className="shelf-card" data-scroll-flow data-flow-index="2"><div className="feature-card-copy"><h3>Shelf & bin</h3><p>Everything has a place&mdash;and a location the team can trust.</p></div><img src="/assets/karigar-parts-editorial.png" alt="Organized shelves with bins and repair parts" /></article>
          <article data-scroll-flow data-flow-index="3"><div className="feature-card-copy"><h3>Restock with a plan</h3><p>Right parts, right quantities, reviewed at the right time.</p></div><RestockPanel /></article>
        </div>
      </div>
    </section>
  )
}
