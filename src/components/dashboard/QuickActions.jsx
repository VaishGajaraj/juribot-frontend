import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const QuickActionButton = ({ icon: Icon, title, description, href, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -2 }}
  >
    <Link to={href}>
      <Button 
        variant="ghost" 
        className="w-full h-auto p-4 flex flex-col items-start gap-2 glass-button text-white hover:bg-white/15 transition-all duration-300"
      >
        <div className="flex items-center gap-3 w-full">
          <div className="p-2 rounded-lg bg-white/10">
            <Icon className="w-4 h-4" />
          </div>
          <div className="text-left flex-1">
            <div className="font-medium">{title}</div>
            <div className="text-xs text-white/70">{description}</div>
          </div>
        </div>
      </Button>
    </Link>
  </motion.div>
);

export default function QuickActions() {
  return (
    <Card className="glass-morphism border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <QuickActionButton
          icon={Upload}
          title="Upload Document"
          description="Analyze a new legal document"
          href={createPageUrl("Upload")}
          delay={0}
        />
        <QuickActionButton
          icon={BookOpen}
          title="Bluebook Rules"
          description="Reference citation guidelines"
          href="#"
          delay={0.1}
        />
        <QuickActionButton
          icon={Settings}
          title="Settings"
          description="Customize your preferences"
          href={createPageUrl("Settings")}
          delay={0.2}
        />
        <QuickActionButton
          icon={HelpCircle}
          title="Help Center"
          description="Get support and tutorials"
          href="#"
          delay={0.3}
        />
      </CardContent>
    </Card>
  );
}