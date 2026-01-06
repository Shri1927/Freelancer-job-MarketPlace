// Demo agreement templates for the escrow UI

const demoAgreements = [
  {
    id: "standard",
    title: "Standard Escrow Agreement",
    summary: "A short standard agreement covering basic release and refund rules.",
    text: `Standard Escrow Agreement\n\n1. The escrow agent will hold funds until the client releases them to the freelancer after satisfactory delivery.\n2. Refunds may be initiated by the client or by mutual agreement.\n3. This is a demo-only agreement for illustrative purposes.`
  },
  {
    id: "milestone",
    title: "Milestone-based Agreement",
    summary: "Funds are released per milestone upon approval.",
    text: `Milestone Agreement\n\n1. Project is split into milestones with fixed amounts.\n2. The escrow agent releases milestone funds upon client approval of deliverables for that milestone.\n3. Disputes result in hold until resolved.`
  },
  {
    id: "simple",
    title: "Simple Agreement",
    summary: "Minimal agreement (demo only).",
    text: `Simple Escrow Terms\n\nBy signing, you accept that funds will be held until release or refund is executed. This is for demo purposes only.`
  }
]

export default demoAgreements
