import { AnimatePresence, motion } from "framer-motion";
import {
  Children,
  type ComponentPropsWithoutRef,
  memo,
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  delay?: number;
}

const ITEM_ANIMS = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, originY: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring" as const, stiffness: 350, damping: 40 },
};

function AnimatedListItem({ children }: { children: ReactNode }) {
  return (
    <motion.div {...ITEM_ANIMS} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export const AnimatedList = memo(({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, delay, items.length]);

  const visible = useMemo(() => {
    const windowSize = Math.min(items.length, 4);
    const start = Math.max(0, index + 1 - windowSize);
    return items.slice(start, index + 1).reverse();
  }, [index, items]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)} {...props}>
      <AnimatePresence>
        {visible.map((item) => (
          <AnimatedListItem key={(item as ReactElement).key ?? ""}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});
AnimatedList.displayName = "AnimatedList";
