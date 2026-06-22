type BrandMarkProps = {
  compact?: boolean
  light?: boolean
}

export function BrandMark({ compact = false, light = true }: BrandMarkProps) {
  return (
    <span
      className={`brand-mark${compact ? ' brand-mark--compact' : ''}${light ? '' : ' brand-mark--dark'}`}
      aria-label="Karigar"
    >
      <span aria-hidden="true">kar</span>
      <span className="brand-screwdriver" aria-hidden="true">
        <span className="brand-screwdriver__handle" />
        <span className="brand-screwdriver__shaft" />
      </span>
      <span aria-hidden="true">gar</span>
    </span>
  )
}
