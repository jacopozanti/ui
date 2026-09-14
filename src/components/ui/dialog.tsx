"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { motion } from "motion/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  MotionOverlayProvider,
  forMotion,
  backdropVariants,
  modalVariants,
  exitFast,
  spring,
  useOverlayActionsRef,
  useOverlayMotion,
} from "@/lib/motion"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return (
    <MotionOverlayProvider>
      <DialogRoot {...props} />
    </MotionOverlayProvider>
  )
}

function DialogRoot({ ...props }: DialogPrimitive.Root.Props) {
  // Inside the provider, so the popup can defer its own unmount.
  const actionsRef = useOverlayActionsRef<DialogPrimitive.Root.Actions>()
  return <DialogPrimitive.Root data-slot="dialog" actionsRef={actionsRef} {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  // No `keepMounted`: the popup mounts when it opens and stays until the
  // closing animation calls `unmount()` through the actions ref. Keeping it
  // mounted as well would contradict that — the element would never leave, and
  // every dialog on the page would sit in the DOM waiting.
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      render={(renderProps, state) => (
        <motion.div
          {...forMotion(renderProps)}
          initial="closed"
          animate={state.open ? "open" : "closed"}
          variants={backdropVariants}
        />
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-6 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none sm:max-w-md",
          className
        )}
        render={(renderProps, state) => (
          <DialogPopup {...forMotion(renderProps)} open={state.open} />
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/**
 * Split out because the unmount hook has to run inside the popup's own render —
 * calling it in DialogContent's body would tie it to the wrong lifecycle.
 */
function DialogPopup({
  open,
  ...props
}: React.ComponentProps<typeof motion.div> & { open: boolean }) {
  const overlay = useOverlayMotion(open)
  return <motion.div {...props} {...overlay} variants={modalVariants} />
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
