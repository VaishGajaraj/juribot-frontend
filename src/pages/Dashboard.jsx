
import React, { useState, useEffect } from "react";
import { Document, Citation } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Upload,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import ViolationsSummary from "../components/dashboard/ViolationsSummary";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [citations, setCitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [docsData, citationsData] = await Promise.all([
        Document.list("-created_date", 20),
        Citation.list("-created_date", 50)
      ]);
      setDocuments(docsData);
      setCitations(citationsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const stats = {
    totalDocuments: documents.length,
    totalCitations: citations.length,
    violationsFound: citations.filter(c => c.rule_status === "VIOLATION").length,
    accuracyRate: citations.length > 0 ? 
      Math.round(((citations.filter(c => c.rule_status === "GOOD").length) / citations.length) * 100) : 0
  };

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

      {/* Stats Cards */}
      <DashboardStats stats={stats} isLoading={isLoading} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentDocuments 
            documents={documents} 
            isLoading={isLoading}
            onDocumentClick={(doc) => window.open(createPageUrl(`Document?id=${doc.id}`), '_blank')}
          />
        </div>
        <div className="space-y-8">
          <ViolationsSummary citations={citations} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
