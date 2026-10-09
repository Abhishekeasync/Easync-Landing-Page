"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { DashboardChart } from "./DashboardChart";
import { EASE_OUT } from "./motion";
import {
  FileText,
  Clock,
  Warehouse,
  CheckCircle,
  ArrowsClockwise,
  WarningCircle,
  PaperPlaneTilt,
  Receipt,
  MagnifyingGlass,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Sparkle
} from "@phosphor-icons/react";

type TabKey = "gstr2b" | "aging" | "einvoice" | "inventory";

export function DashboardVisual() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabKey>("gstr2b");
  const [recoStatus, setRecoStatus] = useState<Record<string, boolean>>({
    "inv-1": true,
    "inv-2": false,
    "inv-3": true,
  });

  function toggleReco(id: string) {
    setRecoStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div
      id="product-demo"
      className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100"
    >
      {/* Browser Chrome Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="ml-3 hidden sm:flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1 text-xs text-slate-400 border border-slate-700/50 font-mono">
            <span className="text-emerald-400">https://</span>app.easyncbooks.com/workspace/compliance
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck size={14} weight="fill" /> CA Live Sync
          </span>
          <span className="hidden md:inline-block text-slate-400">GSTN: 07AAAAA0000A1Z5</span>
        </div>
      </div>

      <DashboardChart />

      {/* Main Command Center Layout */}
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Navigation Sidebar */}
        <div className="flex min-w-0 gap-1 overflow-x-auto border-b border-slate-800 bg-slate-900/40 p-3 lg:flex-col lg:overflow-x-visible lg:border-b-0 lg:border-r">
          {[
            { id: "gstr2b", label: "GSTR-2B Auto Reco", icon: ArrowsClockwise, badge: "99.4%" },
            { id: "aging", label: "Debtors Aging", icon: Clock, badge: "30-60-90d" },
            { id: "einvoice", label: "E-Invoicing & IRN", icon: Receipt, badge: "1-Click" },
            { id: "inventory", label: "Multi-Godown", icon: Warehouse, badge: "3 Hubs" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex w-max shrink-0 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer max-sm:min-h-11 lg:w-full ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Icon size={16} weight={isActive ? "bold" : "regular"} className="shrink-0" />
                  <span className="whitespace-nowrap lg:whitespace-normal">{tab.label}</span>
                </div>
                <span
                  className={`hidden shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono sm:inline-block ${
                    isActive ? "bg-blue-700 text-blue-100" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Content Area */}
        <div className="flex min-h-[380px] min-w-0 flex-col justify-between bg-slate-950/90 p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className="flex flex-col gap-4"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
          {/* TAB 1: GSTR-2B AUTO RECONCILIATION */}
          {activeTab === "gstr2b" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    GSTR-2B vs Purchase Register <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">Sep 2026</span>
                  </h3>
                  <p className="text-xs text-slate-400">Auto-matching ITC claim eligibility with GST portal portal records.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Total Invoices: <strong className="text-white">142</strong></span>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">Matched: ₹14,82,000</span>
                </div>
              </div>

              {/* Table of Invoices */}
              <div className="flex flex-col gap-2.5">
                {[
                  { id: "inv-1", vendor: "Apex Manufacturing Ltd", gstin: "07AAACA1234F1Z1", portalITC: "₹1,24,000", bookITC: "₹1,24,000", diff: "₹0", state: "Matched" },
                  { id: "inv-2", vendor: "Sharma Electricals", gstin: "07BBBCA4321F1Z8", portalITC: "₹48,500", bookITC: "₹52,000", diff: "+₹3,500", state: "Pending Reco" },
                  { id: "inv-3", vendor: "Ramesh Trading Hub", gstin: "07CCCCA9876F1Z3", portalITC: "₹86,200", bookITC: "₹86,200", diff: "₹0", state: "Matched" },
                ].map((row, index) => {
                  const isMatched = recoStatus[row.id];
                  return (
                    <motion.div
                      key={row.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-slate-900/60 p-3 text-xs transition-colors hover:border-slate-700"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: reduce ? 0 : index * 0.05,
                        ease: EASE_OUT,
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-100">{row.vendor}</span>
                        <span className="font-mono text-[11px] text-slate-500">{row.gstin}</span>
                      </div>
                      <div className="grid min-w-0 grid-cols-3 gap-2 font-mono text-slate-300 sm:gap-4">
                        <div className="min-w-0">
                          <span className="block text-[10px] text-slate-500">Portal ITC</span>
                          <span className="whitespace-nowrap">{row.portalITC}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-slate-500">Books ITC</span>
                          <span className="whitespace-nowrap">{row.bookITC}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-slate-500">Diff</span>
                          <span className={`whitespace-nowrap ${isMatched ? "text-emerald-400" : "font-bold text-amber-400"}`}>
                            {isMatched ? "₹0 (100%)" : row.diff}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleReco(row.id)}
                        className={`pressable inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold max-sm:min-h-10 ${
                          isMatched
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
                        }`}
                      >
                        {isMatched ? (
                          <>
                            <Check size={14} weight="bold" /> Matched
                          </>
                        ) : (
                          <>
                            <ArrowsClockwise size={14} weight="bold" /> One-Click Reco
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-800/40 bg-blue-950/40 p-3 text-xs text-blue-200">
                <span className="flex min-w-0 items-center gap-2">
                  <Sparkle size={16} weight="fill" className="text-blue-400" />
                  <span>Interactive Tip: Click <strong>"One-Click Reco"</strong> above to test automatic vendor reconciliation.</span>
                </span>
                <span className="font-bold text-emerald-400">ITC Claim Secured</span>
              </div>
            </div>
          )}

          {/* TAB 2: DEBTORS AGING & RECOVERY */}
          {activeTab === "aging" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Receivables Aging & Recovery Ledger
                  </h3>
                  <p className="text-xs text-slate-400">Sorted by payment delay. Trigger automated payment reminders.</p>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  Total Outstanding: <strong className="text-white">₹14,24,000</strong>
                </div>
              </div>

              {/* Aging Buckets */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <span className="text-[11px] font-medium text-slate-400">1 - 30 Days</span>
                  <div className="mt-1 whitespace-nowrap text-lg font-bold text-emerald-400">₹6,40,000</div>
                  <span className="text-[10px] text-slate-500">4 Accounts</span>
                </div>
                <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-3">
                  <span className="text-[11px] font-medium text-amber-400">31 - 60 Days</span>
                  <div className="mt-1 whitespace-nowrap text-lg font-bold text-amber-300">₹5,12,000</div>
                  <span className="text-[10px] text-amber-400/80">Follow up due</span>
                </div>
                <div className="rounded-xl border border-rose-900/50 bg-rose-950/20 p-3">
                  <span className="text-[11px] font-medium text-rose-400">60+ Days (Overdue)</span>
                  <div className="mt-1 whitespace-nowrap text-lg font-bold text-rose-400">₹2,72,000</div>
                  <span className="text-[10px] text-rose-400/80">Action required</span>
                </div>
              </div>

              {/* Aging Customer List */}
              <div className="flex flex-col gap-2">
                {[
                  { name: "Gupta Electricals Pvt Ltd", amount: "₹2,10,000", days: "64 days overdue", overdue: true },
                  { name: "Mehta Polymers", amount: "₹1,84,000", days: "28 days", overdue: false },
                  { name: "Vanguard Tech Solutions", amount: "₹62,000", days: "42 days overdue", overdue: true },
                ].map((debtor, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{debtor.name}</div>
                      <div className={`text-[11px] ${debtor.overdue ? "text-rose-400 font-medium" : "text-slate-400"}`}>{debtor.days}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono font-bold text-slate-200">{debtor.amount}</span>
                      <button
                        type="button"
                        onClick={() => alert(`Simulated WhatsApp payment reminder sent to ${debtor.name} for ${debtor.amount}!`)}
                        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 max-sm:min-h-10"
                      >
                        <PaperPlaneTilt size={13} weight="bold" /> Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: E-INVOICING & E-WAY BILLS */}
          {activeTab === "einvoice" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    E-Invoice & E-Way Bill Generator
                  </h3>
                  <p className="text-xs text-slate-400">Direct Integration with NIC IRP Portal via API.</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800/60">
                  <CheckCircle size={14} weight="fill" /> IRP Portal Online
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Active Invoice #</span>
                  <span className="font-mono font-bold text-white">INV-2026-8942</span>
                </div>
                <div className="grid grid-cols-1 gap-3 text-xs font-mono min-[480px]:grid-cols-2 sm:grid-cols-4">
                  <div className="min-w-0 break-all">
                    <span className="text-[10px] text-slate-500 block">Buyer GSTN</span>
                    07AAACG5678H1Z4
                  </div>
                  <div className="min-w-0 whitespace-nowrap">
                    <span className="text-[10px] text-slate-500 block">Invoice Value</span>
                    ₹3,54,000
                  </div>
                  <div className="min-w-0 whitespace-nowrap">
                    <span className="text-[10px] text-slate-500 block">IGST (18%)</span>
                    ₹54,000
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-500 block">IRN Status</span>
                    <span className="text-emerald-400 font-bold">Generated</span>
                  </div>
                </div>
                <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-slate-800 bg-slate-950 p-2 text-[11px] font-mono text-slate-400">
                  IRN: 8f4a9b2c1d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MULTI-GODOWN INVENTORY */}
          {activeTab === "inventory" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Multi-Branch & Godown Stock Sync
                  </h3>
                  <p className="text-xs text-slate-400">Real-time inventory levels across branches.</p>
                </div>
                <span className="text-xs text-slate-300 font-mono">Total SKUs: <strong className="text-white">482</strong></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: "Delhi Central Godown", stock: "14,200 Units", status: "Optimal", color: "text-emerald-400" },
                  { name: "Bhiwandi Hub (Mumbai)", stock: "8,950 Units", status: "Optimal", color: "text-emerald-400" },
                  { name: "Ahmedabad Branch", stock: "1,120 Units", status: "Low Stock Alert", color: "text-amber-400 font-bold" },
                ].map((wh, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                    <span className="text-xs font-semibold text-slate-200 block">{wh.name}</span>
                    <div className="text-base font-bold text-white mt-1 font-mono">{wh.stock}</div>
                    <span className={`text-[11px] ${wh.color} block mt-1`}>{wh.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </motion.div>
          </AnimatePresence>

          {/* Footer Bar of Preview */}
          <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-1.5">
              <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
              <span>Live System Performance: 100% Uptime</span>
            </span>
            <a
              href="#demo"
              className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 no-underline"
            >
              Request Custom Demo Setup <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

