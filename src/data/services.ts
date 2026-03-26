export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  tags: string[];
  features: string[];
}

export const services: Service[] = [
  {
    slug: "genai-prompt-engineering",
    title: "GenAI & Prompt Engineering",
    icon: "Sparkles",
    summary:
      "Integrating top-tier LLMs into SaaS platforms to transform how you interact with data.",
    description:
      "We integrate top-tier Large Language Models (LLMs) into SaaS platforms to transform how you interact with data. We don't just plug in APIs; we engineer robust prompting architectures that yield consistent, high-fidelity outputs tailored to your domain. From chain-of-thought reasoning to structured output extraction, our prompt engineering ensures reliability at scale.",
    tags: ["LLM Integration", "Prompt Engineering", "SaaS Embedding", "GPT-4", "Claude", "Fine-tuning"],
    features: [
      "Custom prompt architecture design for your specific domain",
      "LLM evaluation and selection consulting",
      "Output validation and structured data extraction pipelines",
      "Cost optimization through intelligent prompt caching and routing",
    ],
  },
  {
    slug: "offline-rag",
    title: "Offline RAG Applications",
    icon: "Database",
    summary:
      "Highly secure, localized Retrieval-Augmented Generation systems that keep your data in-house.",
    description:
      "We develop highly secure, localized Retrieval-Augmented Generation systems. This ensures that your enterprise can leverage the power of conversational AI while keeping sensitive data entirely in-house, preventing data leakage to public models. Our RAG solutions use state-of-the-art vector databases and embedding models optimized for your data.",
    tags: ["Local Deployments", "Vector Databases", "Data Privacy", "Embeddings", "ChromaDB", "FAISS"],
    features: [
      "Air-gapped deployments for maximum data security",
      "Custom embedding model selection and fine-tuning",
      "Hybrid search combining semantic and keyword retrieval",
      "Document ingestion pipelines for PDFs, emails, and databases",
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI Workflows",
    icon: "Bot",
    summary:
      "Autonomous systems that reason, make decisions, and execute multi-step tasks.",
    description:
      "Move beyond simple chatbots. We build autonomous AI systems that can reason, make decisions, and execute multi-step tasks across your existing toolchains, acting as tireless digital employees for your operational workflows. Our agentic systems integrate with your APIs, databases, and business tools to automate complex processes end-to-end.",
    tags: ["Autonomous Agents", "Multi-step Reasoning", "API Orchestration", "LangChain", "Tool Use"],
    features: [
      "Multi-agent orchestration for complex workflows",
      "Tool-use integration with existing APIs and databases",
      "Human-in-the-loop approval flows for critical decisions",
      "Real-time monitoring and observability dashboards",
    ],
  },
  {
    slug: "computer-vision-doc-ai",
    title: "Computer Vision & Document AI",
    icon: "Eye",
    summary:
      "Advanced OCR and image processing to turn unstructured documents into structured data.",
    description:
      "Turn unstructured documents and images into database-ready information. We utilize advanced OCR, key-value extraction, and custom image processing models to digitize and comprehend complex visual and textual layouts. From invoices to medical records, our Document AI solutions handle diverse formats with high accuracy.",
    tags: ["Advanced OCR", "Information Extraction", "Image Processing", "Layout Analysis", "PyTorch"],
    features: [
      "Custom-trained models for your specific document types",
      "Table extraction and form understanding",
      "Multi-language document processing",
      "Quality assurance with confidence scoring and human review routing",
    ],
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    icon: "Settings",
    summary:
      "Robust data pipelines that automatically transform raw inputs into structured formats.",
    description:
      "We build robust, intelligent data pipelines that automatically transform raw inputs into structured formats. By integrating AI directly into the data flow, we eliminate manual bottlenecks and ensure high-quality, actionable data. Our automation solutions reduce processing time by orders of magnitude while improving data quality.",
    tags: ["Data Pipelines", "ETL Modernization", "Workflow Automation", "Apache Airflow", "Python"],
    features: [
      "End-to-end data pipeline design and implementation",
      "AI-powered data validation and anomaly detection",
      "Real-time streaming and batch processing capabilities",
      "Integration with existing ERP, CRM, and business systems",
    ],
  },
  {
    slug: "ai-dashboards-fullstack",
    title: "AI Dashboards & Fullstack",
    icon: "LayoutDashboard",
    summary:
      "Seamless, user-friendly web interfaces backed by modern, scalable deployments.",
    description:
      "AI is only as good as the interface used to control it. Our team delivers seamless, user-friendly web interfaces and intelligent dashboards backed by modern, scalable deployments. We build production-grade applications with React frontends, Node.js backends, and containerized infrastructure.",
    tags: ["React", "Node.js", "Docker", "Data Visualization", "Next.js", "PostgreSQL"],
    features: [
      "Custom dashboard design with real-time data visualization",
      "Responsive web applications built with modern frameworks",
      "Containerized deployments for reliability and scalability",
      "API design and microservices architecture",
    ],
  },
  {
    slug: "deep-learning-cybersecurity",
    title: "Deep Learning & Cybersecurity",
    icon: "Shield",
    summary:
      "Predictive insights while ensuring your custom infrastructure remains highly secure.",
    description:
      "We build specialized models to uncover predictive insights while ensuring your custom infrastructure remains highly secure. Our dual focus guarantees that your AI initiatives are both cutting-edge and impenetrable. From threat detection to anomaly analysis, we apply deep learning where it matters most.",
    tags: ["Predictive Analytics", "Secure Infrastructure", "Custom Neural Networks", "TensorFlow", "MLOps"],
    features: [
      "Custom neural network architectures for your specific use case",
      "Security auditing and penetration testing for AI systems",
      "Anomaly detection and threat intelligence models",
      "MLOps pipeline setup for continuous model training and deployment",
    ],
  },
];
