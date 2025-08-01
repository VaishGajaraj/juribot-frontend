import React, { useState, useEffect } from "react";
import { Document, Citation, Feedback } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";

import DocumentViewer from "../components/document/DocumentViewer";
import CitationPanel from "../components/document/CitationPanel";
import ViolationDetails from "../components/document/ViolationDetails";
import FeedbackModal from "../components/document/FeedbackModal";

export default function DocumentPage() {
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [citations, setCitations] = useState([]);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const documentId = urlParams.get("id");

  useEffect(() => {
    if (documentId) {
      loadDocumentData();
    }
  }, [documentId]);

  const loadDocumentData = async () => {
    setIsLoading(true);
    try {
      const [docData, citationsData] = await Promise.all([
        Document.list("id", 1, { id: documentId }),
        Citation.filter({ doc_id: documentId }, "-created_date")
      ]);
      
      if (docData.length > 0) {
        setDocument(docData[0]);
        setCitations(citationsData);
      }
    } catch (error) {
      console.error("Error loading document:", error);
    }
    setIsLoading(false);
  };

  const handleFeedback = async (feedbackData) => {
    try {
      await Feedback.create({
        citation_id: selectedCitation.id,
        ...feedbackData
      });
      setShowFeedback(false);
      // Optionally reload data or show success message
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="glass-morphism rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-white">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="glass-morphism rounded-2xl p-8 text-center">
          <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Document Not Found</h2>
          <p className="text-white/80 mb-4">The document you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="glass-button bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-2xl p-6"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <Button
                variant="ghost"
                onClick={() => navigate(createPageUrl("Dashboard"))}
                className="glass-button text-white hover:bg-white/25"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {document.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  <span>Words: {document.word_count?.toLocaleString() || 0}</span>
                  <span>Citations: {citations.length}</span>
                  <span>Uploaded: {format(new Date(document.created_date), "MMM d, yyyy")}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(document.status)}>
                {getStatusIcon(document.status)}
                <span className="ml-1 capitalize">{document.status}</span>
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document Viewer */}
          <div className="lg:col-span-2">
            <DocumentViewer 
              document={document}
              citations={citations}
              selectedCitation={selectedCitation}
              onCitationSelect={setSelectedCitation}
            />
          </div>

          {/* Citation Analysis Panel */}
          <div className="space-y-6">
            <CitationPanel 
              citations={citations}
              selectedCitation={selectedCitation}
              onCitationSelect={setSelectedCitation}
              onProvideFeedback={() => setShowFeedback(true)}
            />
            
            {selectedCitation && (
              <ViolationDetails 
                citation={selectedCitation}
                onProvideFeedback={() => setShowFeedback(true)}
              />
            )}
          </div>
        </div>

        {/* Feedback Modal */}
        {showFeedback && selectedCitation && (
          <FeedbackModal
            citation={selectedCitation}
            onSubmit={handleFeedback}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </div>
    </div>
  );
}