"use client";

import { useEffect, useState } from "react";
import {
  Crown,
  Ban,
  Calendar,
  CreditCard,
  ArrowUpCircle,
  RefreshCw,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountStatus() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const load = async () => {
    try {
      const res = await fetch("/api/subscription");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async () => {
    if (
      confirm(
        "Are you sure? Your premium features will be lost at the end of the cycle."
      )
    ) {
      await fetch("/api/subscription/cancel", { method: "POST" });
      load();
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center p-20 border border-rose-100 rounded-3xl bg-rose-50/20">
        <RefreshCw className="w-8 h-8 text-rose-400 animate-spin" />
      </div>
    );

  if (!data || data.subscription_status !== "active") {
    return (
      <div className="group relative overflow-hidden border border-gray-200 rounded-3xl p-10 text-center bg-white hover:border-rose-200 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-rose-500 transition-all" />
        <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-transform">
          <Ban className="text-gray-400 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          No Active Subscription
        </h3>
        <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto">
          Get access to unlimited storage, priority support, and advanced
          analytics.
        </p>
        <button
          onClick={() => router.push("/pricing")}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg
         shadow-rose-200 hover:shadow-rose-300 flex items-center gap-2 mx-auto active:scale-95"
        >
          <Zap className="w-4 h-4 fill-current" />
          Upgrade to Pro
        </button>
      </div>
    );
  }

  // Logic for Progress Bar
  const start = new Date(data.period_start).getTime();
  const end = new Date(data.period_end).getTime();
  const now = new Date().getTime();
  const progress = Math.min(
    100,
    Math.max(0, ((now - start) / (end - start)) * 100)
  );

  return (
    <div className="group relative overflow-hidden border border-rose-100 rounded-[2rem] bg-white shadow-2xl shadow-rose-100/40 transition-all">
      {/* Soft Glow Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-rose-50 rounded-full blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity" />

      <div className="p-8 md:p-10 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest bg-rose-600 text-white">
                <ShieldCheck className="w-3 h-3" /> Active
              </span>
              <span className="text-xs font-bold text-rose-400">
                Since {new Date(data.period_start).getFullYear()}
              </span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">
              {data.plan}
              <span className="text-rose-600">.</span>
            </h3>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-rose-700 p-4 rounded-2xl shadow-xl shadow-rose-200 text-white rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <CreditCard className="w-8 h-8" />
          </div>
        </div>

        {/* Stats Grid - "New UI Things" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">
              Billing Cycle
            </p>
            <div className="flex items-end justify-between mb-2">
              <span className="text-xl font-bold text-gray-800">
                {Math.round(progress)}%
              </span>
              <span className="text-xs text-gray-500 pb-1">
                Renews in {Math.ceil((end - now) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">
              Auto-Renew
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-6 bg-rose-600 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
              <span className="text-sm font-bold text-gray-700">Enabled</span>
            </div>
            <p className="text-[14px] text-gray-400 mt-2">
              Next charge: Jan 4, 2026
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              Next: {new Date(data.period_end).toDateString()}
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors">
              Manage Billing
            </button>
            <button
              onClick={cancel}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-200 text-white rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
