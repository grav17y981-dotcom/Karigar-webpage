type BrandMarkProps = {
  compact?: boolean
  inverted?: boolean
  className?: string
}

export function BrandMark({ compact = false, inverted = false, className }: BrandMarkProps) {
  const classes = [
    'brand-mark',
    compact ? 'brand-mark--compact' : '',
    inverted ? 'brand-mark--inverted' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <img src="/assets/karigar-logo.webp" alt="Karigar" width="600" height="450" decoding="async" />
    </span>
  )
}
