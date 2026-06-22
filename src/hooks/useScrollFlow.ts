import { useEffect } from 'react'

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount

type FlowState = {
  element: HTMLElement
  enter: number
  enterTarget: number
  progress: number
  progressTarget: number
}

export function useScrollFlow() {
  useEffect(() => {
    const root = document.documentElement
    const hero = document.querySelector<HTMLElement>('[data-hero-scroll]')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const flowStates: FlowState[] = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-flow]')).map((element) => ({
      element,
      enter: 0,
      enterTarget: 0,
      progress: 0,
      progressTarget: 0,
    }))

    if (reducedMotion.matches) {
      root.style.setProperty('--page-progress', '0')
      hero?.style.setProperty('--hero-scale', '1')
      hero?.style.setProperty('--hero-copy-opacity', '1')
      hero?.style.setProperty('--hero-copy-scale', '1')
      for (const state of flowStates) {
        state.element.style.setProperty('--flow-opacity', '1')
        state.element.style.setProperty('--flow-y', '0px')
        state.element.style.setProperty('--flow-parallax', '0px')
      }
      return
    }

    let pageProgress = 0
    let pageTarget = 0
    let heroProgress = 0
    let heroTarget = 0
    let animationFrame = 0
    let running = false

    const measure = () => {
      const viewportHeight = window.innerHeight
      const scrollRange = Math.max(document.documentElement.scrollHeight - viewportHeight, 1)
      pageTarget = clamp(window.scrollY / scrollRange)

      if (hero) {
        const rect = hero.getBoundingClientRect()
        heroTarget = clamp(-rect.top / Math.max(hero.offsetHeight - viewportHeight, 1))
      }

      for (const state of flowStates) {
        const rect = state.element.getBoundingClientRect()
        const stagger = Number(state.element.dataset.flowIndex ?? 0) * 0.035
        state.enterTarget = clamp((viewportHeight * (0.91 - stagger) - rect.top) / (viewportHeight * 0.42))
        state.progressTarget = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height))
      }

      if (!running) {
        running = true
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    const render = () => {
      pageProgress = lerp(pageProgress, pageTarget, 0.09)
      heroProgress = lerp(heroProgress, heroTarget, 0.075)

      let moving = Math.abs(pageProgress - pageTarget) > 0.0001
        || Math.abs(heroProgress - heroTarget) > 0.0001

      root.style.setProperty('--page-progress', pageProgress.toFixed(4))

      if (hero) {
        const eased = smoothstep(heroProgress)
        const focus = smoothstep(clamp((heroProgress - 0.28) / 0.34))
        const compact = window.innerWidth <= 900
        const panX = compact ? -14 : -28
        const panY = compact ? 10 : 15
        const copyTravel = compact ? -48 : -138
        const copyScale = compact ? 0.72 : 0.46
        hero.style.setProperty('--hero-progress', heroProgress.toFixed(4))
        hero.style.setProperty('--hero-scale', (1 + eased * 0.48).toFixed(4))
        hero.style.setProperty('--hero-frame-scale', (1 + eased * 0.1).toFixed(4))
        hero.style.setProperty('--hero-x', `${(panX * eased).toFixed(3)}%`)
        hero.style.setProperty('--hero-y', `${(panY * eased).toFixed(3)}%`)
        hero.style.setProperty('--hero-copy-opacity', '1')
        hero.style.setProperty('--hero-copy-scale', (1 - eased * (1 - copyScale)).toFixed(4))
        hero.style.setProperty('--hero-copy-x', `${(-6 * eased).toFixed(2)}px`)
        hero.style.setProperty('--hero-copy-y', `${(copyTravel * eased).toFixed(2)}px`)
        hero.style.setProperty('--hero-focus-x', `${(55 + eased * panX).toFixed(3)}%`)
        hero.style.setProperty('--hero-focus-y', `${(35 + eased * panY).toFixed(3)}%`)
        hero.style.setProperty('--hero-focus-opacity', focus.toFixed(4))
        hero.style.setProperty('--hero-cue-opacity', Math.max(0, 1 - heroProgress * 2.7).toFixed(4))
        for (let index = 0; index < 5; index += 1) {
          const feature = smoothstep(clamp((heroProgress - (0.47 + index * 0.065)) / 0.13))
          hero.style.setProperty(`--hero-feature-${index + 1}`, feature.toFixed(4))
        }
      }

      for (const state of flowStates) {
        state.enter = lerp(state.enter, state.enterTarget, 0.09)
        state.progress = lerp(state.progress, state.progressTarget, 0.07)
        const eased = smoothstep(state.enter)
        state.element.style.setProperty('--flow-opacity', (0.16 + eased * 0.84).toFixed(4))
        state.element.style.setProperty('--flow-y', `${((1 - eased) * 54).toFixed(2)}px`)
        state.element.style.setProperty('--flow-parallax', `${((state.progress - 0.5) * -44).toFixed(2)}px`)
        moving ||= Math.abs(state.enter - state.enterTarget) > 0.0001 || Math.abs(state.progress - state.progressTarget) > 0.0001
      }

      if (moving) {
        animationFrame = window.requestAnimationFrame(render)
      } else {
        running = false
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
}
