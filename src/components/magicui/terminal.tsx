import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SequenceContextValue {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
  cycle: number;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);
const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

interface AnimatedSpanProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
  startOnView?: boolean;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);
  const hasSequence = Boolean(sequence);
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex;
  const sequenceCycle = sequence?.cycle;

  useEffect(() => {
    setHasStarted(false);
  }, [sequenceCycle]);

  useEffect(() => {
    if (!hasSequence || itemIndex === null) return;
    if (!sequenceStarted) return;
    if (hasStarted) return;
    if (sequenceActiveIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [hasSequence, sequenceStarted, sequenceActiveIndex, sequenceCycle, hasStarted, itemIndex]);

  const shouldAnimate = hasSequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: hasSequence ? 0 : delay / 1000 }}
      className={cn("grid font-mono text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        if (!shouldAnimate || !sequence || itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TypingAnimationProps extends HTMLMotionProps<"span"> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType;
  startOnView?: boolean;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 45,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }

  const MotionComponent = useMemo(
    () =>
      motion.create(Component, {
        forwardMotionProps: true,
      }),
    [Component],
  );

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const completeItemRef = useRef(sequence?.completeItem);
  completeItemRef.current = sequence?.completeItem;
  const hasSequence = Boolean(sequence);
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex;
  const sequenceCycle = sequence?.cycle;

  useEffect(() => {
    setDisplayedText("");
    setStarted(false);
  }, [sequenceCycle]);

  useEffect(() => {
    if (hasSequence && itemIndex !== null) {
      if (!sequenceStarted) return;
      if (started) return;
      if (sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
      return;
    }

    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(startTimeout);
    }

    if (!isInView) return;
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay, startOnView, isInView, started, hasSequence, sequenceStarted, sequenceActiveIndex, sequenceCycle, itemIndex]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i += 1;
      } else {
        clearInterval(typingEffect);
        if (completeItemRef.current && itemIndex !== null) {
          completeItemRef.current(itemIndex);
        }
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, started, itemIndex, sequence?.cycle]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("font-mono text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
      {started && displayedText.length < children.length ? (
        <span className="ml-px inline-block h-[1.1em] w-[0.55em] animate-pulse bg-emerald-400/90 align-[-0.1em]" />
      ) : null}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: ReactNode;
  className?: string;
  sequence?: boolean;
  startOnView?: boolean;
  loop?: boolean;
  loopDelay?: number;
  paused?: boolean;
  header?: ReactNode;
}

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
  loop = false,
  loopDelay = 3200,
  paused = false,
  header,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loopTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [viewStarted, setViewStarted] = useState(!startOnView);

  const itemCount = useMemo(() => Children.count(children), [children]);

  useEffect(() => {
    if (!startOnView) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setViewStarted(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    return () => {
      if (loopTimeoutRef.current !== null) {
        window.clearTimeout(loopTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (viewStarted && !paused) {
      setActiveIndex(0);
      setCycle((current) => current + 1);
    }
  }, [viewStarted, paused]);

  const sequenceHasStarted = sequence ? viewStarted && !paused : false;

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null;
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => {
          if (index !== current) return current;

          const next = current + 1;
          if (loop && next >= itemCount) {
            if (loopTimeoutRef.current !== null) {
              window.clearTimeout(loopTimeoutRef.current);
            }
            loopTimeoutRef.current = window.setTimeout(() => {
              setCycle((value) => value + 1);
              setActiveIndex(0);
            }, loopDelay);
          }

          return next;
        });
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
      cycle,
    };
  }, [sequence, activeIndex, sequenceHasStarted, cycle, loop, loopDelay, itemCount]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={`${cycle}-${index}`} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence, cycle]);

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "z-0 flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
        <div className="flex flex-row gap-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
        </div>
        {header ? <div className="truncate font-mono text-[11px] text-zinc-500">{header}</div> : null}
      </div>
      <pre className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4 md:p-6">
        <code className="grid h-full content-start gap-y-1.5 overflow-auto font-mono text-[11px] sm:text-xs md:text-[0.9375rem]">
          {wrappedChildren}
        </code>
      </pre>
    </div>
  );

  if (!sequence) return content;

  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
};
