import { company } from "@/data/company";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company.name,
    "image": "https://www.starteck.co.uk/images/logo/StarTeck_logo_transparent.png",
    "@id": "https://www.starteck.co.uk",
    "url": "https://www.starteck.co.uk",
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
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/starteck-co-uk"
    ],
    "description": company.description,
    "areaServed": {
      "@type": "City",
      "name": "Manchester"
    },
    "priceRange": "£££"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
