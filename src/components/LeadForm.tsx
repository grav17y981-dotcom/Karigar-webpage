import { useState, type FormEvent } from 'react'
import { Icon } from './Icons'

export type FormMode = 'waitlist' | 'demo'

type FormValues = {
  name: string
  email: string
  shopName: string
  role: string
  shopType: string
  message: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  shopName: '',
  role: '',
  shopType: '',
  message: '',
}

export function LeadForm({ mode, onModeChange }: { mode: FormMode; onModeChange: (mode: FormMode) => void }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.shopName.trim()) next.shopName = 'Please enter your shop name.'
    if (!values.role) next.role = 'Choose your role.'
    if (!values.shopType) next.shopType = 'Choose a shop type.'
    if (!values.message.trim()) next.message = 'Tell us the inventory problem you want to solve.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return
    // Future integration point: send validated values to an environment-configured form endpoint.
    // This marketing prototype intentionally does not transmit or persist the sample submission.
    setSubmitted(true)
  }

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span><Icon name="check" /></span>
        <h3>Thanks, {values.name.split(' ')[0]}.</h3>
        <p>{mode === 'demo' ? 'Your demo request is ready for future follow-up.' : 'You\u2019re on the prototype waitlist.'}</p>
        <small>This demo did not send or store your information.</small>
        <button type="button" className="text-button" onClick={() => { setSubmitted(false); setValues(initialValues) }}>Send another response</button>
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="form-mode" aria-label="Interest type">
        <button type="button" className={mode === 'waitlist' ? 'is-active' : ''} onClick={() => onModeChange('waitlist')}>Join waitlist</button>
        <button type="button" className={mode === 'demo' ? 'is-active' : ''} onClick={() => onModeChange('demo')}>Request demo</button>
      </div>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" maxLength={80} value={values.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name ? <span id="name-error">{errors.name}</span> : null}</label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={120} value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email ? <span id="email-error">{errors.email}</span> : null}</label>
        <label>Shop name<input name="shopName" autoComplete="organization" maxLength={100} value={values.shopName} onChange={(event) => update('shopName', event.target.value)} aria-invalid={Boolean(errors.shopName)} aria-describedby={errors.shopName ? 'shop-error' : undefined} />{errors.shopName ? <span id="shop-error">{errors.shopName}</span> : null}</label>
        <label>Role<select name="role" value={values.role} onChange={(event) => update('role', event.target.value)} aria-invalid={Boolean(errors.role)} aria-describedby={errors.role ? 'role-error' : undefined}><option value="">Select role</option><option>Owner</option><option>Shop manager</option><option>Parts manager</option><option>Service advisor</option><option>Technician</option><option>Parts clerk</option><option>Other</option></select>{errors.role ? <span id="role-error">{errors.role}</span> : null}</label>
        <label>Shop type<select name="shopType" value={values.shopType} onChange={(event) => update('shopType', event.target.value)} aria-invalid={Boolean(errors.shopType)} aria-describedby={errors.shopType ? 'type-error' : undefined}><option value="">Select shop type</option><option>Independent repair shop</option><option>Body shop</option><option>Specialty shop</option><option>Other</option></select>{errors.shopType ? <span id="type-error">{errors.shopType}</span> : null}</label>
        <label className="form-message">Biggest inventory problem<textarea name="message" maxLength={500} rows={4} value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-count'} />{errors.message ? <span id="message-error">{errors.message}</span> : <small id="message-count">{values.message.length}/500 &middot; Please do not include customer, vehicle, VIN, payment, or other sensitive data.</small>}</label>
      </div>
      <button className="button button--primary form-submit" type="submit">{mode === 'demo' ? 'Request a demo' : 'Join the waitlist'} <Icon name="arrow" /></button>
      <p className="form-note"><Icon name="shield" /> Prototype only: this form validates locally and does not send or store data.</p>
    </form>
  )
}
