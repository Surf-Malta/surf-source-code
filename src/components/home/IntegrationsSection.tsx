"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import { ArrowRight, Check } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiPython,
  SiGo,
  SiPhp,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
  SiGit,
  SiFigma,
  SiWordpress,
  SiFlutter,
  SiRust,
  SiSwift,
  SiDart,
  SiFirebase,
  SiSupabase,
  SiPrisma,
  SiStripe,
  SiVercel,
  SiLinux,
  SiGithub,
} from "react-icons/si";

interface Integration {
  name: string;
  Icon: IconType;
  color: string;
  description: string;
  snippet: string[];
}

const integrations: Integration[] = [
  {
    name: "HTML5",
    Icon: SiHtml5,
    color: "#E34F26",
    description: "Web markup language",
    snippet: [
      "$ touch index.html",
      "> <!DOCTYPE html>",
      '> <html lang="en">',
      "> <body>Hello, World!</body>",
      "> ✓ rendered in browser",
    ],
  },
  {
    name: "CSS3",
    Icon: SiCss,
    color: "#1572B6",
    description: "Styling & animations",
    snippet: [
      "$ style.css linked",
      "> .hero { display: grid; }",
      "> animation: fadeIn 0.3s ease;",
      "> ✓ styles applied",
    ],
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    description: "Dynamic web logic",
    snippet: [
      "$ node main.js",
      "> const api = await fetch('/data');",
      "> const json = await api.json();",
      "> ✓ data loaded",
    ],
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    description: "Type-safe development",
    snippet: [
      "$ tsc --init",
      '/ interface User { id: string; }',
      "> const user: User = { id: '1' };",
      "> ✓ types validated",
    ],
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    description: "Modern frontend apps",
    snippet: [
      "$ npm install react react-dom",
      "> import { useState } from 'react';",
      "> const App = () => <Dashboard />;",
      "> ✓ component mounted",
    ],
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#ffffff",
    description: "Full-stack React framework",
    snippet: [
      "$ npx create-next-app@latest",
      "> export default function Page() {",
      ">   return <main>Hello</main>;",
      "> ✓ SSR enabled",
    ],
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#339933",
    description: "Scalable backends",
    snippet: [
      "$ npm init -y && npm i express",
      "> app.get('/api', async (req, res) => {",
      ">   res.json({ status: 'live' });",
      "> ✓ server running :3000",
    ],
  },
  {
    name: "Vue.js",
    Icon: SiVuedotjs,
    color: "#4FC08D",
    description: "Progressive framework",
    snippet: [
      "$ npm create vue@latest",
      "> <script setup>",
      "> const count = ref(0);",
      "> ✓ reactive state active",
    ],
  },
  {
    name: "Angular",
    Icon: SiAngular,
    color: "#DD0031",
    description: "Enterprise web apps",
    snippet: [
      "$ ng new my-app",
      "> @Component({ standalone: true })",
      "> export class AppComponent {}",
      "> ✓ module compiled",
    ],
  },
  {
    name: "Svelte",
    Icon: SiSvelte,
    color: "#FF3E00",
    description: "Compiled UI framework",
    snippet: [
      "$ npm create svelte@latest",
      "> <script>let count = 0;</script>",
      "> <button on:click={() => count++}>",
      "> ✓ compiled, 0 runtime",
    ],
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    description: "AI & data science",
    snippet: [
      "$ pip install sourcecode-ai",
      "> from sourcecode import ai",
      "> model = ai.load('gpt-pipeline')",
      "> ✓ model ready",
    ],
  },
  {
    name: "Go",
    Icon: SiGo,
    color: "#00ADD8",
    description: "High-performance services",
    snippet: [
      "$ go mod init api",
      "> func handler(w http.ResponseWriter,",
      ">   r *http.Request) {",
      "> ✓ compiled in 0.3s",
    ],
  },
  {
    name: "PHP",
    Icon: SiPhp,
    color: "#777BB4",
    description: "Server-side scripting",
    snippet: [
      "$ php artisan serve",
      "> Route::get('/api', function() {",
      ">   return response()->json([...]);",
      "> ✓ running on :8000",
    ],
  },
  {
    name: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
    description: "Containerized deployments",
    snippet: [
      "$ docker build -t app:latest .",
      "> FROM node:20-alpine",
      "> COPY . . && RUN npm ci",
      "> ✓ image built (42MB)",
    ],
  },
  {
    name: "Kubernetes",
    Icon: SiKubernetes,
    color: "#326CE5",
    description: "Container orchestration",
    snippet: [
      "$ kubectl apply -f deployment.yaml",
      "> deployment.apps/app created",
      "> service/app-svc exposed",
      "> ✓ 3/3 pods running",
    ],
  },
  {
    name: "GraphQL",
    Icon: SiGraphql,
    color: "#E10098",
    description: "Flexible API queries",
    snippet: [
      "$ npm install graphql apollo-server",
      "> query GetUser($id: ID!) {",
      ">   user(id: $id) { name email }",
      "> ✓ schema resolved",
    ],
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#4169E1",
    description: "Relational database",
    snippet: [
      "$ psql -U postgres -d mydb",
      "> CREATE TABLE users (",
      ">   id UUID PRIMARY KEY DEFAULT gen_random_uuid()",
      "> ✓ table created",
    ],
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    description: "NoSQL document store",
    snippet: [
      "$ npm install mongoose",
      "> const user = await User.findOne(",
      ">   { email: 'admin@sourcecode.mt' }",
      "> ✓ document fetched",
    ],
  },
  {
    name: "Redis",
    Icon: SiRedis,
    color: "#DC382D",
    description: "In-memory data cache",
    snippet: [
      "$ redis-cli ping",
      "> PONG",
      "> SET session:abc123 '{ userId: 1 }'",
      "> ✓ cache hit rate: 98%",
    ],
  },
  {
    name: "Tailwind",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first CSS",
    snippet: [
      "$ npm install tailwindcss",
      '/ <div class="flex gap-4 p-6">',
      '/   <span class="text-cyan-400">',
      "> ✓ styles generated",
    ],
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    description: "Version control",
    snippet: [
      "$ git init && git add .",
      '/ git commit -m "feat: init"',
      "> git push origin main",
      "> ✓ pushed to remote",
    ],
  },
  {
    name: "GitHub",
    Icon: SiGithub,
    color: "#ffffff",
    description: "Code collaboration",
    snippet: [
      "$ gh repo create sourcecode-app",
      "> Initialized repository",
      "> gh workflow run deploy.yml",
      "> ✓ CI/CD pipeline active",
    ],
  },
  {
    name: "Figma",
    Icon: SiFigma,
    color: "#F24E1E",
    description: "UI/UX design tool",
    snippet: [
      "$ figma export --format=json",
      "> tokens.json exported",
      "> design → code bridge active",
      "> ✓ components synced",
    ],
  },
  {
    name: "WordPress",
    Icon: SiWordpress,
    color: "#21759B",
    description: "CMS & websites",
    snippet: [
      "$ wp plugin install sc-connect",
      "> REST API endpoints registered",
      "> headless mode: enabled",
      "> ✓ connected",
    ],
  },
  {
    name: "Flutter",
    Icon: SiFlutter,
    color: "#02569B",
    description: "Cross-platform apps",
    snippet: [
      "$ flutter create my_app",
      "> Widget build(BuildContext ctx) {",
      ">   return MaterialApp(home: Home());",
      "> ✓ iOS & Android ready",
    ],
  },
  {
    name: "Dart",
    Icon: SiDart,
    color: "#0175C2",
    description: "Typed scripting language",
    snippet: [
      "$ dart run bin/server.dart",
      "> void main() async {",
      ">   final server = await serve(handler);",
      "> ✓ server live :8080",
    ],
  },
  {
    name: "Rust",
    Icon: SiRust,
    color: "#DEA584",
    description: "Systems programming",
    snippet: [
      "$ cargo new api && cargo run",
      "> fn main() {",
      ">   println!(\"Server ready\");",
      "> ✓ compiled in 1.2s",
    ],
  },
  {
    name: "Swift",
    Icon: SiSwift,
    color: "#F05138",
    description: "iOS/macOS development",
    snippet: [
      "$ swift build -c release",
      "> struct User: Codable {",
      ">   var id: UUID = UUID()",
      "> ✓ binary ready",
    ],
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    color: "#FFCA28",
    description: "BaaS platform",
    snippet: [
      "$ npm install firebase",
      "> const db = getFirestore(app);",
      "> await setDoc(doc(db, 'users', id),",
      "> ✓ document written",
    ],
  },
  {
    name: "Supabase",
    Icon: SiSupabase,
    color: "#3ECF8E",
    description: "Open-source backend",
    snippet: [
      "$ npm install @supabase/supabase-js",
      "> const { data } = await supabase",
      ">   .from('users').select('*');",
      "> ✓ rows fetched",
    ],
  },
  {
    name: "Prisma",
    Icon: SiPrisma,
    color: "#5A67D8",
    description: "Type-safe ORM",
    snippet: [
      "$ npx prisma generate",
      "> const users = await prisma.user",
      ">   .findMany({ where: { active: true } });",
      "> ✓ query executed",
    ],
  },
  {
    name: "Stripe",
    Icon: SiStripe,
    color: "#635BFF",
    description: "Payment processing",
    snippet: [
      "$ npm install stripe",
      "> const intent = await stripe",
      ">   .paymentIntents.create({ amount });",
      "> ✓ payment authorized",
    ],
  },
  {
    name: "Vercel",
    Icon: SiVercel,
    color: "#ffffff",
    description: "Edge deployments",
    snippet: [
      "$ vercel deploy --prod",
      "> Deploying to production...",
      "> https://app.vercel.app",
      "> ✓ deployed globally",
    ],
  },
  {
    name: "Linux",
    Icon: SiLinux,
    color: "#FCC624",
    description: "Server OS & DevOps",
    snippet: [
      "$ ssh deploy@192.168.1.1",
      "> systemctl start app.service",
      "> nginx -t && nginx -s reload",
      "> ✓ service active (running)",
    ],
  },
];

