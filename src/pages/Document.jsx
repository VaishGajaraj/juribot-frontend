
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRules } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DocumentPage() {
  const location = useLocation();
  const { analysis } = location.state || {};
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const { data } = await getRules();
        setRules(data);
      } catch (error) {
        console.error("Failed to fetch rules:", error);
      }
    };

    fetchRules();
  }, []);

  if (!analysis) {
    return <div className="text-white">No analysis found.</div>;
  }

  const getRule = (ruleNumber) => {
    return rules.find(rule => rule.rule_number === ruleNumber);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Citations</h3>
                <Accordion type="single" collapsible className="w-full">
                  {analysis.citations.map((citation, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-white">{citation.text}</AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium text-white">Type</TableCell>
                              <TableCell className="text-white">{citation.citation_type}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium text-white">Valid</TableCell>
                              <TableCell className="text-white">{citation.is_valid ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium text-white">Corrected Text</TableCell>
                              <TableCell className="text-white">{citation.corrected_text}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium text-white">Errors</TableCell>
                              <TableCell className="text-white">{citation.errors.join(', ')}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium text-white">Governing Rules</TableCell>
                              <TableCell className="text-white">
                                <ul className="list-disc pl-5">
                                  {citation.governing_rules.map((ruleNumber, i) => {
                                    const rule = getRule(ruleNumber);
                                    return (
                                      <li key={i}>
                                        <strong>{ruleNumber}</strong>: {rule ? rule.rule_text : 'Rule not found'}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
