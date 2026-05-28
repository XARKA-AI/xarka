import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

type TerminalDemoProps = {
  paused?: boolean;
};

const TerminalDemo = ({ paused = false }: TerminalDemoProps) => (
  <Terminal
    loop
    loopDelay={3600}
    paused={paused}
    className="h-full w-full max-h-none max-w-none rounded-none border-0 bg-[#0a0e0c] text-zinc-100 shadow-none"
  >
    <TypingAnimation duration={38}>&gt; xarka-bot deploy --cluster in-prod-01 --profile sovereign</TypingAnimation>

    <AnimatedSpan className="text-amber-400/90">[09:14:02] PHASE · BUILD</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ vpc sealed · inference plane online · 3/3 pods ready</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ model registry synced · training pipeline bound to on-prem GPU</AnimatedSpan>

    <TypingAnimation duration={38} className="text-zinc-400">
      &gt; xarka-bot operate --sla 99.95 --observability full --retrain auto
    </TypingAnimation>

    <AnimatedSpan className="text-amber-400/90">[09:18:41] PHASE · OPERATE</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ healthcheck passed · p99 latency 142ms · audit stream connected</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ drift monitors armed · retraining loop active · zero data egress</AnimatedSpan>

    <TypingAnimation duration={38} className="text-zinc-400">
      &gt; xarka-bot transfer --target client-sre --package full --ip-assign
    </TypingAnimation>

    <AnimatedSpan className="text-amber-400/90">[11:02:19] PHASE · TRANSFER</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ runbooks delivered · 4 engineering workshops complete</AnimatedSpan>
    <AnimatedSpan className="text-emerald-400">✓ ip assignment signed · models · datasets · workflows client-owned</AnimatedSpan>

    <AnimatedSpan className="text-sky-400">
      <span>ℹ manifest</span>
      <span className="pl-2 text-zinc-400">handover/in-prod-01/2026-05-27/manifest.json</span>
    </AnimatedSpan>

    <TypingAnimation className="text-emerald-300/95" duration={42}>
      status: handed_over · BUILD · OPERATE · TRANSFER · vendor dependency: none
    </TypingAnimation>
  </Terminal>
);

export default TerminalDemo;
