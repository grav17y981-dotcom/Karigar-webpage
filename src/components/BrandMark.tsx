type BrandMarkProps = {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}`}>
      <img src="/assets/karigar-logo.png" alt="Karigar" />
    </span>
  )
}
