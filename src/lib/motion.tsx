"use client"

import * as React from "react"
import { motion, type Transition, type Variants } from "motion/react"

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

/**
 * Where a popup comes from, given the side of its anchor it sits on: a menu
 * below its trigger rises the last few pixels into place, one above it sinks.
 * Small — four pixels — because `--transform-origin` already makes the scale
 * grow out of the trigger, and the offset only has to confirm the direction.
 */
function offsetFor(side: string) {
  switch (side) {
    case "top":
      return { y: 4 }
    case "bottom":
      return { y: -4 }
    case "left":
    case "inline-start":
      return { x: 4 }
    case "right":
    case "inline-end":
      return { x: -4 }
    default:
      return {}
  }
}

export function popupVariants(side: string, transition: Transition = spring.soft): Variants {
  return {
    open: { opacity: 1, scale: 1, x: 0, y: 0, transition },
    closed: { opacity: 0, scale: 0.96, ...offsetFor(side), transition: exitFast },
  }
}

/**
 * The body of every anchored popup — menus, popovers, tooltips, selects. Each
 * one still chooses its own spring; what they share is the shape of the
 * gesture, so a dropdown and a select do not feel like two different products.
 *
 * Pair with `<MotionOverlayProvider>` and an `actionsRef` on the root, or the
 * popup will vanish instead of leaving.
 */
export function MotionPopup({
  open,
  side,
  transition,
  fadeOnly = false,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  open: boolean
  side: string
  transition?: Transition
  /**
   * Opacity only, no scale and no offset. For a popup positioned so that its
   * content lines up with the trigger — a select whose chosen item sits
   * exactly over the button — where any movement would read as a jump.
   */
  fadeOnly?: boolean
}) {
  const overlay = useOverlayMotion(open)
  const variants = React.useMemo(
    () => (fadeOnly ? fadeVariants : popupVariants(side, transition)),
    [fadeOnly, side, transition],
  )
  return <motion.div {...props} {...overlay} variants={variants} />
}

const fadeVariants: Variants = {
  open: { opacity: 1, transition: { duration: 0.1 } },
  closed: { opacity: 0, transition: exitFast },
}

/**
 * A centred modal surface: it scales up from just under full size and drifts
 * the last couple of percent upward. Centering lives here, not in a
 * `-translate-x-1/2` class. Tailwind v4 compiles that class to the separate CSS
 * `translate` property, which Motion's `transform` adds to rather than replaces
 * — so with the drift animated here as a percentage too, keeping the class would
 * offset the dialog twice.
 */
export const modalVariants: Variants = {
  open: { opacity: 1, scale: 1, x: "-50%", y: "-50%", transition: spring.heavy },
  closed: { opacity: 0, scale: 0.96, x: "-50%", y: "-48%", transition: exitFast },
}

/**
 * A panel anchored to an edge. It slides in from its own side by 40px rather
 * than from fully off-screen: the distance reads as "it was just there", and a
 * full-width slide on a large screen is a long way to travel for no extra
 * meaning.
 */
export function sheetVariants(side: "top" | "right" | "bottom" | "left"): Variants {
  const from = {
    top: { y: -40 },
    bottom: { y: 40 },
    left: { x: -40 },
    right: { x: 40 },
  }[side]
  return {
    open: { opacity: 1, x: 0, y: 0, transition: spring.heavy },
    closed: { opacity: 0, ...from, transition: exitFast },
  }
}

const panelVariants: Variants = {
  open: { height: "auto", opacity: 1, transition: spring.soft },
  closed: { height: 0, opacity: 0, transition: exitFast },
}

/**
 * A disclosure panel that collapses to its content height and back — the body
 * of an accordion item or a collapsible.
 *
 * Base UI marks a closed panel `hidden`, which is `display: none`: nothing
 * left to animate. Dropping that attribute would let the height reach zero,
 * but a zero-height panel is still in the tab order and still read aloud —
 * invisible content a keyboard user can land in. So `hidden` is managed here
 * instead: gone the moment the panel opens (Motion needs it displayed to
 * measure `auto`), back only once the closing animation has finished.
 *
 * Padding belongs on a child, never on this element. With border-box sizing a
 * padded box cannot be shorter than its padding, so it would stop collapsing a
 * few pixels short and leave a sliver showing.
 */
export function MotionPanel({
  open,
  hidden: _baseHidden,
  ...props
}: React.ComponentProps<typeof motion.div> & { open: boolean }) {
  const [collapsed, setCollapsed] = React.useState(!open)
  // Adjusting state during render, React's pattern for state derived from a
  // prop: opening must un-hide before paint, or `auto` measures as zero.
  if (open && collapsed) setCollapsed(false)

  return (
    <motion.div
      {...props}
      hidden={collapsed}
      initial={false}
      animate={open ? "open" : "closed"}
      variants={panelVariants}
      style={{ overflow: "hidden", ...props.style }}
      onAnimationComplete={(definition) => {
        if (definition === "closed") setCollapsed(true)
      }}
    />
  )
}
