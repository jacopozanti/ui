"use client"

import * as React from "react"
import type { Transition, Variants } from "motion/react"

/**
 * The library's motion system.
 *
 * Animation here is a token set, like colour and radius: components do not
 * invent their own timings, they pick a named spring. That is what keeps
 * forty-nine components that each move differently still feeling like one
 * library — a menu and a dialog open with different shapes, but at the same
 * tempo.
 *
 * Springs rather than durations: a spring interrupted halfway continues from
 * where it is, which is what makes a menu opened and closed quickly feel
 * attached to the pointer instead of restarting.
 */
export const spring = {
  /** Small, frequent things: menu items, checkboxes, switches. Quick, no overshoot. */
  snappy: { type: "spring", stiffness: 550, damping: 40, mass: 0.6 },
  /** Popups and panels: the default for anything that appears over the page. */
  soft: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 },
  /** Larger surfaces — dialogs, sheets — where a slower settle reads as weight. */
  heavy: { type: "spring", stiffness: 280, damping: 30, mass: 1 },
  /** Deliberate overshoot, for things that should feel playful when they land. */
  bouncy: { type: "spring", stiffness: 420, damping: 18, mass: 0.7 },
  /** Continuous values (progress, sliders) where a spring would wobble. */
  linear: { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 0.2 },
} satisfies Record<string, Transition>

/**
 * Exit is faster than enter, everywhere. Getting out of the way should never
 * make the user wait; arriving can afford to be seen.
 */
export const exitFast: Transition = { type: "tween", ease: [0.4, 0, 1, 1], duration: 0.12 }

/** The backdrop behind every modal surface: it only ever fades. */
export const backdropVariants: Variants = {
  open: { opacity: 1, transition: { duration: 0.15 } },
  closed: { opacity: 0, transition: exitFast },
}

export interface OverlayActions {
  unmount: () => void
}

/*
 * Base UI owns the mounting of its popups, and unmounts them as soon as they
 * close — before an exit animation could play. It hands control back through
 * `actionsRef`: with the portal kept mounted, the popup stays in the DOM until
 * `unmount()` says otherwise, which is exactly when the closing animation has
 * finished.
 *
 * The ref belongs on the root and the animation on the popup, which in this
 * library are two different components, so it travels between them by context.
 */
const ActionsContext = React.createContext<React.RefObject<OverlayActions | null> | null>(null)

export function MotionOverlayProvider({ children }: { children: React.ReactNode }) {
  const actionsRef = React.useRef<OverlayActions | null>(null)
  return <ActionsContext.Provider value={actionsRef}>{children}</ActionsContext.Provider>
}

/**
 * For the root: the ref Base UI writes its actions into.
 *
 * Generic because each root declares its own Actions type — every one of them
 * has `unmount`, which is all this file calls, but `Select`'s lacks the `close`
 * the others have, and a `RefObject` will not widen. The caller names its own
 * type; the contract enforced here stays the minimum they share.
 */
export function useOverlayActionsRef<T extends OverlayActions>() {
  const ref = React.useContext(ActionsContext)
  if (!ref) {
    throw new Error("useOverlayActionsRef must be used inside <MotionOverlayProvider>")
  }
  return ref as React.RefObject<T | null>
}

/**
 * Base UI hands its render props typed as plain React HTML attributes, and
 * Motion redefines a handful of those with different signatures: `onDrag` is a
 * pan callback rather than a DOM drag event, and the animation lifecycle
 * handlers report variants rather than CSS animations. Dropping them is
 * correct, not a workaround — on these elements Motion owns exactly those
 * events, and Base UI never passes them.
 */
export function forMotion<T extends object>(props: T) {
  const {
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    onAnimationIteration: _onAnimationIteration,
    ...rest
  } = props as T & Record<string, unknown>
  return rest
}

/**
 * For the popup: it enters from `closed`, follows the open state, and defers its
 * unmount until the closing animation has actually finished.
 *
 * Giving the backdrop and the popup the same open/closed vocabulary is what
 * keeps the two in step — they are one gesture, not two animations that happen
 * to overlap.
 */
export function useOverlayMotion(open: boolean) {
  const actionsRef = React.useContext(ActionsContext)
  /*
   * Only a close that follows an open may unmount. Motion reports the initial
   * `closed` render as a completed animation too, and unmounting on that one
   * tears the popup out from under Base UI before it has finished opening —
   * which looks exactly like a popup that never animates at all.
   */
  const hasOpened = React.useRef(false)
  if (open) hasOpened.current = true

  const onAnimationComplete = React.useCallback(
    (definition: unknown) => {
      if (definition === "closed" && hasOpened.current) {
        hasOpened.current = false
        actionsRef?.current?.unmount()
      }
    },
    [actionsRef],
  )
  return { initial: "closed", animate: open ? "open" : "closed", onAnimationComplete }
}
