import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Alert {
  name: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

const notifications: Alert[] = [
  {
    name: "Hearing tomorrow",
    description: "Sharma v. State of UP — Court 7, 10:30 AM",
    time: "1m ago",
    icon: "⚖️",
    color: "#006840",
  },
  {
    name: "Judgment cited",
    description: "Your draft cites Arnesh Kumar (2014).",
    time: "4m ago",
    icon: "📑",
    color: "#0d7a4f",
  },
  {
    name: "New SC ruling",
    description: "Anticipatory bail under BNSS s.482 expanded.",
    time: "12m ago",
    icon: "🏛️",
    color: "#34d399",
  },
  {
    name: "Co-counsel review",
    description: "Adv. Mehra signed off on the rejoinder.",
    time: "24m ago",
    icon: "✍️",
    color: "#006840",
  },
  {
    name: "Filing reminder",
    description: "Counter-affidavit due in 3 days.",
    time: "1h ago",
    icon: "⏰",
    color: "#065f46",
  },
];

const Notification = ({ name, description, icon, color, time }: Alert) => (
  <figure
    className={cn(
      "relative mx-auto min-h-fit w-full max-w-[360px] cursor-pointer overflow-hidden rounded-2xl p-3",
      "transition-all duration-300 ease-out-expo hover:scale-[103%]",
      "bg-white shadow-[0_1px_3px_rgba(15,16,20,0.06),0_8px_24px_-12px_rgba(15,16,20,0.12)]",
      "transform-gpu dark:bg-[#1c1c1f] dark:shadow-[0_-1px_0_0_rgba(255,255,255,0.04)_inset,0_2px_4px_rgba(0,0,0,0.4)]",
    )}
  >
    <div className="flex flex-row items-center gap-3">
      <div
        className="flex size-9 items-center justify-center rounded-2xl text-base"
        style={{ backgroundColor: `${color}22`, color }}
        aria-hidden="true"
      >
        <span>{icon}</span>
      </div>
      <div className="flex min-w-0 flex-col overflow-hidden">
        <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium text-foreground">
          <span className="truncate">{name}</span>
          <span className="mx-1 text-foreground/35">·</span>
          <span className="text-[11px] text-foreground/45">{time}</span>
        </figcaption>
        <p className="truncate text-xs font-normal text-foreground/55">{description}</p>
      </div>
    </div>
  </figure>
);

const AnimatedListDemo = ({ className }: { className?: string }) => (
  <div className={cn("relative flex h-[420px] w-full flex-col overflow-hidden", className)}>
    <AnimatedList>
      {notifications.map((item, idx) => (
        <Notification {...item} key={`${item.name}-${idx}`} />
      ))}
    </AnimatedList>
  </div>
);

export default AnimatedListDemo;
