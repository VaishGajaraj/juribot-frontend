import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ViolationsSummary({ citations, isLoading }) {
  const commonViolations = citations
    .filter(c => c.violations && c.violations.length > 0)
    .flatMap(c => c.violations)
    .reduce((acc, violation) => {
      const key = violation.rule_title || "Unknown Rule";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  const topViolations = Object.entries(commonViolations)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Common Issues
        </h3>
      </div>
      <div className="p-4">
        {topViolations.length > 0 ? (
          <div className="space-y-3">
            {topViolations.map(([rule, count], index) => (
              <motion.div
                key={rule}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <p className="text-white/70 truncate">{rule}</p>
                <p className="font-medium text-white">{count}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-10 h-10 text-white/50 mx-auto mb-3" />
            <p className="text-white/70">No violations found.</p>
            <p className="text-sm text-white/50">Keep up the great work!</p>
          </div>
        )}
      </div>
    </div>
  );
}