import { useState, useEffect } from "react";
import {
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  X,
  Menu,
  Ticket,
  ChevronRight,
} from "lucide-react";

const FESTIVAL_DATE = new Date("2025-07-18T18:00:00");

type Day = "FRI" | "SAT" | "SUN";

const DAY_LABELS: Record<Day, string> = {
  FRI: "FRI · JUL 18",
  SAT: "SAT · JUL 19",
  SUN: "SUN · JUL 20",
};

const LINEUP: Record<Day, { name: string; time: string; stage: string; headliner: boolean }[]> = {
  FRI: [
    { name: "RÜFÜS DU SOL", time: "10:30 PM", stage: "Main Stage", headliner: true },
    { name: "FLOATING POINTS", time: "8:45 PM", stage: "Frequency Stage", headliner: false },
    { name: "MOLLY NILSSON", time: "7:00 PM", stage: "Underground", headliner: false },
    { name: "YAEJI", time: "5:30 PM", stage: "Frequency Stage", headliner: false },
    { name: "SHYGIRL", time: "4:00 PM", stage: "Main Stage", headliner: false },
    { name: "KAS:ST", time: "2:30 PM", stage: "Underground", headliner: false },
  ],
  SAT: [
    { name: "FOUR TET", time: "10:30 PM", stage: "Main Stage", headliner: true },
    { name: "JAMIE XX", time: "8:45 PM", stage: "Main Stage", headliner: false },
    { name: "JON HOPKINS", time: "7:00 PM", stage: "Frequency Stage", headliner: false },
    { name: "OBJEKT", time: "5:30 PM", stage: "Underground", headliner: false },
    { name: "SOFIA KOURTESIS", time: "4:00 PM", stage: "Frequency Stage", headliner: false },
    { name: "CALL SUPER", time: "2:30 PM", stage: "Underground", headliner: false },
  ],
  SUN: [
    { name: "CAROLINE POLACHEK", time: "10:00 PM", stage: "Main Stage", headliner: true },
    { name: "BONOBO", time: "8:15 PM", stage: "Main Stage", headliner: false },
    { name: "LORAINE JAMES", time: "6:30 PM", stage: "Frequency Stage", headliner: false },
    { name: "KELLY LEE OWENS", time: "5:00 PM", stage: "Underground", headliner: false },
    { name: "YUGEN BLAKROK", time: "3:30 PM", stage: "Frequency Stage", headliner: false },
    { name: "LAUREL HALO", time: "2:00 PM", stage: "Underground", headliner: false },
  ],
};

const TICKETS = [
  {
    tier: "DAY PASS",
    price: 89,
    note: "Single day of your choice",
    perks: [
      "One-day general admission",
      "Access to all stages",
      "Festival map & guide",
      "Mobile ticket delivery",
    ],
    highlight: false,
    badge: null,
  },
  {
    tier: "WEEKEND PASS",
    price: 249,
    note: "All three days",
    perks: [
      "3-day general admission",
      "Access to all stages",
      "Early entry (30 mins)",
      "Voltage merch bag",
      "Artist Q&A sessions",
      "Mobile ticket delivery",
    ],
    highlight: true,
    badge: "MOST POPULAR",
  },
  {
    tier: "VIP",
    price: 599,
    note: "All access, all weekend",
    perks: [
      "3-day all-access pass",
      "Premium viewing decks",
      "VIP hospitality lounge",
      "Backstage passes",
      "Artist meet & greet",
      "Curated food & bar access",
      "Dedicated VIP entry lane",
    ],
    highlight: false,
    badge: null,
  },
];

