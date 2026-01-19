import { onMount, onCleanup, createEffect, children as resolveChildren, type JSX } from 'solid-js'
import { MotionRail as MotionRailClass, type MotionRailOptions } from 'motionrail'

export interface MotionRailProps extends JSX.HTMLAttributes<HTMLDivElement> {
  options?: MotionRailOptions
  children?: JSX.Element
}

function MotionRailSolid(props: MotionRailProps) {
  let containerRef: HTMLDivElement | undefined
  let motionRailInstance: MotionRailClass | null = null
  const resolved = resolveChildren(() => props.children)

  onMount(() => {
    if (!containerRef) return

    motionRailInstance = new MotionRailClass(containerRef, props.options || {})
  })

  createEffect(() => {
    // React to children changes
    resolved()
    if (motionRailInstance) {
      motionRailInstance.update()
    }
  })

  onCleanup(() => {
    if (motionRailInstance) {
      motionRailInstance.destroy()
      motionRailInstance = null
    }
  })

  // Extract options and rest props
  const { options, children, ...restProps } = props
  // Compute style for scrollable div
  const scrollableStyle = options?.containerName
    ? { containerName: options.containerName }
    : undefined
  return (
    <div ref={containerRef} data-motionrail {...restProps}>
      <div data-motionrail-scrollable style={scrollableStyle}>
        <div data-motionrail-grid>{resolved()}</div>
      </div>
    </div>
  )
}

export { MotionRailSolid as MotionRail }
