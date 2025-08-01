
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Shield, Palette, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    instantAnalysis: true,
    highlightViolations: true,
    showConfidenceScores: false,
    autoSaveFeedback: true
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Settings
              </h1>
              <p className="text-white/80 text-lg">
                Customize your JuriBot experience
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="grid gap-6">
          {/* Analysis Preferences */}
          <Card className="bg-[#1a1a1a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Analysis Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Instant Analysis</Label>
                  <p className="text-white/70 text-sm">Automatically analyze documents upon upload</p>
                </div>
                <Switch
                  checked={preferences.instantAnalysis}
                  onCheckedChange={(value) => handlePreferenceChange('instantAnalysis', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Show Confidence Scores</Label>
                  <p className="text-white/70 text-sm">Display AI confidence levels for each analysis</p>
                </div>
                <Switch
                  checked={preferences.showConfidenceScores}
                  onCheckedChange={(value) => handlePreferenceChange('showConfidenceScores', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card className="bg-[#1a1a1a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Display Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Highlight Violations</Label>
                  <p className="text-white/70 text-sm">Highlight citation violations in document viewer</p>
                </div>
                <Switch
                  checked={preferences.highlightViolations}
                  onCheckedChange={(value) => handlePreferenceChange('highlightViolations', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-[#1a1a1a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Email Notifications</Label>
                  <p className="text-white/70 text-sm">Receive email updates on document processing</p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(value) => handlePreferenceChange('emailNotifications', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-[#1a1a1a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Auto-Save Feedback</Label>
                  <p className="text-white/70 text-sm">Automatically save your feedback to improve AI accuracy</p>
                </div>
                <Switch
                  checked={preferences.autoSaveFeedback}
                  onCheckedChange={(value) => handlePreferenceChange('autoSaveFeedback', value)}
                />
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-medium text-white mb-2">Data Management</h4>
                <p className="text-white/70 text-sm mb-4">
                  Manage your data and privacy settings
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="bg-transparent text-white border-white/30 hover:border-white hover:text-white">
                    Export Data
                  </Button>
                  <Button variant="outline" className="bg-transparent text-white border-white/30 hover:border-red-500 hover:text-red-400">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
