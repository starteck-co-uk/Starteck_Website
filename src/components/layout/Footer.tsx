import Link from "next/link";
import { company, navigation } from "@/data/company";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
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
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <a
              href={`mailto:${company.email}`}
              className="text-text-muted text-sm hover:text-gold transition-colors"
            >
              {company.email}
            </a>
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
