"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { LayoutGroup, motion } from "motion/react"
import { cn } from "cn"

import { spring } from "@/lib/motion"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  /*
   * Every trigger's indicator shares a `layoutId`, which is what makes it slide
   * rather than reappear. That id is global to the page unless scoped: without
   * this group, two Tabs side by side would fling the pill from one to the
   * other.
   */
  const id = React.useId()
  return (
    <LayoutGroup id={id}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          "group/tabs flex gap-2 data-horizontal:flex-col",
          className
        )}
        {...props}
      />
    </LayoutGroup>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

/*
 * The active tab's highlight, as one element that travels. It used to be a
 * background painted on whichever trigger was active — which could only jump —
 * and, for the line variant, an `after:` underline that faded in place.
 *
 * `-z-10` inside the trigger's `isolate` context: below the label, above the
 * list's muted background. Without the isolation the pill would sink behind the
 * list and vanish.
 */
const indicatorClass = cn(
  "absolute -z-10",
  // default: a raised pill filling the tab
  "group-data-[variant=default]/tabs-list:inset-0 group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:bg-background group-data-[variant=default]/tabs-list:shadow-sm dark:group-data-[variant=default]/tabs-list:border dark:group-data-[variant=default]/tabs-list:border-input dark:group-data-[variant=default]/tabs-list:bg-input/30",
  // line: a bar under (or beside) the tab
  "group-data-[variant=line]/tabs-list:bg-foreground",
  "group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:inset-x-0 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:-bottom-[5px] group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:h-0.5",
  "group-data-vertical/tabs:group-data-[variant=line]/tabs-list:inset-y-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:-right-1 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:w-0.5"
)

function TabsTrigger({ className, children, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative isolate inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent dark:",
        "data-active:text-foreground dark:data-active:text-foreground",
        className
      )}
      render={(renderProps, state) => (
        <button {...renderProps}>
          {state.active && (
            <motion.span
              layoutId="tabs-indicator"
              data-slot="tabs-indicator"
              className={indicatorClass}
              transition={spring.soft}
            />
          )}
          {renderProps.children}
        </button>
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
