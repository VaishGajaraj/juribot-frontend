import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeText } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Upload, FileText, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target.result;
        const { data } = await analyzeText(text);
        navigate(createPageUrl('Document'), { state: { analysis: data } });
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
      setError("File upload failed. Please try again.");
      setIsUploading(false);
    }
  };

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
                onChange={handleFileSelect}
                className="bg-[#121212] border-white/20 text-white file:text-white/70"
                accept=".pdf,.doc,.docx,.txt"
              />
              <Button
                onClick={handleUpload}
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
      </div>
    </div>
  );
}