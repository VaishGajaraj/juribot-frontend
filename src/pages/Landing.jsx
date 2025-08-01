import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  CheckCircle, 
  Upload, 
  Zap, 
  Shield,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const Feature = ({ icon: Icon, title, description }) => (
  <div className="text-center md:text-left">
    <div className="w-12 h-12 mb-4 bg-white/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
      <Icon className="w-6 h-6 text-[#40e0d0]" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <style>{`
        .logo-gradient {
          background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-bg-gradient {
          background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
        }
      `}</style>
      
      {/* Header */}
      <header className="py-4 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 logo-bg-gradient rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg logo-gradient">JuriBot</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("SignIn")}>
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">Sign In</Button>
            </Link>
            <Link to={createPageUrl("SignIn")}>
              <Button className="logo-bg-gradient hover:opacity-90 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The AI Copilot for
              <br />
              <span className="logo-gradient">Legal Professionals</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              JuriBot uses AI to automate Bluebook compliance checking and verify legal support, 
              letting you focus on what matters most: winning your case.
            </p>
            <Link to={createPageUrl("SignIn")}>
              <Button size="lg" className="logo-bg-gradient hover:opacity-90 text-white group">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid md:grid-cols-3 gap-12"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Feature
                icon={Zap}
                title="Instant Analysis"
                description="Get comprehensive citation analysis in under 60 seconds. No more tedious manual checking."
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Feature
                icon={CheckCircle}
                title="Bluebook Compliance"
                description="Automatically detect violations with precise error identification and smart correction suggestions."
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Feature
                icon={Shield}
                title="Support Verification"
                description="Our AI verifies if your citations actually support your legal arguments and claims, reducing risk."
              />
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="bg-white/5 rounded-lg p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your legal workflow?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Join top-tier law firms who trust JuriBot to deliver excellence.
              </p>
              <Link to={createPageUrl("SignIn")}>
                <Button size="lg" className="logo-bg-gradient hover:opacity-90 text-white group">
                  Get Started for Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">© 2024 JuriBot. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-white/60 hover:text-white">Privacy</Link>
            <Link to="#" className="text-white/60 hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}