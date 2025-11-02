"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Stethoscope, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Reviews", href: "/reviews" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-semibold text-lg"
        >
          <Stethoscope className="w-6 h-6 text-primary" />
          <span>PH Health Care</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Button asChild variant="default">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Sheet */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-8">
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <Stethoscope className="w-6 h-6 text-primary" />
                  PH Health Care
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 px-2">
                <nav className="flex flex-col gap-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="pt-6 border-t border-border space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-base font-medium">Theme</span>
                    <ModeToggle />
                  </div>
                  <Button asChild className="w-full h-11">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <LogIn className="mr-2 h-5 w-5" /> Login
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
