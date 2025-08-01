import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Quote, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getStatusColor = (status) => {
  switch (status) {
    case "GOOD": return "bg-green-100 text-green-800 border-green-200";
    case "VIOLATION": return "bg-red-100 text-red-800 border-red-200";
    case "NEEDS_REVIEW": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "GOOD": return <CheckCircle className="w-4 h-4" />;
    case "VIOLATION": return <AlertTriangle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export default function CitationPanel({ citations, selectedCitation, onCitationSelect, onProvideFeedback }) {
  const groupedCitations = citations.reduce((acc, citation) => {
    const status = citation.rule_status || "PENDING";
    if (!acc[status]) acc[status] = [];
    acc[status].push(citation);
    return acc;
  }, {});

  return (
    <Card className="glass-morphism border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Quote className="w-5 h-5" />
          Citations ({citations.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {citations.length === 0 ? (
          <div className="text-center py-8">
            <Quote className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/70">No citations found</p>
            <p className="text-white/50 text-sm">
              Citations will appear here after document analysis
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status Summary */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(groupedCitations).map(([status, citationList]) => (
                <div key={status} className="p-2 rounded bg-white/5 text-center">
                  <div className="text-lg font-bold text-white">{citationList.length}</div>
                  <div className="text-xs text-white/70 capitalize">{status.toLowerCase()}</div>
                </div>
              ))}
            </div>

            {/* Citations List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {citations.map((citation, index) => (
                  <motion.div
                    key={citation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedCitation?.id === citation.id 
                        ? 'bg-white/15 border-white/30' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => onCitationSelect(citation)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={getStatusColor(citation.rule_status)}>
                        {getStatusIcon(citation.rule_status)}
                        <span className="ml-1 capitalize">
                          {citation.rule_status?.toLowerCase() || "pending"}
                        </span>
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </div>
                    
                    <p className="text-white/90 text-sm font-medium mb-1 truncate">
                      {citation.text}
                    </p>
                    
                    {citation.violations && citation.violations.length > 0 && (
                      <p className="text-red-300 text-xs">
                        {citation.violations.length} violation{citation.violations.length !== 1 ? 's' : ''} found
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {selectedCitation && (
              <Button
                onClick={onProvideFeedback}
                variant="outline"
                className="w-full glass-button text-white border-white/30 hover:bg-white/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Provide Feedback
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}