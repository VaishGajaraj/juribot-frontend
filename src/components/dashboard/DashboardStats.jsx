import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, colorClass, isLoading }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="bg-[#1a1a1a] border border-white/10">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-white/70">
          {title}
        </CardTitle>
        <Icon className={`w-4 h-4 text-white/70 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20 bg-white/10" />
        ) : (
          <div className="text-2xl font-bold text-white">
            {value}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardStats({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Documents"
        value={stats.totalDocuments}
        icon={FileText}
        colorClass="text-blue-400"
        isLoading={isLoading}
      />
      <StatCard
        title="Citations Found"
        value={stats.totalCitations}
        icon={CheckCircle}
        colorClass="text-green-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Violations Detected"
        value={stats.violationsFound}
        icon={AlertTriangle}
        colorClass="text-red-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Accuracy Rate"
        value={`${stats.accuracyRate}%`}
        icon={Percent}
        colorClass="text-purple-500"
        isLoading={isLoading}
      />
    </div>
  );
}