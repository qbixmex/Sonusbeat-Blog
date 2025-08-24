import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean;
  href: string;
  disabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  href,
  size = "icon",
  disabled = false,
  ...props
}: PaginationLinkProps) {
  const baseClassName = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    {
      "cursor-not-allowed opacity-50": disabled,
    },
    className
  );

  if (disabled) {
    return (
      <span
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        className={baseClassName}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={baseClassName}
      {...props}
    />
  )
}

function PaginationPrevious({
  title = "Previous",
  disabled = false,
  className,
  ...props
}: { title?: string } & React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(["gap-1 px-2.5 sm:pl-2.5", className, {
        "cursor-not-allowed text-gray-500 hover:text-gray-500": disabled,
      }])}
      disabled={disabled}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">{title}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  title = "Next",
  className,
  disabled = false,
  ...props
}: { title?: string } & React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      disabled={disabled}
      {...props}
    >
      <span className="hidden sm:block">{title}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