const SCHEDULE: Record<Day, { time: string; artist: string; stage: string }[]> = {
  FRI: [
    { time: "2:30 PM", artist: "KAS:ST", stage: "Underground" },
    { time: "4:00 PM", artist: "SHYGIRL", stage: "Main Stage" },
    { time: "5:30 PM", artist: "YAEJI", stage: "Frequency Stage" },
    { time: "7:00 PM", artist: "MOLLY NILSSON", stage: "Underground" },
    { time: "8:45 PM", artist: "FLOATING POINTS", stage: "Frequency Stage" },
    { time: "10:30 PM", artist: "RÜFÜS DU SOL", stage: "Main Stage" },
  ],
  SAT: [
    { time: "2:30 PM", artist: "CALL SUPER", stage: "Underground" },
    { time: "4:00 PM", artist: "SOFIA KOURTESIS", stage: "Frequency Stage" },
    { time: "5:30 PM", artist: "OBJEKT", stage: "Underground" },
    { time: "7:00 PM", artist: "JON HOPKINS", stage: "Frequency Stage" },
    { time: "8:45 PM", artist: "JAMIE XX", stage: "Main Stage" },
    { time: "10:30 PM", artist: "FOUR TET", stage: "Main Stage" },
  ],
  SUN: [
    { time: "2:00 PM", artist: "LAUREL HALO", stage: "Underground" },
    { time: "3:30 PM", artist: "YUGEN BLAKROK", stage: "Frequency Stage" },
    { time: "5:00 PM", artist: "KELLY LEE OWENS", stage: "Underground" },
    { time: "6:30 PM", artist: "LORAINE JAMES", stage: "Frequency Stage" },
    { time: "8:15 PM", artist: "BONOBO", stage: "Main Stage" },
    { time: "10:00 PM", artist: "CAROLINE POLACHEK", stage: "Main Stage" },
  ],
};

const STAGE_COLOR: Record<string, string> = {
  "Main Stage": "#c8f400",
  "Frequency Stage": "#ff2d6b",
  "Underground": "#a855f7",
};

const GALLERY = [
  { id: "1506157786151-b8491531f063", alt: "Festival crowd with hands raised", span: "col-span-2 row-span-1" },
  { id: "1599739291060-4578e77dac5d", alt: "Stage lights in purple orange and blue", span: "col-span-1 row-span-2" },
  { id: "1584352604394-c2c6f06e00c1", alt: "DJ at the mixing desk", span: "col-span-1 row-span-1" },
  { id: "1514525253161-7a46d19cd819", alt: "Crowd gathered in front of stage", span: "col-span-1 row-span-1" },
  { id: "1533174072545-7a4b6ad7a6c3", alt: "Open-air concert at night", span: "col-span-1 row-span-1" },
  { id: "1522601157550-4282ae97472d", alt: "Fire pyrotechnics burst on stage", span: "col-span-2 row-span-1" },
];

const SPONSORS = {
  presenting: ["Spotify", "Red Bull", "Resident Advisor"],
  gold: ["Ableton", "Pioneer DJ", "Native Instruments", "Shure"],
  community: ["Austin City Limits", "Beatport", "Boiler Room", "XLR8R", "Mixmag"],
};

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <span className="font-display text-5xl md:text-7xl leading-none text-[#c8f400] tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-[0.35em] uppercase mt-2 text-neutral-500 font-mono">{label}</span>
    </div>
  );
}

