"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileSpreadsheet, File as FilePdf, Clock, FileCheck, TrendingUp } from "lucide-react";
import Image from 'next/image';
import logo from 'furtherAILogo.png';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HOURLY_RATE = 45; // Some 'average hourly rate' for insurance processors
const AI_EFFICIENCY = 0.7; // An 'estimate' of 70% time reduction with AI
const WORKING_DAYS = 252; // Average working days per year based on 5-day work week (52 weeks)

export default function DashboardContainer() {
  const [tasksPerDay, setTasksPerDay] = useState(() => {
    const saved = localStorage.getItem("tasksPerDay");
    return saved ? parseInt(saved) : 50;
  });
  const [minutesPerTask, setMinutesPerTask] = useState(() => {
    const saved = localStorage.getItem("minutesPerTask");
    return saved ? parseInt(saved) : 15;
  });
  const [showCost, setShowCost] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasksPerDay", tasksPerDay.toString());
    localStorage.setItem("minutesPerTask", minutesPerTask.toString());
  }, [tasksPerDay, minutesPerTask]);

  const dailyManualHours = (tasksPerDay * minutesPerTask) / 60;
  const dailyAIHours = dailyManualHours * (1 - AI_EFFICIENCY);
  const annualHoursSaved = (dailyManualHours - dailyAIHours) * WORKING_DAYS;
  const annualCostSaved = annualHoursSaved * HOURLY_RATE;

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const months = i + 1;
    const hoursSaved = (annualHoursSaved / 12) * months;
    const costSaved = (annualCostSaved / 12) * months;
    return {
      month: new Date(2024, i).toLocaleString("default", { month: "short" }),
      hours: Math.round(hoursSaved),
      cost: Math.round(costSaved),
    };
  });

  const handleExportXLSX = () => {
    console.log("Exporting XLSX report...");
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF report...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden md:block">
            <Image 
              src={logo}
              alt="FurtherAI Logo"
              width={125}
              height={50}
              priority
            />
          </div>
          <strong className="text-center md:text-left">
            <span className="block md:hidden">Further AI Insurance Workflow Efficiency Calculator</span>
            <span className="hidden md:block">Insurance Workflow Efficiency Calculator</span>
          </strong>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportXLSX}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export XLSX
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-2"
            >
              <FilePdf className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg bg-white/95 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Input Parameters
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Policies Processed Daily</label>
                <Slider
                  value={[tasksPerDay]}
                  onValueChange={(value) => setTasksPerDay(value[0])}
                  min={1}
                  max={200}
                  step={1}
                  className="my-4"
                />
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTasksPerDay(Math.max(1, tasksPerDay - 1))}
                  >
                    -
                  </Button>
                  <span className="font-mono">{tasksPerDay}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTasksPerDay(Math.min(200, tasksPerDay + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Minutes Per Task</label>
                <Slider
                  value={[minutesPerTask]}
                  onValueChange={(value) => setMinutesPerTask(value[0])}
                  min={1}
                  max={60}
                  step={1}
                  className="my-4"
                />
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMinutesPerTask(Math.max(1, minutesPerTask - 1))}
                  >
                    -
                  </Button>
                  <span className="font-mono">{minutesPerTask}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMinutesPerTask(Math.min(60, minutesPerTask + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg bg-white/95 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Daily Time Analysis
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <Progress value={70} className="h-4 w-full" />
                <p className="text-sm text-gray-600 mt-2">70% Time Reduction with AI</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Manual Processing</p>
                  <p className="text-2xl font-bold">{dailyManualHours.toFixed(1)} hours</p>
                </div>
                <div>
                  <p className="text-sm font-medium">AI-Assisted Processing</p>
                  <p className="text-2xl font-bold text-blue-600">{dailyAIHours.toFixed(1)} hours</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg bg-white/95 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Annual Impact
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Hours Saved Annually</p>
                <p className="text-2xl font-bold">{Math.round(annualHoursSaved)} hours</p>
              </div>
              <div>
                <p className="text-sm font-medium">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Math.round(annualCostSaved).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 shadow-lg bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Cumulative Savings</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCost(!showCost)}
            >
              Show {showCost ? "Hours" : "Cost"}
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={showCost ? "cost" : "hours"}
                  stroke="#1E3A8A"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}