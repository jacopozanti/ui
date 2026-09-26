"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { motion } from "motion/react"
import { cn } from "cn"

import { exitFast, spring } from "@/lib/motion"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        // Kept mounted so the tick can undraw on uncheck, instead of vanishing.
        keepMounted
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current [&>svg]:size-3.5"
        render={(renderProps, state) => (
          <span {...renderProps}>
            <Tick checked={state.checked} />
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  )
}

/**
 * The tick draws itself rather than appearing. lucide's check path runs from
 * the long stroke to the short one; this one is reversed, so `pathLength`
 * draws it the way a hand would — down into the corner, then up and out.
 */
function Tick({ checked }: { checked: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <motion.path
        d="M4 12l5 5L20 6"
        initial={false}
        animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={checked ? spring.snappy : exitFast}
      />
    </svg>
  )
}

export { Checkbox }
