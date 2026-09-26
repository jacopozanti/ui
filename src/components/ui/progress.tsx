import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { motion } from "motion/react"
import { cn } from "cn"

import { forMotion, spring } from "@/lib/motion"

function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary", className)}
      render={(renderProps) => {
        /*
         * Base UI writes the fill as an inline `width: 62%`. Motion takes that
         * value over and eases to it, so a jump from 20% to 80% travels instead
         * of snapping. On `linear`, not a spring: a spring would overshoot, and
         * a progress bar reading past its own value — past 100% at the end —
         * is simply wrong.
         */
        const { style, ...rest } = forMotion(renderProps) as typeof renderProps
        const width = style?.width
        return (
          <motion.div
            {...(rest as React.ComponentProps<typeof motion.div>)}
            style={{ ...style, width: undefined }}
            initial={false}
            animate={{ width }}
            transition={spring.linear}
          />
        )
      }}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
