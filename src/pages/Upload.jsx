
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Document } from '@/api/entities';
import { UploadFile } from '@/api/integrations';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Upload, FileText, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";

const StepChooseFile = ({ onFileSelect, onUpload, isUploading, file }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Card className="bg-[#1a1a1a] border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Step 1: Choose File
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          onChange={onFileSelect}
          className="bg-[#121212] border-white/20 text-white file:text-white/70"
          accept=".pdf,.doc,.docx,.txt"
        />
        <Button
          onClick={onUpload}
          disabled={!file || isUploading}
          className="w-full bg-gradient-to-r from-[#40e0d0] to-[#8a2be2] hover:opacity-90 text-white"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          Upload and Analyze
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const StepProcessing = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Card className="bg-[#1a1a1a] border-white/10 text-center">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Step 2: Processing Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-white/70">Your document is being analyzed.</p>
        <p className="text-white/70">
          This may take a few moments. You will be automatically redirected once it's complete.
        </p>
        <div className="w-full bg-white/10 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-[#40e0d0] to-[#8a2be2] h-2.5 rounded-full animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StepCompleted = ({ documentId }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="bg-[#1a1a1a] border-white/10 text-center">
            <CardHeader>
                <CardTitle className="text-white flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Analysis Complete
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-white/70 mb-4">You are being redirected to the results page...</p>
                 <Link to={createPageUrl(`Document?id=${documentId}`)}>
                    <Button className="w-full bg-gradient-to-r from-[#40e0d0] to-[#8a2be2] hover:opacity-90 text-white">
                        View Analysis
                    </Button>
                </Link>
            </CardContent>
        </Card>
    </motion.div>
);


export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [document, setDocument] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (document && (document.status === 'processing' || document.status === 'uploaded')) {
      const interval = setInterval(async () => {
        try {
          const updatedDocs = await Document.filter({ id: document.id });
          if (updatedDocs.length > 0) {
            setDocument(updatedDocs[0]);
          }
        } catch (e) {
            console.error("Failed to poll for document status", e);
        }
      }, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [document]);

  useEffect(() => {
    if (document && document.status === 'completed') {
      navigate(createPageUrl(`Document?id=${document.id}`));
    }
    if (document && document.status === 'error') {
      setError("There was an error processing your document. Please try again or contact support.");
      setIsUploading(false);
    }
  }, [document, navigate]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const { file_url } = await UploadFile({ file });
      const newDoc = await Document.create({
        title: file.name,
        file_url,
        status: 'uploaded',
      });
      setDocument(newDoc);
    } catch (err) {
      console.error(err);
      setError("File upload failed. Please try again.");
      setIsUploading(false);
    }
  };
  
  const getStep = () => {
      if (!document || document.status === 'error') {
          return 'choose';
      }
      if (document.status === 'uploaded' || document.status === 'processing') {
          return 'processing';
      }
      if (document.status === 'completed') {
          return 'completed';
      }
      return 'choose';
  }

  const currentStep = getStep();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(createPageUrl("Dashboard"))}
                    className="text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      New Analysis
                    </h1>
                    <p className="text-white/70">
                      Upload your legal document to begin
                    </p>
                  </div>
                </div>
            </div>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}
        
        <AnimatePresence mode="wait">
            {currentStep === 'choose' && 
                <StepChooseFile 
                    onFileSelect={handleFileSelect} 
                    onUpload={handleUpload}
                    isUploading={isUploading}
                    file={file}
                />
            }
            {currentStep === 'processing' && <StepProcessing />}
            {currentStep === 'completed' && <StepCompleted documentId={document.id} />}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
