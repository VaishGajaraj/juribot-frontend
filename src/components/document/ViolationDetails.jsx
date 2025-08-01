import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

const getSeverityIcon = (severity) => {
  switch (severity) {
    case "error": return <AlertTriangle className="w-4 h-4" />;
    case "warning": return <Info className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case "error": return "bg-red-100 text-red-800 border-red-200";
    case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default: return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

export default function ViolationDetails({ citation, onProvideFeedback }) {
  if (!citation) return null;

  const hasViolations = citation.violations && citation.violations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="glass-morphism border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {citation.rule_status === "GOOD" ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400" />
            )}
            Citation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Citation Text */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/90 text-sm font-medium">
              "{citation.text}"
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Status:</span>
            <Badge className={
              citation.rule_status === "GOOD" 
                ? "bg-green-100 text-green-800 border-green-200"
                : citation.rule_status === "VIOLATION"
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }>
              {citation.rule_status === "GOOD" && <CheckCircle className="w-3 h-3 mr-1" />}
              {citation.rule_status === "VIOLATION" && <AlertTriangle className="w-3 h-3 mr-1" />}
              {citation.rule_status?.replace('_', ' ') || "Pending"}
            </Badge>
          </div>

          {/* Confidence Score */}
          {citation.confidence_score && (
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Confidence:</span>
              <span className="text-white font-medium">
                {Math.round(citation.confidence_score * 100)}%
              </span>
            </div>
          )}

          {/* Violations */}
          {hasViolations && (
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Violations Found ({citation.violations.length})
              </h4>
              <div className="space-y-3">
                {citation.violations.map((violation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Badge className={getSeverityColor(violation.severity)}>
                        {getSeverityIcon(violation.severity)}
                        <span className="ml-1 capitalize">{violation.severity}</span>
                      </Badge>
                      {violation.rule_title && (
                        <span className="text-white/60 text-xs">
                          {violation.rule_title}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-white/90 text-sm mb-2">
                      {violation.message}
                    </p>
                    
                    {violation.suggestion && (
                      <div className="flex items-start gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-yellow-200">
                          <strong>Suggestion:</strong> {violation.suggestion}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Support Status */}
          {citation.support_status && citation.support_status !== "PENDING" && (
            <div>
              <h4 className="font-medium text-white mb-2">Support Analysis</h4>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Badge className={
                  citation.support_status === "SUPPORTS"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : citation.support_status === "DOES_NOT_SUPPORT"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }>
                  {citation.support_status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 glass-button text-white border-white/30 hover:bg-green-500/20"
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Correct
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 glass-button text-white border-white/30 hover:bg-red-500/20"
            >
              <ThumbsDown className="w-3 h-3 mr-1" />
              Incorrect
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass-button text-white border-white/30 hover:bg-white/15"
            >
              <BookOpen className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}