function DayTabs({
  active,
  onChange,
  activeColor = "#c8f400",
  activeTextColor = "text-black",
}: {
  active: Day;
  onChange: (d: Day) => void;
  activeColor?: string;
  activeTextColor?: string;
}) {
  return (
    <div className="flex gap-1">
      {(["FRI", "SAT", "SUN"] as Day[]).map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`px-4 py-2 text-[10px] tracking-widest uppercase font-mono font-bold transition-colors ${
            active === d
              ? `${activeTextColor}`
              : "border border-white/20 text-neutral-500 hover:border-white/50 hover:text-white"
          }`}
          style={active === d ? { backgroundColor: activeColor, color: activeColor === "#ff2d6b" ? "#fff" : "#000" } : {}}
        >
          {DAY_LABELS[d]}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lineupDay, setLineupDay] = useState<Day>("FRI");
  const [scheduleDay, setScheduleDay] = useState<Day>("FRI");
  const countdown = useCountdown(FESTIVAL_DATE);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl tracking-wider text-[#c8f400]">VOLTAGE</span>

          <div className="hidden md:flex items-center gap-8">
            {["Lineup", "Tickets", "Schedule", "Gallery", "Sponsors"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-[10px] tracking-[0.35em] uppercase font-mono text-neutral-400 hover:text-[#c8f400] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#tickets"
              className="hidden md:flex items-center gap-2 bg-[#c8f400] text-black text-[10px] font-mono font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-[#d4ff10] transition-colors"
            >
              <Ticket size={13} />
              Get Tickets
            </a>
            <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#080808] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {["Lineup", "Tickets", "Schedule", "Gallery", "Sponsors"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-[10px] tracking-[0.4em] uppercase font-mono text-neutral-300"
              >
                {s}
              </a>
            ))}
            <a
              href="#tickets"
              className="mt-2 bg-[#c8f400] text-black text-[10px] font-mono font-bold tracking-widest uppercase px-5 py-3 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Tickets
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop&auto=format"
            alt="Festival crowd with hands raised in the air"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#080808]" />
        </div>

        <div className="relative z-10 px-4 pt-20 w-full">
          <p className="text-[10px] tracking-[0.6em] uppercase text-[#c8f400] mb-6 font-mono">
            Riverside Park · Austin, TX
          </p>

          <h1
            className="font-display leading-none uppercase text-white w-full"
            style={{ fontSize: "clamp(5rem, 20vw, 18rem)" }}
          >
            VOLTAGE
          </h1>

          <p
            className="font-display tracking-[0.6em] uppercase text-[#ff2d6b] leading-none"
            style={{ fontSize: "clamp(1.25rem, 3vw, 3rem)", marginTop: "-0.5em" }}
          >
            FESTIVAL 2025
          </p>

          <p className="text-neutral-500 tracking-[0.4em] uppercase text-[10px] font-mono mt-4 mb-12">
            July 18 – 20, 2025
          </p>

          {/* Countdown */}
          <div className="flex items-start gap-4 md:gap-10 justify-center mb-14">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="font-display text-5xl md:text-7xl leading-none text-[#c8f400]/50 mt-1">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="font-display text-5xl md:text-7xl leading-none text-[#c8f400]/50 mt-1">:</span>
            <CountdownUnit value={countdown.minutes} label="Mins" />
            <span className="font-display text-5xl md:text-7xl leading-none text-[#c8f400]/50 mt-1">:</span>
            <CountdownUnit value={countdown.seconds} label="Secs" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#tickets"
              className="flex items-center gap-2 bg-[#c8f400] text-black font-mono font-bold tracking-widest uppercase px-10 py-4 text-xs hover:bg-[#d4ff10] transition-colors"
            >
              <Ticket size={14} />
              Buy Tickets
            </a>
            <a
              href="#lineup"
              className="flex items-center gap-2 border border-white/25 text-white font-mono font-bold tracking-widest uppercase px-10 py-4 text-xs hover:border-[#c8f400] hover:text-[#c8f400] transition-colors"
            >
              View Lineup
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.5em] uppercase text-neutral-600 font-mono">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      </section>

      {/* ─── LINEUP ─── */}
      <section id="lineup" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#ff2d6b] mb-3 font-mono">Who's Playing</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Lineup
            </h2>
          </div>
          <DayTabs active={lineupDay} onChange={setLineupDay} />
        </div>

        {/* Headliner row */}
        {LINEUP[lineupDay]
          .filter((a) => a.headliner)
          .map((artist) => (
            <div
              key={artist.name}
              className="border-t border-b border-white/10 py-8 mb-1 group cursor-default hover:border-[#c8f400]/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] tracking-[0.5em] uppercase text-[#c8f400] font-mono">
                    Headliner · {artist.stage}
                  </span>
                  <h3
                    className="font-display uppercase leading-tight mt-1 group-hover:text-[#c8f400] transition-colors"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                  >
                    {artist.name}
                  </h3>
                </div>
                <span className="text-neutral-600 font-mono text-sm tracking-widest shrink-0">{artist.time}</span>
              </div>
            </div>
          ))}

        {/* Supporting grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-px bg-white/10">
          {LINEUP[lineupDay]
            .filter((a) => !a.headliner)
            .map((artist) => (
              <div
                key={artist.name}
                className="bg-[#080808] p-6 group cursor-default hover:bg-white/[0.025] transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span
                      className="text-[9px] tracking-[0.4em] uppercase font-mono"
                      style={{ color: STAGE_COLOR[artist.stage] }}
                    >
                      {artist.stage}
                    </span>
                    <h4
                      className="font-display uppercase leading-tight mt-1 group-hover:text-[#c8f400] transition-colors"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {artist.name}
                    </h4>
                  </div>
                  <span className="text-neutral-600 font-mono text-xs tracking-widest shrink-0">{artist.time}</span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ─── TICKETS ─── */}
      <section id="tickets" className="py-24 bg-[#0c0c0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#c8f400] mb-3 font-mono">Secure Your Spot</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Tickets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {TICKETS.map((t) => (
              <div
                key={t.tier}
                className="relative p-8 flex flex-col gap-6"
                style={{ backgroundColor: t.highlight ? "#c8f400" : "#0c0c0c" }}
              >
                {t.badge && (
                  <span
                    className="absolute top-6 right-6 text-[9px] tracking-widest uppercase font-mono font-bold px-3 py-1"
                    style={{ backgroundColor: "#ff2d6b", color: "#fff" }}
                  >
                    {t.badge}
                  </span>
                )}

                <div>
                  <p
                    className="text-[9px] tracking-[0.45em] uppercase font-mono mb-1"
                    style={{ color: t.highlight ? "rgba(0,0,0,0.5)" : "#555" }}
                  >
                    {t.tier}
                  </p>
                  <p
                    className="text-xs font-mono mb-3"
                    style={{ color: t.highlight ? "rgba(0,0,0,0.55)" : "#666" }}
                  >
                    {t.note}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-display leading-none"
                      style={{
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        color: t.highlight ? "#000" : "#f0f0f0",
                      }}
                    >
                      ${t.price}
                    </span>
                    <span style={{ color: t.highlight ? "rgba(0,0,0,0.4)" : "#444" }} className="text-sm font-mono">
                      /person
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="text-sm flex items-start gap-2"
                      style={{ color: t.highlight ? "rgba(0,0,0,0.75)" : "#888" }}
                    >
                      <span
                        className="mt-0.5 shrink-0 font-mono leading-none"
                        style={{ color: t.highlight ? "#000" : "#c8f400" }}
                      >
                        →
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-4 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                  style={
                    t.highlight
                      ? { backgroundColor: "#000", color: "#c8f400" }
                      : { border: "1px solid rgba(200,244,0,0.3)", color: "#c8f400", backgroundColor: "transparent" }
                  }
                  onMouseEnter={(e) => {
                    if (t.highlight) (e.currentTarget as HTMLElement).style.backgroundColor = "#111";
                    else (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(200,244,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    if (t.highlight) (e.currentTarget as HTMLElement).style.backgroundColor = "#000";
                    else (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-neutral-700 text-[10px] tracking-widest mt-6 font-mono uppercase">
            All tickets are non-refundable · No late re-entry after 11 PM · 18+ event
          </p>
        </div>
      </section>

      {/* ─── SCHEDULE ─── */}
      <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#ff2d6b] mb-3 font-mono">What & When</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Schedule
            </h2>
          </div>
          <DayTabs active={scheduleDay} onChange={setScheduleDay} activeColor="#ff2d6b" activeTextColor="text-white" />
        </div>

        {/* Stage legend */}
        <div className="flex flex-wrap gap-6 mb-8">
          {Object.entries(STAGE_COLOR).map(([stage, color]) => (
            <div key={stage} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] tracking-widest uppercase text-neutral-500 font-mono">{stage}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-px">
          {SCHEDULE[scheduleDay].map((slot, i) => (
            <div
              key={i}
              className="flex items-center gap-5 border border-white/10 px-5 py-5 hover:bg-white/[0.025] transition-colors group"
            >
              <div className="w-1.5 h-12 shrink-0" style={{ backgroundColor: STAGE_COLOR[slot.stage] }} />
              <span className="font-mono text-xs text-neutral-600 w-20 shrink-0">{slot.time}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-display uppercase leading-tight group-hover:text-[#c8f400] transition-colors truncate"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
                >
                  {slot.artist}
                </p>
                <p className="text-[9px] tracking-widest uppercase font-mono mt-0.5" style={{ color: STAGE_COLOR[slot.stage] }}>
                  {slot.stage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#c8f400] mb-3 font-mono">Past Editions</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Gallery
            </h2>
          </div>

          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "280px 280px 280px",
            }}
          >
            {GALLERY.map((img, i) => (
              <div
                key={img.id}
                className={`bg-neutral-900 overflow-hidden ${img.span}`}
              >
                <img
                  src={`https://images.unsplash.com/photo-${img.id}?w=900&h=600&fit=crop&auto=format`}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS ─── */}
      <section id="sponsors" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c8f400] mb-3 font-mono">Partners & Supporters</p>
          <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
            Sponsors
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-neutral-700 font-mono mb-6">Presenting Partners</p>
            <div className="flex flex-wrap gap-8 md:gap-14 items-center">
              {SPONSORS.presenting.map((s) => (
                <span
                  key={s}
                  className="font-display uppercase text-white/15 hover:text-[#c8f400] transition-colors cursor-pointer"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-14">
            <p className="text-[9px] tracking-[0.5em] uppercase text-neutral-700 font-mono mb-6">Gold Partners</p>
            <div className="flex flex-wrap gap-8 md:gap-12 items-center">
              {SPONSORS.gold.map((s) => (
                <span
                  key={s}
                  className="font-display uppercase text-white/10 hover:text-[#ff2d6b] transition-colors cursor-pointer"
                  style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-14">
            <p className="text-[9px] tracking-[0.5em] uppercase text-neutral-700 font-mono mb-6">Community Partners</p>
            <div className="flex flex-wrap gap-6 md:gap-10 items-center">
              {SPONSORS.community.map((s) => (
                <span
                  key={s}
                  className="font-display uppercase text-white/8 hover:text-white/35 transition-colors cursor-pointer"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 text-center bg-[#c8f400] overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display uppercase text-black absolute -bottom-8 -left-4 whitespace-nowrap leading-none opacity-20"
            style={{ fontSize: "30vw" }}
          >
            NOW
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-[9px] tracking-[0.6em] uppercase text-black/50 font-mono mb-4">Limited Availability</p>
          <h2
            className="font-display uppercase leading-none text-black mb-4"
            style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
          >
            Don't Miss Out
          </h2>
          <p className="text-black/50 text-xs tracking-widest uppercase mb-10 font-mono">
            July 18–20, 2025 · Riverside Park, Austin TX
          </p>
          <a
            href="#tickets"
            className="inline-flex items-center gap-3 bg-black text-[#c8f400] font-mono font-bold tracking-widest uppercase px-12 py-5 text-xs hover:bg-[#111] transition-colors"
          >
            <Ticket size={16} />
            Secure Your Ticket
            <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#050505] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <span className="font-display text-4xl text-[#c8f400]">VOLTAGE</span>
              <p className="text-neutral-500 text-sm mt-4 max-w-xs leading-relaxed">
                Three days of electronic and experimental music under the Austin sky. Riverside Park, July 18–20, 2025.
              </p>
              <div className="flex gap-5 mt-6">
                {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-neutral-700 hover:text-[#c8f400] transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.45em] uppercase font-mono text-neutral-700 mb-5">Navigate</p>
              <div className="flex flex-col gap-3">
                {["Lineup", "Tickets", "Schedule", "Gallery", "Sponsors"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-neutral-500 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.45em] uppercase font-mono text-neutral-700 mb-5">Info</p>
              <div className="flex flex-col gap-3">
                {["About", "Press", "FAQ", "Accessibility", "Contact", "Privacy Policy", "Terms"].map((link) => (
                  <a key={link} href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-800 text-xs font-mono">© 2025 Voltage Festival. All rights reserved.</p>
            <div className="flex items-center gap-2 text-neutral-800 text-xs font-mono">
              <MapPin size={11} />
              Riverside Park, Austin, TX 78741
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
