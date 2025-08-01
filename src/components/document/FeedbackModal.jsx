import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, X } from "lucide-react";

export default function FeedbackModal({ citation, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    feedback_type: "",
    user_assessment: "",
    comments: "",
    suggested_correction: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Provide Feedback
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Citation Preview */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/90 text-sm">
              "{citation.text}"
            </p>
          </div>

          {/* Feedback Type */}
          <div>
            <Label className="text-white/90">Feedback Type</Label>
            <Select 
              value={formData.feedback_type} 
              onValueChange={(value) => setFormData({...formData, feedback_type: value})}
            >
              <SelectTrigger className="glass-morphism border-white/30 text-white">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-white/20">
                <SelectItem value="correct" className="text-white">Analysis is Correct</SelectItem>
                <SelectItem value="incorrect" className="text-white">Analysis is Incorrect</SelectItem>
                <SelectItem value="suggestion" className="text-white">Suggestion for Improvement</SelectItem>
                <SelectItem value="bug_report" className="text-white">Report a Bug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Assessment */}
          <div>
            <Label className="text-white/90">Your Assessment</Label>
            <RadioGroup 
              value={formData.user_assessment} 
              onValueChange={(value) => setFormData({...formData, user_assessment: value})}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agree" id="agree" className="border-white/30" />
                <Label htmlFor="agree" className="text-white/90">I agree with the analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disagree" id="disagree" className="border-white/30" />
                <Label htmlFor="disagree" className="text-white/90">I disagree with the analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" className="border-white/30" />
                <Label htmlFor="partial" className="text-white/90">Partially correct</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comments" className="text-white/90">Additional Comments</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              placeholder="Share your thoughts on the analysis..."
              className="glass-morphism border-white/30 text-white placeholder:text-white/50 bg-white/10"
            />
          </div>

          {/* Suggested Correction */}
          {formData.feedback_type === "incorrect" && (
            <div>
              <Label htmlFor="correction" className="text-white/90">Suggested Correction</Label>
              <Textarea
                id="correction"
                value={formData.suggested_correction}
                onChange={(e) => setFormData({...formData, suggested_correction: e.target.value})}
                placeholder="How should this citation be corrected?"
                className="glass-morphism border-white/30 text-white placeholder:text-white/50 bg-white/10"
              />
            </div>
          )}
        </form>

        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="glass-button text-white border-white/30 hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!formData.feedback_type || !formData.user_assessment}
            className="glass-button bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}