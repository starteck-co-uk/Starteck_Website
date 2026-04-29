import { company, navigation } from "@/data/company";

export default function JsonLd() {
  const baseUrl = "https://www.starteck.co.uk";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": company.name,
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo/StarTeck_logo_transparent.png`,
      "width": "512",
      "height": "512"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": company.phone,
      "contactType": "customer service",
      "areaServed": "GB",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://github.com/starteck-co-uk"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localbusiness`,
    "name": company.name,
    "image": `${baseUrl}/images/logo/StarTeck_logo_transparent.png`,
    "url": baseUrl,
    "telephone": company.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 Urmston Lane, Stretford",
      "addressLocality": "Manchester",
      "postalCode": "M32 9BP",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.4457974,
      "longitude": -2.3141703
    },
    "description": "Manchester's leading AI development company specializing in bespoke agentic workflows, secure RAG systems, and enterprise AI automation.",
    "areaServed": [
      { "@type": "City", "name": "Manchester" },
      { "@type": "City", "name": "London" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "priceRange": "£££",
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": company.name,
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
