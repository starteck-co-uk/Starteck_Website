export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  results: string[];
  tags: string[];
  keyMetric: string;
  resultLabel: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "autonomous-supply-chain-orchestration",
    title: "Autonomous Supply Chain Orchestration",
    client: "Global Logistics Giant",
    industry: "Logistics & Supply Chain",
    summary:
      "Deployed a multi-agent factory that autonomously manages inventory levels, negotiates with vendors, and reroutes shipments in real-time based on global disruption data.",
    challenge:
      "The client faced increasing volatility in global shipping routes and volatile raw material costs. Their manual procurement and logistics planning teams couldn't react fast enough to port closures and sudden price spikes, leading to millions in lost efficiency.",
    approach:
      "We built an 'Agentic Factory' where specialized agents handle different pillars of the supply chain: a 'Market Monitor' agent analyzes price trends, a 'Route Optimizer' agent monitors global AIS data for shipping delays, and a 'Negotiator' agent uses predefined guardrails to autonomously execute purchase orders with suppliers.",
    results: [
      "42% reduction in procurement lead time",
      "£12M saved in first 6 months through autonomous negotiation",
      "99.9% accuracy in demand forecasting during peak disruption",
      "Real-time rerouting of 5,000+ shipments monthly",
    ],
    tags: ["Agentic AI", "Multi-Agent Systems", "Logistics", "Autonomous Systems"],
    keyMetric: "£12M savings achieved",
    resultLabel: "Total Cost Savings",
  },
  {
    slug: "secure-rag-2-0-financial-compliance",
    title: "Secure RAG 2.0: Financial Intelligence",
    client: "Tier-1 Investment Bank",
    industry: "Financial Services",
    summary:
      "An air-gapped, access-aware RAG 2.0 system with document-level security, enabling 1,200+ analysts to query sensitive research without data leakage.",
    challenge:
      "The bank needed to leverage LLMs for deep research analysis but could not risk uploading proprietary data to cloud providers. Furthermore, internal data access was siloed—analysts should only be able to retrieve information they are explicitly authorized to view.",
    approach:
      "We deployed a Secure RAG 2.0 architecture entirely on-premise. The system features a 'Security-First Retrieval' layer that cross-references user ACLs with document metadata in the vector database, ensuring zero-leakage retrieval. We also implemented a 'Verification Loop' where the AI cites specific sources that are then verified for accuracy before display.",
    results: [
      "85% reduction in research synthesis time",
      "Zero compliance incidents since deployment",
      "Supports 50K+ sensitive research papers",
      "Fully air-gapped — no data ever leaves the VPC",
    ],
    tags: ["Secure RAG 2.0", "On-Premise AI", "Cybersecurity", "FAISS"],
    keyMetric: "85% faster research",
    resultLabel: "Efficiency Increase",
  },
  {
    slug: "medflow-predictive-patient-analytics",
    title: "MedFlow: Predictive Patient Analytics",
    client: "National Health Provider",
    industry: "Healthcare",
    summary:
      "A real-time analytics dashboard and predictive engine that identifies high-risk patient readmissions with 94% accuracy, integrated directly into clinic workflows.",
    challenge:
      "The healthcare provider struggled with high readmission rates and resource bottlenecks. Clinicians needed a way to identify high-risk patients 48 hours before discharge to implement preventive care plans.",
    approach:
      "We delivered 'MedFlow', a full-stack AI application featuring a deep learning engine that processes real-time vitals, historical records, and social determinants of health. The React dashboard provides a 'Patient Pulse' score, highlighting those at risk and suggesting intervention strategies based on similar successful outcomes.",
    results: [
      "28% reduction in patient readmission rates",
      "94% predictive accuracy for risk identification",
      "Sub-second latency on patient data processing",
      "Onboarded across 12 major facilities",
    ],
    tags: ["Deep Learning", "Healthcare AI", "React", "Predictive Analytics"],
    keyMetric: "28% fewer readmissions",
    resultLabel: "Clinical Impact",
  },
  {
    slug: "agentic-workflow-automation-insurance",
    title: "Agentic Claims Processing",
    client: "Enterprise Insurance Provider",
    industry: "Insurance",
    summary:
      "Autonomous multi-agent system that processes insurance claims from ingestion to settlement with human-in-the-loop oversight.",
    challenge:
      "Manual claims processing took an average of 14 days, involving multiple hand-offs between document reviewers, adjusters, and payment teams. The backlog was causing customer churn and high operational overhead.",
    approach:
      "We designed an agentic workflow where a 'Document AI' agent extracts data from claims, a 'Policy' agent validates coverage, and a 'Fraud' agent flags anomalies for human review. Low-risk claims (under £5,000) are processed for settlement autonomously within minutes.",
    results: [
      "Claims processing time reduced from 14 days to 4 minutes",
      "70% reduction in manual handling costs",
      "95% accuracy in automated extraction",
      "ROI achieved within 4 months",
    ],
    tags: ["Agentic AI", "Document AI", "Automation", "ROI Focused"],
    keyMetric: "70% less manual handling",
    resultLabel: "Operational Efficiency",
  },
];
