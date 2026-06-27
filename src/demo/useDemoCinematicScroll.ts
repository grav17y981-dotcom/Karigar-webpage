import { useEffect, useState, type RefObject } from 'react'

export type DemoCinematicRoot = HTMLElement | null | RefObject<HTMLElement | null>

export type DemoCinematicScrollOptions = {
  workflowSceneId?: string
  workflowStepCount?: number
}

export type DemoCinematicScrollState = {
  activeSceneIndex: number
  activeWorkflowStep: number
}

type SceneGeometry = {
  element: HTMLElement
  flowObjects: FlowObject[]
  flowRange: number
  top: number
  height: number
  progressStart: number
  progressRange: number
  lastProgress: string
  lastEnter: string
  lastLeave: string
  lastFlowX: string
  lastParallaxSlow: string
  lastParallaxFast: string
}

type FlowObject = {
  axis: 'x' | 'y'
  element: HTMLElement
  end: number
  fade: 'in' | 'window'
  lastOpacity: string
  lastProgress: string
  lastX: string
  lastY: string
  start: number
  travel: number
}

type MobileMeasurement = {
  scene: SceneGeometry
  rect: DOMRect
  progress: number
}

const MOBILE_QUERY = '(max-width: 820px), (hover: none) and (pointer: coarse), (max-height: 650px)'
const SCENE_SELECTOR = '[data-demo-scene]'
const WORKFLOW_STEP_SELECTOR = '[data-demo-workflow-step]'

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)
const finiteOr = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function resolveRoot(target: DemoCinematicRoot) {
  if (!target) return null
  return 'current' in target ? target.current : target
}

function sceneMatchesId(element: HTMLElement, id: string) {
  return element.dataset.demoScene === id
    || element.dataset.sceneId === id
    || element.id === id
    || (id === 'workflow' && element.hasAttribute('data-demo-workflow'))
}

function setIfChanged(
  scene: SceneGeometry,
  cacheKey: keyof Pick<
    SceneGeometry,
    'lastProgress' | 'lastEnter' | 'lastLeave' | 'lastFlowX' | 'lastParallaxSlow' | 'lastParallaxFast'
  >,
  property: string,
  value: string,
) {
  if (scene[cacheKey] === value) return
  scene[cacheKey] = value
  scene.element.style.setProperty(property, value)
}

function writeSceneVariables(
  scene: SceneGeometry,
  progress: number,
  enter: number,
  leave: number,
  mobile: boolean,
) {
  const serializedProgress = progress.toFixed(4)
  const serializedEnter = enter.toFixed(4)
  const serializedLeave = leave.toFixed(4)
  const flowX = mobile ? 0 : (0.5 - progress) * scene.flowRange
  const parallaxSlow = mobile ? 0 : (progress - 0.5) * -64
  const parallaxFast = mobile ? 0 : (progress - 0.5) * -140

  setIfChanged(scene, 'lastProgress', '--demo-scene-progress', serializedProgress)
  setIfChanged(scene, 'lastEnter', '--demo-scene-enter', serializedEnter)
  setIfChanged(scene, 'lastLeave', '--demo-scene-leave', serializedLeave)
  setIfChanged(scene, 'lastFlowX', '--demo-flow-x', `${flowX.toFixed(2)}px`)
  setIfChanged(scene, 'lastParallaxSlow', '--demo-parallax-slow', `${parallaxSlow.toFixed(2)}px`)
  setIfChanged(scene, 'lastParallaxFast', '--demo-parallax-fast', `${parallaxFast.toFixed(2)}px`)

  for (const object of scene.flowObjects) {
    const range = Math.max(object.end - object.start, 0.001)
    const objectProgress = mobile ? 1 : smoothstep(clamp((progress - object.start) / range))
    const travel = mobile
      ? 0
      : object.axis === 'x'
        ? (0.5 - objectProgress) * object.travel
        : (1 - objectProgress) * object.travel
    const fadeDistance = Math.min(range * 0.35, 0.12)
    const fadeIn = objectProgress
    const fadeOut = 1 - smoothstep(clamp((progress - (object.end - fadeDistance)) / Math.max(fadeDistance, 0.001)))
    const objectOpacity = object.fade === 'window' && !mobile
      ? Math.min(1, fadeIn * 2.2) * fadeOut
      : objectProgress
    const opacity = objectOpacity.toFixed(4)
    const serializedProgress = objectProgress.toFixed(4)
    const x = `${(object.axis === 'x' ? travel : 0).toFixed(2)}px`
    const y = `${(object.axis === 'y' ? travel : 0).toFixed(2)}px`

    if (object.lastProgress !== serializedProgress) {
      object.lastProgress = serializedProgress
      object.element.style.setProperty('--demo-object-progress', serializedProgress)
    }
    if (object.lastOpacity !== opacity) {
      object.lastOpacity = opacity
      object.element.style.setProperty('--demo-object-opacity', opacity)
    }
    if (object.lastX !== x) {
      object.lastX = x
      object.element.style.setProperty('--demo-object-x', x)
    }
    if (object.lastY !== y) {
      object.lastY = y
      object.element.style.setProperty('--demo-object-y', y)
    }
  }
}

