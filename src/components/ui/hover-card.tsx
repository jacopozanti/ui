"use client"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "cn"

import {
  MotionOverlayProvider,
  MotionPopup,
  forMotion,
  spring,
  useOverlayActionsRef,
} from "@/lib/motion"

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return (
    <MotionOverlayProvider>
      <HoverCardRoot {...props} />
    </MotionOverlayProvider>
  )
}

function HoverCardRoot({ ...props }: PreviewCardPrimitive.Root.Props) {
  // Inside the provider, so the popup can defer its own unmount.
  const actionsRef = useOverlayActionsRef<PreviewCardPrimitive.Root.Actions>()
  return <PreviewCardPrimitive.Root data-slot="hover-card" actionsRef={actionsRef} {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden",
            className
          )}
          render={(renderProps, state) => (
            <MotionPopup
              {...forMotion(renderProps)}
              open={state.open}
              side={state.side}
              transition={spring.soft}
            />
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
