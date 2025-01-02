import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import clsx from "clsx";

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={clsx("fixed inset-0 z-50 bg-black/80", className)}
      {...rest}
    />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={clsx(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-neutral-black bg-neutral-white",
          className
        )}
        {...rest}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-accent-gray" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...rest}
    />
  );
};
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx("mt-auto flex flex-col gap-2 p-4", className)}
      {...rest}
    />
  );
};
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={clsx(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...rest}
    />
  );
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={clsx("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};