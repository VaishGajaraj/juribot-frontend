import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const getStatusColor = (status) => {
  switch (status) {
    case "completed": return "bg-green-900/50 text-green-300 border-green-500/30";
    case "processing": return "bg-blue-900/50 text-blue-300 border-blue-500/30";
    case "error": return "bg-red-900/50 text-red-300 border-red-500/30";
    default: return "bg-gray-700/50 text-gray-300 border-gray-500/30";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-3 h-3" />;
    case "processing": return <Clock className="w-3 h-3 animate-spin" />;
    case "error": return <AlertTriangle className="w-3 h-3" />;
    default: return <FileText className="w-3 h-3" />;
  }
};

export default function RecentDocuments({ documents, isLoading, onDocumentClick }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Recent Analyses</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <AnimatePresence>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/10" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-1 bg-white/10" />
                    <Skeleton className="h-3 w-1/2 bg-white/10" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-md bg-white/10" />
                </div>
              ))
            ) : documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-10 h-10 text-white/50 mx-auto mb-3" />
                <p className="text-white/70">No documents analyzed yet.</p>
                <p className="text-sm text-white/50">Upload your first document to get started.</p>
              </div>
            ) : (
              documents.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => onDocumentClick(document)}
                >
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">
                      {document.title}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {document.citation_count || 0} citations • {format(new Date(document.created_date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-xs capitalize ${getStatusColor(document.status)}`}>
                    {getStatusIcon(document.status)}
                    <span className="ml-1.5">{document.status}</span>
                  </Badge>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}