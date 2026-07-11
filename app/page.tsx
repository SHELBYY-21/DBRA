import { ArrowDownRightIcon, ArrowUpRightIcon, BellIcon, ChartNoAxesCombinedIcon, ChevronDownIcon, CircleDollarSignIcon, LayoutDashboardIcon, SearchIcon, SettingsIcon, UsersIcon } from 'lucide-react'

import { SalesCopilot } from '@/components/sales-copilot'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deals, pipelineSummary } from '@/lib/pipeline-data'

const metrics = [
  { label: 'Open pipeline', value: pipelineSummary.openPipeline, change: '+12.4%', positive: true },
  { label: 'Weighted forecast', value: pipelineSummary.weightedForecast, change: '+8.1%', positive: true },
  { label: 'Coverage', value: pipelineSummary.coverage, change: '-0.3×', positive: false },
  { label: 'At risk', value: pipelineSummary.atRisk, change: '4 deals', positive: false },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ChartNoAxesCombinedIcon className="size-4" aria-hidden="true" /></span>
            <div className="flex items-baseline gap-2"><span className="font-semibold tracking-tight">Quarterline</span><span className="hidden text-xs text-muted-foreground sm:inline">Sales Operations</span></div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex"><SearchIcon data-icon="inline-start" /> Search</Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications"><BellIcon /></Button>
            <Button variant="outline" size="sm">Q3 FY26 <ChevronDownIcon data-icon="inline-end" /></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden w-14 shrink-0 border-r bg-card py-4 md:flex md:flex-col md:items-center md:justify-between">
          <nav className="flex flex-col gap-2" aria-label="Main navigation">
            <Button size="icon-sm" aria-label="Overview"><LayoutDashboardIcon /></Button>
            <Button size="icon-sm" variant="ghost" aria-label="Revenue"><CircleDollarSignIcon /></Button>
            <Button size="icon-sm" variant="ghost" aria-label="Team"><UsersIcon /></Button>
          </nav>
          <Button size="icon-sm" variant="ghost" aria-label="Settings"><SettingsIcon /></Button>
        </aside>

        <div className="grid min-w-0 flex-1 gap-4 p-4 md:grid-cols-[minmax(0,1fr)_340px] lg:p-5 xl:grid-cols-[minmax(0,1fr)_400px]">
          <section className="flex min-w-0 flex-col gap-4" aria-labelledby="overview-heading">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1"><p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Revenue command</p><h1 id="overview-heading" className="text-2xl font-semibold tracking-tight text-balance">Pipeline overview</h1></div>
              <Badge variant="outline">Demo data</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {metrics.map((metric) => (
                <Card key={metric.label} size="sm">
                  <CardHeader><CardDescription>{metric.label}</CardDescription><CardTitle className="text-2xl tabular-nums">{metric.value}</CardTitle></CardHeader>
                  <CardContent><span className={metric.positive ? 'flex items-center gap-1 text-xs text-success' : 'flex items-center gap-1 text-xs text-muted-foreground'}>{metric.positive ? <ArrowUpRightIcon className="size-3" aria-hidden="true" /> : <ArrowDownRightIcon className="size-3" aria-hidden="true" />}{metric.change} <span className="text-muted-foreground">vs last qtr</span></span></CardContent>
                </Card>
              ))}
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="flex-row items-start justify-between">
                <div className="flex flex-col gap-1"><CardTitle>Forecast trajectory</CardTitle><CardDescription>Weighted pipeline against quarterly target</CardDescription></div>
                <Badge variant="secondary">68% to target</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex h-32 items-end gap-2" aria-label="Forecast bar chart">
                  {[34, 47, 43, 58, 62, 70, 68, 76, 82, 88, 94, 100].map((height, index) => <div key={index} className="flex flex-1 flex-col justify-end"><div className="rounded-sm bg-primary/15 transition-colors hover:bg-primary" style={{ height: `${height}%` }} /></div>)}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Apr 1</span><span>May 1</span><span>Jun 1</span><span>Jun 30</span></div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="flex-row items-start justify-between"><div className="flex flex-col gap-1"><CardTitle>Deal watchlist</CardTitle><CardDescription>Highest-impact opportunities to review this week</CardDescription></div><Button variant="ghost" size="sm">View all</Button></CardHeader>
              <Separator />
              <CardContent className="px-0">
                <Table>
                  <TableHeader><TableRow><TableHead>Account</TableHead><TableHead className="hidden sm:table-cell">Stage</TableHead><TableHead>Value</TableHead><TableHead className="hidden xl:table-cell">Signal</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader>
                  <TableBody>{deals.map((deal) => <TableRow key={deal.account}><TableCell><div className="flex flex-col"><span className="font-medium">{deal.account}</span><span className="text-xs text-muted-foreground">{deal.owner}</span></div></TableCell><TableCell className="hidden sm:table-cell text-muted-foreground">{deal.stage}</TableCell><TableCell className="font-medium tabular-nums">{deal.value}</TableCell><TableCell className="hidden max-w-44 truncate text-muted-foreground xl:table-cell">{deal.signal}</TableCell><TableCell><Badge variant={deal.risk === 'High' ? 'destructive' : deal.risk === 'Medium' ? 'secondary' : 'outline'}>{deal.risk}</Badge></TableCell></TableRow>)}</TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
          <aside aria-label="Sales copilot"><SalesCopilot /></aside>
        </div>
      </div>
    </main>
  )
}
