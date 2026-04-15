import * as React from "react";
import { cn } from "../../lib/utils";

function Empty({ className, ...props }) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-h-60 flex-col items-center justify-center gap-6 rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    />
  );
}

function EmptyMedia({ variant = "icon", className, ...props }) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(
        "flex items-center justify-center",
        "data-[variant=icon]:bg-muted data-[variant=icon]:text-muted-foreground data-[variant=icon]:size-12 data-[variant=icon]:rounded-full data-[variant=icon]:[&_svg]:size-5",
        "data-[variant=illustration]:max-h-32",
        className
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col gap-1", className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function EmptyActions({ className, ...props }) {
  return (
    <div
      data-slot="empty-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};