function createSceneGeometry(element: HTMLElement): SceneGeometry {
  const flowObjects = Array.from(element.querySelectorAll<HTMLElement>('[data-demo-flow-object]')).map((flowElement) => {
    const start = clamp(finiteOr(flowElement.dataset.demoFlowStart, 0.08))
    const end = Math.max(start + 0.001, clamp(finiteOr(flowElement.dataset.demoFlowEnd, 0.9)))
    return {
      axis: flowElement.dataset.demoFlowAxis === 'x' ? 'x' as const : 'y' as const,
      element: flowElement,
      end,
      fade: flowElement.dataset.demoFlowFade === 'window' ? 'window' as const : 'in' as const,
      lastOpacity: '',
      lastProgress: '',
      lastX: '',
      lastY: '',
      start,
      travel: finiteOr(flowElement.dataset.demoFlowTravel, 70),
    }
  })

  return {
    element,
    flowObjects,
    flowRange: finiteOr(element.dataset.demoFlowRange, 240),
    top: 0,
    height: 0,
    progressStart: 0,
    progressRange: 1,
    lastProgress: '',
    lastEnter: '',
    lastLeave: '',
    lastFlowX: '',
    lastParallaxSlow: '',
    lastParallaxFast: '',
  }
}

/**
 * Drives the cinematic redesign without subscribing React to per-frame values.
 * All DOM queries are scoped to the supplied demo root. React state changes only
 * when the active scene or workflow step crosses a boundary.
 */