const ROW_1 = integrations.slice(0, Math.ceil(integrations.length / 2));
const ROW_2 = integrations.slice(Math.ceil(integrations.length / 2));

const steps = ["Discover", "Architect", "Deliver"];

interface MarqueeRowProps {
  items: Integration[];
  direction: "left" | "right";
  duration: number;
  selected: Integration | null;
  onSelect: (item: Integration | null) => void;
}

function MarqueeRow({ items, direction, duration, selected, onSelect }: MarqueeRowProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden w-full group/row"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex gap-3 w-max group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, idx) => {
          const isSelected = selected?.name === item.name;
          return (
            <button
              key={`${item.name}-${idx}`}
              onClick={() => onSelect(isSelected ? null : item)}
              className={`group flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl border transition-all duration-300 shrink-0 min-w-[88px] cursor-pointer ${
                isSelected
                  ? "border-og-accent bg-[var(--og-accent-muted)] shadow-[0_0_20px_rgba(61,90,128,0.15)]"
                  : "border-og-border bg-og-bg-alt hover:border-og-accent/40 hover:bg-og-surface-hover hover:shadow-[0_0_14px_rgba(61,90,128,0.08)]"
              }`}
            >
              <span
                className="transition-transform duration-300 group-hover:scale-110"
                style={{ color: item.color, filter: isSelected ? `drop-shadow(0 0 8px ${item.color}60)` : "none" }}
              >
                <item.Icon size={30} />
              </span>
              <span className="text-[11px] text-og-text-secondary whitespace-nowrap font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const [selected, setSelected] = useState<Integration | null>(null);

  return (
    <section className="py-14 md:py-20 bg-og-bg">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
            Built with the best tools.
          </h2>
          <p className="text-[17px] text-og-text-secondary max-w-[400px] mx-auto font-normal">
            Modern tech stack for every solution.
          </p>
        </AnimatedSection>

        <div className="relative">
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-3">
              <MarqueeRow
                items={ROW_1}
                direction="left"
                duration={38}
                selected={selected}
                onSelect={setSelected}
              />
              <MarqueeRow
                items={ROW_2}
                direction="right"
                duration={32}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </AnimatedSection>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 bg-og-surface rounded-2xl border border-og-border p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-8">
                        <span style={{ color: selected.color, filter: `drop-shadow(0 0 8px ${selected.color}60)` }}>
                          <selected.Icon size={36} />
                        </span>
                        <div>
                          <p className="text-[16px] text-og-text font-semibold">{selected.name}</p>
                          <p className="text-[13px] text-og-text-secondary font-normal">{selected.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
                        {steps.map((step, i) => (
                          <div key={step} className="flex items-center gap-4 md:flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-og-accent flex items-center justify-center text-white text-[14px] font-semibold">
                                {i + 1}
                              </div>
                              <div>
                                <p className="text-[15px] text-og-text font-semibold">{step}</p>
                                <p className="text-[12px] text-og-text-secondary font-normal">
                                  {i === 0 ? "Understand needs" : i === 1 ? "Design system" : "Build & deploy"}
                                </p>
                              </div>
                            </div>
                            {i < steps.length - 1 && (
                              <ArrowRight size={16} className="text-og-accent hidden md:block ml-auto mr-4" />
                            )}
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-og-accent">
                          <Check size={20} />
                          <span className="text-[14px] font-semibold">Live</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-white/8" style={{ background: "#040610" }}>
                      <div
                        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8"
                        style={{ background: "#070A1A" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-og-accent animate-pulse" />
                        <span className="text-[11px] font-mono text-og-accent">integration.sh</span>
                      </div>
                      <div className="p-4 space-y-1.5">
                        {selected.snippet.map((line, i) => (
                          <motion.div
                            key={`${selected.name}-${i}`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.18, delay: i * 0.12 }}
                            className="text-[12px] font-mono"
                            style={{
                              color: line.startsWith("$")
                                ? "var(--og-accent)"
                                : line.startsWith("> ✓")
                                ? "#10E898"
                                : "rgba(220,230,255,0.80)",
                            }}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
