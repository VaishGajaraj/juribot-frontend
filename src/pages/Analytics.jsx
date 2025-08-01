import React, { useState, useEffect } from "react";
import { Document, Citation } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, PieChart, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [documents, setDocuments] = useState([]);
  const [citations, setCitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const [docsData, citationsData] = await Promise.all([
        Document.list("-created_date"),
        Citation.list("-created_date")
      ]);
      setDocuments(docsData);
      setCitations(citationsData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-white/80 text-lg">
                Insights into your citation compliance and trends
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Content */}
        <div className="grid gap-6">
          <Card className="bg-[#1a1a1a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Advanced Analytics Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <PieChart className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Detailed Analytics in Development
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                We're building comprehensive analytics to help you track citation compliance trends, 
                identify common violation patterns, and monitor your improvement over time. 
                This dashboard will include interactive charts, export capabilities, and detailed reporting.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-medium text-white mb-2">Compliance Trends</h4>
                  <p className="text-white/60 text-sm">Track your citation accuracy over time</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <PieChart className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-medium text-white mb-2">Violation Breakdown</h4>
                  <p className="text-white/60 text-sm">Understand your most common issues</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-medium text-white mb-2">Historical Reports</h4>
                  <p className="text-white/60 text-sm">Export detailed compliance reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}