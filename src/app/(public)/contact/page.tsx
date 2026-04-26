import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - JovaDrops",
  description: "Get in touch with JovaDrops. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a2b4b] mb-4">Contact Us</h1>
        <p className="text-slate-500 text-lg">We&apos;d love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-8 p-8 bg-slate-50/50 rounded-2xl border border-slate-100">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Call Us</h3>
              <p className="text-slate-600 mt-1">+254 748 928 369</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Email Us</h3>
              <p className="text-slate-600 mt-1">info@jovadrops.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Visit Us</h3>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Kajiado, Kitengela<br />
                Nairobi-Namange Rd
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Business Hours</h3>
              <div className="text-slate-600 mt-1 text-sm space-y-1.5">
                <p>Mon - Sat: 08:30 AM - 09:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <form className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="Your Phone"
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="Subject"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors bg-slate-50/50 resize-none placeholder:text-slate-400"
                placeholder="Your Message"
              ></textarea>
            </div>

            <Button className="w-full bg-[#1c54b2] hover:bg-blue-800 text-white py-6 text-base font-medium rounded-xl mt-2">
              Send Message
            </Button>
          </form>
        </div>

        {/* Interactive Map */}
        <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-slate-100 relative bg-slate-50 shadow-sm">
          <iframe
            title="Office Location"
            src="https://maps.google.com/maps?q=Jovadrops%20Purified%20Water%20Refill%20Station,%20Namanga%20Road,%20Kitengela%20+(Kenya)&t=&z=12&ie=UTF8&iwloc=B&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