export function useDemoCinematicScroll(
  rootTarget: DemoCinematicRoot,
  options: DemoCinematicScrollOptions = {},
): DemoCinematicScrollState {
  const {
    workflowSceneId = 'workflow',
    workflowStepCount = 5,
  } = options
  const safeWorkflowStepCount = Math.max(1, Math.floor(workflowStepCount))
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0)

  useEffect(() => {
    const root = resolveRoot(rootTarget)
    if (!root) return

    const scenes = Array.from(root.querySelectorAll<HTMLElement>(SCENE_SELECTOR)).map(createSceneGeometry)
    if (scenes.length === 0) return

    const workflowScene = scenes.find(({ element }) => sceneMatchesId(element, workflowSceneId)) ?? null
    const workflowStepElements = workflowScene
      ? Array.from(workflowScene.element.querySelectorAll<HTMLElement>(WORKFLOW_STEP_SELECTOR))
      : []
    const mobileMedia = window.matchMedia(MOBILE_QUERY)
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observedRatios = new Map<Element, number>()

    let mobile = mobileMedia.matches || reducedMotionMedia.matches
    let disposed = false
    let frame = 0
    let needsMeasure = true
    let needsMobileSync = mobile
    let targetScrollY = window.scrollY
    let renderedScrollY = targetScrollY
    let viewportHeight = Math.max(window.innerHeight, 1)
    let lastFrameTime = 0
    let lastSceneBoundary = -1
    let lastWorkflowBoundary = -1
    let mobileObserver: IntersectionObserver | null = null

    const commitSceneBoundary = (index: number) => {
      if (index === lastSceneBoundary) return
      lastSceneBoundary = index
      setActiveSceneIndex((current) => current === index ? current : index)
    }

    const commitWorkflowBoundary = (index: number) => {
      if (index === lastWorkflowBoundary) return
      lastWorkflowBoundary = index
      setActiveWorkflowStep((current) => current === index ? current : index)
    }

    const measure = () => {
      viewportHeight = Math.max(window.innerHeight, 1)
      const scrollY = window.scrollY

      // Read all scene geometry before the animation phase writes any styles.
      for (const scene of scenes) {
        const rect = scene.element.getBoundingClientRect()
        scene.top = rect.top + scrollY
        scene.height = Math.max(rect.height, 1)

        if (scene.element.dataset.demoFlowRange === 'auto') {
          const track = scene.element.querySelector<HTMLElement>('[data-demo-flow-track]')
          scene.flowRange = Math.max((track?.scrollWidth ?? 0) - window.innerWidth + window.innerWidth * 0.42, 240)
        }

        if (scene.height > viewportHeight * 1.1) {
          scene.progressStart = scene.top
          scene.progressRange = Math.max(scene.height - viewportHeight, 1)
        } else {
          scene.progressStart = scene.top - viewportHeight
          scene.progressRange = Math.max(scene.height + viewportHeight, 1)
        }
      }
    }

    const nearestSceneIndex = (anchor: number) => {
      let index = 0
      for (let candidate = 0; candidate < scenes.length; candidate += 1) {
        if (scenes[candidate].top <= anchor) index = candidate
        else break
      }
      return index
    }

    const updateDesktop = (scrollY: number) => {
      const viewportAnchor = scrollY + viewportHeight * 0.48
      commitSceneBoundary(nearestSceneIndex(viewportAnchor))

      for (const scene of scenes) {
        const progress = clamp((scrollY - scene.progressStart) / scene.progressRange)
        const enterDistance = viewportHeight * 0.3
        const enter = smoothstep(clamp((scrollY + viewportHeight - scene.top) / enterDistance))
        const leave = 1 - smoothstep(clamp((progress - 0.84) / 0.16))
        writeSceneVariables(scene, progress, enter, leave, false)

        if (scene === workflowScene) {
          const step = Math.min(
            safeWorkflowStepCount - 1,
            Math.floor(progress * safeWorkflowStepCount),
          )
          commitWorkflowBoundary(step)
        }
      }
    }

    const updateMobile = () => {
      const measurements: MobileMeasurement[] = scenes.map((scene) => {
        const rect = scene.element.getBoundingClientRect()
        return {
          scene,
          rect,
          progress: clamp((viewportHeight - rect.top) / Math.max(viewportHeight + rect.height, 1)),
        }
      })
      const viewportAnchor = viewportHeight * 0.42

      // Choose the scene intersecting the reading line, then fall back to the
      // closest visible scene. These reads are complete before CSS writes begin.
      let nextSceneIndex = 0
      let bestSceneDistance = Number.POSITIVE_INFINITY
      measurements.forEach(({ rect }, index) => {
        const intersectsReadingLine = rect.top <= viewportAnchor && rect.bottom >= viewportAnchor
        const isObserved = (observedRatios.get(scenes[index].element) ?? 0) > 0
        if (!intersectsReadingLine && !isObserved) return
        const distance = intersectsReadingLine
          ? 0
          : Math.abs(rect.top + rect.height * 0.5 - viewportAnchor)
        if (distance < bestSceneDistance) {
          bestSceneDistance = distance
          nextSceneIndex = index
        }
      })
      if (!Number.isFinite(bestSceneDistance)) {
        nextSceneIndex = nearestSceneIndex(window.scrollY + viewportAnchor)
      }
      commitSceneBoundary(nextSceneIndex)

      let nextWorkflowStep: number | null = null
      if (workflowScene && workflowStepElements.length > 0) {
        let nextStep = Math.max(lastWorkflowBoundary, 0)
        let bestStepDistance = Number.POSITIVE_INFINITY

        for (let index = 0; index < workflowStepElements.length; index += 1) {
          const element = workflowStepElements[index]
          if ((observedRatios.get(element) ?? 0) <= 0) continue
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top + rect.height * 0.5 - viewportAnchor)
          if (distance < bestStepDistance) {
            bestStepDistance = distance
            const declaredStep = Number(element.dataset.demoWorkflowStep)
            nextStep = Number.isFinite(declaredStep) && element.dataset.demoWorkflowStep !== ''
              ? declaredStep
              : index
          }
        }

        nextWorkflowStep = Math.min(safeWorkflowStepCount - 1, Math.max(0, nextStep))
      } else if (workflowScene) {
        const workflowMeasurement = measurements.find(({ scene }) => scene === workflowScene)
        if (workflowMeasurement) {
          nextWorkflowStep = Math.min(
            safeWorkflowStepCount - 1,
            Math.floor(workflowMeasurement.progress * safeWorkflowStepCount),
          )
        }
      }

      for (const { scene, progress } of measurements) {
        // Mobile is deliberately linear and keeps all parallax travel at zero.
        const enter = clamp(progress / 0.18)
        const leave = 1 - clamp((progress - 0.82) / 0.18)
        writeSceneVariables(scene, progress, enter, leave, true)
      }

      if (nextWorkflowStep !== null) commitWorkflowBoundary(nextWorkflowStep)
    }

    const tick = (timestamp: number) => {
      frame = 0
      if (disposed) return

      if (needsMeasure) {
        needsMeasure = false
        measure()
      }

      if (mobile) {
        if (needsMobileSync) {
          needsMobileSync = false
          updateMobile()
        }
        return
      }

      const distance = targetScrollY - renderedScrollY
      const elapsed = lastFrameTime > 0 ? Math.min(timestamp - lastFrameTime, 50) : 16.67
      const baseEase = Math.abs(distance) > viewportHeight * 0.85 ? 0.34 : 0.18
      const frameEase = 1 - Math.pow(1 - baseEase, elapsed / 16.67)
      lastFrameTime = timestamp

      renderedScrollY += distance * frameEase
      if (Math.abs(targetScrollY - renderedScrollY) < 0.35) renderedScrollY = targetScrollY
      updateDesktop(renderedScrollY)

      if (renderedScrollY !== targetScrollY) scheduleFrame()
    }

    const scheduleFrame = () => {
      if (frame || disposed) return
      frame = window.requestAnimationFrame(tick)
    }

    const connectMobileObserver = () => {
      mobileObserver?.disconnect()
      mobileObserver = null
      observedRatios.clear()

      if (!mobile) return
      mobileObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          observedRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        needsMobileSync = true
        scheduleFrame()
      }, {
        root: null,
        rootMargin: '-41% 0px -58% 0px',
        threshold: 0,
      })

      for (const scene of scenes) mobileObserver.observe(scene.element)
      for (const step of workflowStepElements) mobileObserver.observe(step)
    }

    const onScroll = () => {
      targetScrollY = window.scrollY
      if (mobile) return
      scheduleFrame()
    }

    const onResize = () => {
      targetScrollY = window.scrollY
      needsMeasure = true
      needsMobileSync = mobile
      scheduleFrame()
    }

    const onMediaChange = () => {
      mobile = mobileMedia.matches || reducedMotionMedia.matches
      targetScrollY = window.scrollY
      renderedScrollY = targetScrollY
      lastFrameTime = 0
      needsMeasure = true
      needsMobileSync = mobile
      connectMobileObserver()
      scheduleFrame()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        return
      }
      targetScrollY = window.scrollY
      renderedScrollY = targetScrollY
      lastFrameTime = 0
      needsMeasure = true
      needsMobileSync = mobile
      scheduleFrame()
    }

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => {
          needsMeasure = true
          needsMobileSync = mobile
          scheduleFrame()
        })

    for (const scene of scenes) resizeObserver?.observe(scene.element)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)
    mobileMedia.addEventListener('change', onMediaChange)
    reducedMotionMedia.addEventListener('change', onMediaChange)

    connectMobileObserver()
    scheduleFrame()

    void document.fonts?.ready.then(() => {
      if (disposed) return
      needsMeasure = true
      needsMobileSync = mobile
      scheduleFrame()
    })

    return () => {
      disposed = true
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      mobileObserver?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mobileMedia.removeEventListener('change', onMediaChange)
      reducedMotionMedia.removeEventListener('change', onMediaChange)

      for (const { element } of scenes) {
        element.style.removeProperty('--demo-scene-progress')
        element.style.removeProperty('--demo-scene-enter')
        element.style.removeProperty('--demo-scene-leave')
        element.style.removeProperty('--demo-flow-x')
        element.style.removeProperty('--demo-parallax-slow')
        element.style.removeProperty('--demo-parallax-fast')
      }
      for (const scene of scenes) {
        for (const object of scene.flowObjects) {
          object.element.style.removeProperty('--demo-object-progress')
          object.element.style.removeProperty('--demo-object-opacity')
          object.element.style.removeProperty('--demo-object-x')
          object.element.style.removeProperty('--demo-object-y')
        }
      }
    }
  }, [rootTarget, safeWorkflowStepCount, workflowSceneId])

  return { activeSceneIndex, activeWorkflowStep }
}
