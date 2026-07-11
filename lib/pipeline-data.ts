export const pipelineSummary = {
  openPipeline: '$2.48M',
  weightedForecast: '$1.31M',
  coverage: '3.2×',
  atRisk: '$640K',
}

export const deals = [
  { account: 'Northstar Labs', stage: 'Proposal', value: '$420K', owner: 'Maya Chen', risk: 'High', signal: 'No activity in 12 days' },
  { account: 'Atlas Systems', stage: 'Negotiation', value: '$310K', owner: 'Jordan Lee', risk: 'Medium', signal: 'Security review pending' },
  { account: 'Beacon Health', stage: 'Discovery', value: '$180K', owner: 'Sam Rivera', risk: 'Low', signal: 'Champion engaged yesterday' },
  { account: 'Kinetic Cloud', stage: 'Proposal', value: '$240K', owner: 'Priya Shah', risk: 'Medium', signal: 'Close date moved twice' },
]

export const pipelineContext = `
This is demo pipeline data, not a live CRM connection.
Quarter: Q3 FY26. Open pipeline: $2.48M. Weighted forecast: $1.31M. Pipeline coverage: 3.2x. At-risk value: $640K.
Deals:
- Northstar Labs: $420K, Proposal, owner Maya Chen, high risk, no activity in 12 days.
- Atlas Systems: $310K, Negotiation, owner Jordan Lee, medium risk, security review pending.
- Beacon Health: $180K, Discovery, owner Sam Rivera, low risk, champion engaged yesterday.
- Kinetic Cloud: $240K, Proposal, owner Priya Shah, medium risk, close date moved twice.
`
