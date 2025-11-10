'use client'

import {useState, useMemo, useCallback, useEffect} from 'react'
import {Slot} from '@radix-ui/react-slot'
import {PanelLeft} from 'lucide-react'
import {type VariantProps, cva} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'
import {SidebarContext, useSidebar} from './context'
import {useIsMobile} from '@/src/hooks/use-is-mobile'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/src/components/ui/tooltip'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {Separator} from '@/src/components/ui/separator'
import {Sheet, SheetContent, SheetTitle} from '@/src/components/ui/sheet'
import {Skeleton} from '@/src/components/ui/skeleton'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '18rem'
const SIDEBAR_WIDTH_MOBILE = '16rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

interface SidebarProviderProps extends React.ComponentPropsWithRef<'div'> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = useState(false)
  const isMobile = useIsMobile()

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = useCallback(
    function (value: boolean | ((value: boolean) => boolean)) {
      const openState = typeof value === 'function' ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(
    function () {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    },
    [isMobile, setOpen, setOpenMobile]
  )

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = useMemo<SidebarContext>(
    function () {
      return {
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }
    },
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(
    function () {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return function () {
        return window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [toggleSidebar]
  )

  return (
    <SidebarContext value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            'min-h-svh w-full flex group/sidebar-wrapper',
            className
          )}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  )
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const {isMobile, state, openMobile, setOpenMobile} = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        className={cn('w-[--sidebar-width] flex flex-col h-full', className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet
        open={openMobile}
        onOpenChange={setOpenMobile}
        {...props}
      >
        <SheetContent
          className='p-0 w-[--sidebar-width] [&>button]:hidden'
          data-sidebar='sidebar'
          data-mobile='true'
          aria-describedby={undefined}
          side={side}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
        >
          <SheetTitle className='sr-only'>{'Sidebar Content'}</SheetTitle>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      className='hidden md:block peer group'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear duration-200 group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
        )}
      />
      <div
        className={cn(
          'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          className='flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow'
          data-sidebar='sidebar'
        >
          {children}
        </div>
      </div>
    </aside>
  )
}

function SidebarTrigger({
  onClick,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const {toggleSidebar} = useSidebar()

  return (
    <Button
      aria-label='Toggle Sidebar'
      data-sidebar='trigger'
      variant='icon-button'
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
    </Button>
  )
}

function SidebarContent({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        'pt-0 px-4 min-h-0 flex flex-1 flex-col bg-app-surface-solid overflow-auto group-data-[collapsible=icon]:overflow-hidden sm:px-8',
        className
      )}
      data-sidebar='content'
      {...props}
    />
  )
}

function SidebarMenu({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) {
  return (
    <ul
      className={cn('space-y-8 w-full min-w-0 flex flex-col', className)}
      data-sidebar='menu'
      {...props}
    />
  )
}

function SidebarMenuItem({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  return (
    <li
      className={cn('group/menu-item relative', className)}
      data-sidebar='menu-item'
      {...props}
    />
  )
}

function SidebarRail({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const {toggleSidebar} = useSidebar()

  return (
    <button
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex in-data-left:cursor-w-resize in-data-right:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      data-sidebar='rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      {...props}
    />
  )
}

function SidebarInset({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <main
      className={cn(
        'relative flex-1 flex flex-col min-h-svh peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Input>) {
  return (
    <Input
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className
      )}
      data-sidebar='input'
      {...props}
    />
  )
}

function SidebarHeader({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('py-8 flex justify-center gap-2', className)}
      data-sidebar='header'
      {...props}
    />
  )
}

function SidebarFooter({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('p-2 flex flex-col gap-2', className)}
      data-sidebar='footer'
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Separator>) {
  return (
    <Separator
      className={cn('mx-2 w-auto', className)}
      data-sidebar='separator'
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  [
    'p-4',
    'relative',
    'flex',
    'items-center',
    'justify-start',
    'gap-3',
    'bg-app-surface',
    'text-app-foreground',
    'font-bold',
    'border',
    'rounded',
    'cursor-pointer',
    '[&:not(:disabled)]:hover:bg-brand-gray-12',
    '[&:not(:disabled)]:hover:border-border-hover',
    'active:bg-brand-gray-11/50',
    'disabled:opacity-30',
    'data-disabled:opacity-30',
    '[&>*]:shrink-0'
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:bg-sidebar-accent',
          'hover:text-sidebar-accent-foreground'
        ],
        outline: [
          'bg-background',
          'shadow-[0_0_0_1px_hsl(var(--sidebar-border))]',
          'hover:bg-sidebar-accent',
          'hover:text-sidebar-accent-foreground',
          'hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
        ]
      },
      size: {
        default: ['text-base'],
        sm: ['text-xs'],
        lg: ['text-sm', 'group-data-[collapsible=icon]:!p-0']
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof sidebarMenuButtonVariants> &
  AsChild & {
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  }) {
  const {isMobile, state} = useSidebar()
  const Comp = asChild ? Slot : 'button'

  const button = (
    <Comp
      className={cn(sidebarMenuButtonVariants({variant, size}), className)}
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  AsChild & {
    showOnHover?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
        className
      )}
      data-sidebar='menu-action'
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='menu-badge'
      {...props}
    />
  )
}

function SidebarGroup({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('p-2 relative w-full min-w-0 flex flex-col', className)}
      data-sidebar='group'
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AsChild) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'px-2  h-8 shrink-0 flex items-center rounded-md text-xs font-medium outline-none transition-[margin,opacity] ease-linear duration-200 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      data-sidebar='group-label'
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('w-full text-sm', className)}
      data-sidebar='group-content'
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  AsChild) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='group-action'
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  random,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  random?: number
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(random ?? 1 * 40) + 50}%`
  }, [random])

  return (
    <div
      className={cn('px-2 h-8 flex items-center gap-2 rounded-md', className)}
      data-sidebar='menu-skeleton'
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 flex-1 max-w-[--skeleton-width]'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) {
  return (
    <ul
      data-sidebar='menu-sub'
      className={cn(
        'px-2.5 py-0.5 mx-3.5 min-w-0 flex flex-col gap-1 border-l translate-x-px group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  ...props
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  return <li {...props} />
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  AsChild & {
    size?: 'sm' | 'md'
    isActive?: boolean
  }) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:hidden',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        className
      )}
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      {...props}
    />
  )
}

SidebarProvider.displayName = 'SidebarProvider'
Sidebar.displayName = 'Sidebar'
SidebarTrigger.displayName = 'SidebarTrigger'
SidebarRail.displayName = 'SidebarRail'
SidebarInset.displayName = 'SidebarInset'
SidebarInput.displayName = 'SidebarInput'
SidebarHeader.displayName = 'SidebarHeader'
SidebarFooter.displayName = 'SidebarFooter'
SidebarSeparator.displayName = 'SidebarSeparator'
SidebarContent.displayName = 'SidebarContent'
SidebarGroup.displayName = 'SidebarGroup'
SidebarGroupLabel.displayName = 'SidebarGroupLabel'
SidebarGroupAction.displayName = 'SidebarGroupAction'
SidebarGroupContent.displayName = 'SidebarGroupContent'
SidebarMenu.displayName = 'SidebarMenu'
SidebarMenuItem.displayName = 'SidebarMenuItem'
SidebarMenuButton.displayName = 'SidebarMenuButton'
SidebarMenuAction.displayName = 'SidebarMenuAction'
SidebarMenuBadge.displayName = 'SidebarMenuBadge'
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton'
SidebarMenuSub.displayName = 'SidebarMenuSub'
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar
}
