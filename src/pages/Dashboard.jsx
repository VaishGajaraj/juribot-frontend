import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-white/70 mt-1">
              Welcome back, here's your compliance overview.
            </p>
          </div>
          <Link to={createPageUrl("Upload")}>
            <Button className="bg-gradient-to-r from-[#40e0d0] to-[#8a2be2] hover:opacity-90 text-white w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="text-white">
        No data to display. Upload a document to get started.
      </div>
    </div>
  );
}