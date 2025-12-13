// Updated component with dark theme support

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AIDoctorSuggestion() {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleGetSuggestion = async () => {
    if (!symptoms.trim() || symptoms.trim().length < 5) {
      toast.error("Please describe your symptoms (at least 5 characters)");
      return;
    }

    setIsLoading(true);
    setSuggestion("");
    setShowSuggestion(false);

    try {
      // API call placeholder
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
      toast.error("Failed to get AI suggestion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-800 dark:border-neutral-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          <CardTitle className="text-purple-900 dark:text-purple-200">
            AI Doctor Suggestion
          </CardTitle>
        </div>
        <CardDescription className="dark:text-neutral-400">
          Describe your symptoms and get AI-powered doctor specialty
          recommendations
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, etc.)..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            className="resize-none bg-white dark:bg-neutral-900 dark:text-neutral-200"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground dark:text-neutral-400 mt-1">
            {symptoms.length} characters
          </p>
        </div>

        <Button
          onClick={handleGetSuggestion}
          disabled={isLoading || symptoms.trim().length < 5}
          className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting AI Suggestion...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Recommendation
            </>
          )}
        </Button>

        {showSuggestion && suggestion && (
          <div className="space-y-3 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-purple-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-700 dark:bg-neutral-800 dark:text-purple-300"
              >
                AI Recommendation
              </Badge>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-sm text-gray-700 dark:text-neutral-300 whitespace-pre-wrap">
                {suggestion}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
