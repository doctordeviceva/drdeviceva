"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Input,
  Textarea,
  Smartphone,
  Tablet,
  Laptop,
  MapPin,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Stethoscope,
  ArrowRight,
} from "@/components/ui";

export default function HomePage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    deviceType: "",
    address: "",
    issue: "",
  });

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      deviceType: contactForm.deviceType,
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      address: contactForm.address,
      issue: contactForm.issue,
    });
    window.location.href = `/repair?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-serif">
              Dr Device VA
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, "services")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">
            <Link href="/repair" className="flex items-center">
              Schedule Repair
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-accent/20 text-accent-foreground"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Serving All of Virginia
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight font-serif">
                  Your Device Doctor,{" "}
                  <span className="text-primary">On Call</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Professional mobile pickup and return repair service for all
                  your electronics. No need to leave your home or office - we
                  come to you!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8"
                >
                  <Link href="/repair" className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Pickup
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Free Pickup & Return
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    90-Day Warranty
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden">
                <img
                  src="/repair.jpg"
                  alt="Professional Device Repair"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Selection */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
              What Device Needs Repair?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We repair all major electronics with genuine parts and expert
              craftsmanship
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Smartphones</CardTitle>
                <CardDescription>
                  iPhone, Samsung, Google Pixel & more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Screen Replacement
                    </span>
                    <span className="text-sm font-medium">$89-$299</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Battery Replacement
                    </span>
                    <span className="text-sm font-medium">$49-$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Water Damage
                    </span>
                    <span className="text-sm font-medium">$99-$199</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  <Link
                    href="/repair?device=phone&deviceType=phone"
                    className="w-full"
                  >
                    Select Phone
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Tablet className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Tablets</CardTitle>
                <CardDescription>
                  iPad, Samsung Galaxy Tab & more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Screen Replacement
                    </span>
                    <span className="text-sm font-medium">$149-$399</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Battery Replacement
                    </span>
                    <span className="text-sm font-medium">$79-$129</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Charging Port
                    </span>
                    <span className="text-sm font-medium">$69-$99</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  <Link
                    href="/repair?device=tablet&deviceType=tablet"
                    className="w-full"
                  >
                    Select Tablet
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Laptop className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Computers</CardTitle>
                <CardDescription>
                  MacBook, Windows laptops & desktops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Screen Replacement
                    </span>
                    <span className="text-sm font-medium">$199-$499</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Keyboard Repair
                    </span>
                    <span className="text-sm font-medium">$99-$199</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Data Recovery
                    </span>
                    <span className="text-sm font-medium">$149-$299</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  <Link
                    href="/repair?device=computer&deviceType=computer"
                    className="w-full"
                  >
                    Select Computer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Example */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
              Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. You know exactly what you'll pay before we start.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  iPhone 14 Screen Replacement
                </h3>
                <p className="text-foreground">
                  Cracked display replacement with genuine parts
                </p>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">P</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Parts Cost
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Genuine iPhone 14 screen
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      $164
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Service Fee
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Professional repair service
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">$50</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-600/10 rounded-lg border border-green-600/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Pickup & Return
                      </div>
                      <div className="text-sm text-muted-foreground">
                        We come to you
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      FREE
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t-2 border-primary/20 pt-4">
                <div className="flex justify-between items-center p-4 bg-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">$</span>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-foreground">
                        Total Cost
                      </div>
                      <div className="text-sm text-primary-foreground/80">
                        With 90-day warranty
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-foreground">
                      $214
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">
                      Free pickup & return
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">Genuine parts only</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">90-day warranty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">Same-day service</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground text-center">
                    <strong>Note:</strong> Parts costs vary by device model.
                    Service fee remains $50 for all repairs.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5 rating</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-muted-foreground">Richmond, VA</p>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Incredible service! Dr Device VA picked up my broken MacBook,
                fixed it perfectly, and returned it the same day. The
                convenience factor is unmatched."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mike R.</h4>
                  <p className="text-sm text-muted-foreground">
                    Virginia Beach, VA
                  </p>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "My iPhone screen was completely shattered. Dr Device VA made it
                look brand new again. Fair pricing and excellent communication
                throughout."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">LK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lisa K.</h4>
                  <p className="text-sm text-muted-foreground">Norfolk, VA</p>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "As a busy professional, I can't afford downtime. Their pickup
                service saved me hours, and the repair quality exceeded my
                expectations."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
                Schedule Your Repair
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll contact you within 30 minutes
                to schedule pickup
              </p>
            </div>
            <Card className="p-8">
              <form className="space-y-6" onSubmit={handleContactFormSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={contactForm.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      placeholder="(555) 123-4567"
                      value={contactForm.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactForm({
                          ...contactForm,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Device Type</label>
                    <select
                      className="w-full p-3 border border-input rounded-md bg-background"
                      value={contactForm.deviceType}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          deviceType: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select device type</option>
                      <option value="phone">Smartphone</option>
                      <option value="tablet">Tablet</option>
                      <option value="computer">Laptop/Desktop</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Pickup Address
                    </label>
                    <Input
                      placeholder="Street address in Virginia"
                      value={contactForm.address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactForm({
                          ...contactForm,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Describe the Issue
                  </label>
                  <Textarea
                    placeholder="Tell us what's wrong with your device..."
                    className="min-h-[100px]"
                    value={contactForm.issue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setContactForm({ ...contactForm, issue: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Pickup
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-serif">
                  Dr Device VA
                </span>
              </Link>
              <p className="text-muted-foreground">
                Professional mobile repair service for Virginia. We come to you
                for convenient, reliable electronics repair throughout the
                state.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Smartphone Repair</li>
                <li>Tablet Repair</li>
                <li>Laptop Repair</li>
                <li>Data Recovery</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Service Areas</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Washington DC</li>
                <li>Maryland</li>
                <li>Virginia</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-TECH</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>sa6ds1@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Saturday-Thursday: 9AM-5PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 Dr Device VA. All rights reserved. Licensed and
              insured mobile repair service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
