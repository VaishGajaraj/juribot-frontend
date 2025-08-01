
import React from "react";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function SignInPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(createPageUrl("Dashboard"));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
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
      
      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <Link to={createPageUrl("Landing")} className="inline-block">
              <div className="w-12 h-12 logo-bg-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Welcome to <span className="logo-gradient">JuriBot</span></h1>
            <p className="text-white/60 mt-1">Click continue to get started.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6">
            <Button
              onClick={handleContinue}
              className="w-full logo-bg-gradient hover:opacity-90 text-white"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
