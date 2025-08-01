import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentViewer({ document, citations, selectedCitation, onCitationSelect }) {
  const highlightCitations = (text) => {
    if (!citations.length) return text;
    
    let highlightedText = text;
    const sortedCitations = [...citations].sort((a, b) => b.start_idx - a.start_idx);
    
    sortedCitations.forEach((citation) => {
      const before = highlightedText.substring(0, citation.start_idx);
      const citationText = highlightedText.substring(citation.start_idx, citation.end_idx);
      const after = highlightedText.substring(citation.end_idx);
      
      const isSelected = selectedCitation?.id === citation.id;
      const statusClass = {
        'GOOD': 'bg-green-100 border-green-300 text-green-800',
        'VIOLATION': 'bg-red-100 border-red-300 text-red-800',
        'NEEDS_REVIEW': 'bg-yellow-100 border-yellow-300 text-yellow-800',
        'PENDING': 'bg-gray-100 border-gray-300 text-gray-800'
      }[citation.rule_status] || 'bg-gray-100 border-gray-300 text-gray-800';
      
      const selectedClass = isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : '';
      
      highlightedText = before + 
        `<span class="inline-block px-1 py-0.5 rounded border cursor-pointer transition-all hover:shadow-md ${statusClass} ${selectedClass}" data-citation-id="${citation.id}">${citationText}</span>` + 
        after;
    });
    
    return highlightedText;
  };

  const handleCitationClick = (e) => {
    const citationId = e.target.getAttribute('data-citation-id');
    if (citationId) {
      const citation = citations.find(c => c.id === citationId);
      if (citation) {
        onCitationSelect(citation);
      }
    }
  };

  return (
    <Card className="glass-morphism border-white/20 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Document Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {document.text ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-invert max-w-none"
          >
            <div 
              className="bg-white/5 rounded-lg p-6 text-white/90 leading-relaxed whitespace-pre-wrap cursor-text select-text"
              onClick={handleCitationClick}
              dangerouslySetInnerHTML={{ 
                __html: highlightCitations(document.text) 
              }}
            />
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/70">No text content available</p>
            <p className="text-white/50 text-sm">
              Document content could not be extracted or is not yet processed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}