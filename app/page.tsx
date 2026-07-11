import {
  Activity,
  BarChart3,
  BookOpen,
  Box,
  ChevronRight,
  CircleHelp,
  Code2,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'

import { CodePlayground } from '@/components/code-playground'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Pipeline', icon: BarChart3 },
  { label: 'Accounts', icon: Users },
  { label: 'Automations', icon: Activity },
]

export default function Page() {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center gap-3 border-b px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles aria-hidden="true" className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Northstar</p>
            <p className="text-[11px] text-muted-foreground">Sales operations</p>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-6 p-3">
          <div className="flex flex-col gap-1">
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</p>
            {navigation.map((item) => (
              <a key={item.label} href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <item.icon aria-hidden="true" className="size-4" />
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Build</p>
            <a href="#playground" aria-current="page" className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground">
              <Code2 aria-hidden="true" className="size-4 text-primary" />
              Code playground
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <BookOpen aria-hidden="true" className="size-4" />
              Run history
            </a>
          </div>
        </nav>

        <div className="flex flex-col gap-1 border-t p-3">
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <CircleHelp aria-hidden="true" className="size-4" />
            Help center
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Settings aria-hidden="true" className="size-4" />
            Settings
          </a>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Box aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">SalesOps</span>
            <ChevronRight aria-hidden="true" className="hidden size-3 sm:block" />
            <span className="font-medium text-foreground">Code playground</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-muted-foreground sm:flex">
              <span className="size-1.5 rounded-full bg-primary" />
              Vercel Sandbox
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">AR</div>
          </div>
        </header>

        <div id="playground" className="flex min-h-0 flex-1 flex-col gap-5 p-4 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-primary">Developer tools</p>
              <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Code playground</h1>
              <p className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">
                Test SalesOps logic in a fresh, network-isolated microVM. Every run starts clean and is automatically destroyed.
              </p>
            </div>
            <a href="https://vercel.com/docs/sandbox" target="_blank" rel="noreferrer" className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Sandbox documentation
            </a>
          </div>
          <CodePlayground />
        </div>
      </div>
    </main>
  )
}
