"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Stethoscope } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // compute year only on the client after mount to avoid SSR/client mismatch
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-border bg-background/70 backdrop-blur-md ">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start gap-2 text-primary font-semibold text-lg mb-3"
          >
            <Stethoscope className="w-6 h-6 text-primary" />
            <span>PH Health Care</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto md:mx-0">
            We provide quality healthcare services with expert doctors and
            modern facilities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", href: "/" },
              { name: "Doctors", href: "/doctors" },
              { name: "Services", href: "/services" },
              { name: "Reviews", href: "/reviews" },
              { name: "Login", href: "/login" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-border text-center py-4 text-sm text-muted-foreground">
        © 2025 PH Health Care. All rights reserved.
      </div>
    </footer>
  );
}
