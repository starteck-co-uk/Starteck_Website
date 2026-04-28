import Link from "next/link";
import { company, navigation } from "@/data/company";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">
              <span className="gold-text">StarTeck</span>
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              The dedicated technology and AI innovation arm of {company.parent}.
              Customized AI Products engineered for excellence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-muted text-sm hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${company.email}`}
                className="text-text-muted text-sm hover:text-gold transition-colors flex items-center gap-2"
              >
                {company.email}
              </a>
              <a
                href={`tel:${company.phone}`}
                className="text-text-muted text-sm hover:text-gold transition-colors flex items-center gap-2"
              >
                {company.phone}
              </a>
              <p className="text-text-muted text-sm leading-relaxed">
                {company.address}
              </p>
            </div>
          </div>

          {/* Map / Geotag */}
          <div className="w-full h-48 rounded-xl overflow-hidden border border-gold/20">
            <iframe
              src={company.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="StarTeck Location"
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-700/50 text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            A {company.parent} company.
          </p>
        </div>
      </div>
    </footer>
  );
}
