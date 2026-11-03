"use client";

import { useState } from "react";
import { ChevronDown, Box, Package, Scale } from "lucide-react";
import type { ProductVariant } from "@/types";

interface OrderCalculatorProps {
  variant?: ProductVariant;
  cartons: string;
  onCartonsChange: (val: string) => void;
  onStepCartons: (delta: number) => void;
  onCartonsBlur?: () => void;
  rawPieces: string;
  onPiecesChange: (val: string) => void;
  hasCartonData: boolean;
}

const PRESET_PILLS = [1, 5, 10, 25];

function formatEnIn(n: number, decimals = 0): string {
  if (isNaN(n) || !isFinite(n)) return "0";
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function parsePacking(variant?: ProductVariant): {
  pcsPerPkt: number;
  pktsPerCase: number;
  qtyPerCase: number;
} {
  if (!variant) return { pcsPerPkt: 0, pktsPerCase: 0, qtyPerCase: 0 };

  let pcsPerPkt = variant.pcsPerPkt ?? variant.qtyPerPkt ?? 0;
  let pktsPerCase = variant.pktsPerCase ?? 0;

  if (variant.packing) {
    const parts = variant.packing.split(/x/i).map((s) => {
      const match = s.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    if (parts.length >= 2) {
      const p0 = parts[0];
      const p1 = parts[1];
      if (typeof p0 === 'number' && p0 > 0) pcsPerPkt = p0;
      if (typeof p1 === 'number' && p1 > 0) pktsPerCase = p1;
    }
  }

  const calculatedQty = pcsPerPkt > 0 && pktsPerCase > 0 ? pcsPerPkt * pktsPerCase : 0;
  const storedQty = variant.qtyPerCase ?? variant.qtyPerBox ?? calculatedQty;

  if (storedQty && calculatedQty && storedQty !== calculatedQty) {
    console.warn(
      `[OrderCalculator] Qty mismatch for variant "${variant.size}": calculated (${pcsPerPkt} x ${pktsPerCase} = ${calculatedQty}) vs stored (${storedQty}). Trusting stored qtyPerCase.`
    );
  }

  const qtyPerCase = storedQty || calculatedQty;

  return { pcsPerPkt, pktsPerCase, qtyPerCase };
}

export function OrderCalculator({
  variant,
  cartons,
  onCartonsChange,
  onStepCartons,
  onCartonsBlur,
  rawPieces,
  onPiecesChange,
  hasCartonData,
}: OrderCalculatorProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fallback for products without carton data
  if (!hasCartonData || !variant) {
    return (
      <div className="mt-3 max-w-xs">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-3">
          Quantity (pieces)
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={rawPieces}
          onChange={(e) => onPiecesChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))}
          placeholder="e.g. 10,000"
          aria-label="Quantity in pieces"
          className="h-12 w-full rounded-2xl border-2 border-line bg-white px-4 text-base font-bold text-ink outline-none transition-all hover:border-brand-green/40 focus:border-brand-green"
        />
      </div>
    );
  }

  const { pcsPerPkt, pktsPerCase, qtyPerCase } = parsePacking(variant);

  // Numerical carton count for live calculations (empty string evaluates to 1)
  const parsed = parseInt(cartons.trim(), 10);
  const activeCartons = isNaN(parsed) || parsed < 1 ? 1 : Math.min(9999, parsed);

  // Totals
  const totalPcs = activeCartons * qtyPerCase;
  const totalPackets = activeCartons * pktsPerCase;
  const weightG = variant.weightPerPieceG ?? 0;
  const netWeightKg = weightG > 0 && totalPcs > 0 ? (totalPcs * weightG) / 1000 : 0;

  const hasDimensions = Boolean(
    variant.caseMm &&
      variant.caseMm.length === 3 &&
      variant.caseMm[0] &&
      variant.caseMm[1] &&
      variant.caseMm[2]
  );

  const singleCartonCbm = hasDimensions
    ? (variant.caseMm![0] * variant.caseMm![1] * variant.caseMm![2]) / 1e9
    : (variant.caseCbm ?? 0);

  const totalCbm = activeCartons > 0 && singleCartonCbm > 0 ? activeCartons * singleCartonCbm : 0;

  const netWeightPerCartonKg =
    variant.netWeightPerCaseKg ?? (qtyPerCase > 0 && weightG > 0 ? (qtyPerCase * weightG) / 1000 : 0);

  // Visual cartons (max 6 displayed)
  const visibleCartonCount = Math.min(6, activeCartons);
  const extraCartons = Math.max(0, activeCartons - 6);

  // Pluralized dynamic text
  const cartonsWord = activeCartons === 1 ? "1 carton" : `${formatEnIn(activeCartons)} cartons`;
  const packetsWord = totalPackets === 1 ? "1 packet" : `${formatEnIn(totalPackets)} packets`;
  const pcsWord = `${formatEnIn(totalPcs)} pcs`;

  return (
    <div className="mt-4 space-y-5">
      {/* 1. TOP: Single-row packing equation boxes */}
      <div
        className="flex w-full items-center gap-1.5"
        aria-label="Carton packing breakdown equation"
      >
        {/* Box 1: pcs / packet */}
        <div className="flex-1 min-w-0 rounded-xl border border-line bg-surface-off py-2.5 px-1.5 sm:px-2 text-center shadow-sm">
          <div className="text-[17px] sm:text-xl font-extrabold text-ink tabular-nums leading-tight truncate">
            {formatEnIn(pcsPerPkt)}
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-ink-3 mt-0.5 truncate">
            pcs / packet
          </div>
        </div>

        {/* Operator: × */}
        <span className="w-4 shrink-0 text-center text-sm sm:text-base font-extrabold text-ink-3 select-none" aria-hidden="true">
          ×
        </span>

        {/* Box 2: packets / carton */}
        <div className="flex-1 min-w-0 rounded-xl border border-line bg-surface-off py-2.5 px-1.5 sm:px-2 text-center shadow-sm">
          <div className="text-[17px] sm:text-xl font-extrabold text-ink tabular-nums leading-tight truncate">
            {formatEnIn(pktsPerCase)}
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-ink-3 mt-0.5 truncate">
            packets / carton
          </div>
        </div>

        {/* Operator: = */}
        <span className="w-4 shrink-0 text-center text-sm sm:text-base font-extrabold text-ink-3 select-none" aria-hidden="true">
          =
        </span>

        {/* Box 3: pcs / carton (Highlighted Green) */}
        <div className="flex-1 min-w-0 rounded-xl border border-brand-green/35 bg-brand-green-light py-2.5 px-1.5 sm:px-2 text-center shadow-sm">
          <div className="text-[17px] sm:text-xl font-extrabold text-brand-green-dark tabular-nums leading-tight truncate">
            {formatEnIn(qtyPerCase)}
          </div>
          <div className="text-[11px] sm:text-xs font-bold text-brand-green-dark/85 mt-0.5 truncate">
            pcs / carton
          </div>
        </div>
      </div>

      {/* 2. Cartons input with preset pills */}
      <div className="space-y-2.5">
        <label className="block text-xs sm:text-[13px] font-bold uppercase tracking-wide text-ink-3">
          Cartons
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Preset pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Quick carton quantity presets"
          >
            {PRESET_PILLS.map((preset) => {
              const isActive = activeCartons === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onCartonsChange(String(preset))}
                  aria-pressed={isActive}
                  className={`rounded-xl border-2 px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                      : "border-line bg-white text-ink-2 hover:border-brand-green/40 hover:text-ink"
                  }`}
                >
                  {preset} {preset === 1 ? "carton" : "cartons"}
                </button>
              );
            })}
          </div>

          {/* Stepper with number input */}
          <div className="flex w-full sm:w-auto items-center justify-between rounded-2xl border-2 border-line bg-white p-1">
            <button
              type="button"
              onClick={() => onStepCartons(-1)}
              aria-label="Decrease cartons"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-ink-2 hover:bg-surface-off hover:text-ink active:scale-95 transition-all"
            >
              −
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={cartons}
              onChange={(e) => onCartonsChange(e.target.value)}
              onBlur={onCartonsBlur}
              placeholder="1"
              aria-label="Number of cartons"
              className="h-11 w-24 sm:w-28 text-center text-base font-bold text-ink outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => onStepCartons(1)}
              aria-label="Increase cartons"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-ink-2 hover:bg-surface-off hover:text-ink active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 3. VISUAL: Carton Icons Grid + Live Summary sentence */}
      <div className="rounded-2xl border border-line bg-surface-off p-4 sm:p-5">
        <div
          className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          aria-label={`${activeCartons} cartons visualization`}
        >
          {Array.from({ length: visibleCartonCount }).map((_, i) => (
            <div
              key={`carton-${i}`}
              className="flex flex-col items-center justify-center rounded-xl border border-brand-green/30 bg-white px-3 py-2.5 shadow-sm transition-all duration-200 animate-[fadeInScale_200ms_ease-out]"
            >
              {/* Carton box icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-green"
                aria-hidden="true"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="mt-1 text-xs font-bold text-ink">
                {formatEnIn(qtyPerCase)} pcs
              </span>
            </div>
          ))}

          {extraCartons > 0 && (
            <div className="flex h-[66px] items-center justify-center rounded-xl border border-dashed border-brand-green/40 bg-brand-green-light px-3.5 text-xs sm:text-sm font-bold text-brand-green-dark transition-all duration-200 animate-[fadeInScale_200ms_ease-out]">
              +{formatEnIn(extraCartons)} more
            </div>
          )}
        </div>

        {/* Dynamic live sentence */}
        <p className="mt-3.5 border-t border-line/60 pt-3 text-sm sm:text-base font-bold text-brand-green-dark">
          {cartonsWord} = {packetsWord} = {pcsWord}
        </p>
      </div>

      {/* 4. TOTALS TILES (Instant update with ~150ms transition) */}
      <div
        className={`grid gap-3 ${
          hasDimensions && singleCartonCbm > 0 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {/* Total pieces */}
        <div className="rounded-2xl border border-line bg-white p-3.5 sm:p-4 text-center shadow-card">
          <div className="flex items-center justify-center gap-1.5 text-ink-3 mb-1">
            <Package size={14} className="text-brand-green" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-bold">Total pieces</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-ink tabular-nums transition-opacity duration-150">
            {formatEnIn(totalPcs)}
          </div>
          <div className="text-xs text-ink-3 font-semibold mt-0.5">
            {cartonsWord}
          </div>
        </div>

        {/* Net weight */}
        <div className="rounded-2xl border border-line bg-white p-3.5 sm:p-4 text-center shadow-card">
          <div className="flex items-center justify-center gap-1.5 text-ink-3 mb-1">
            <Scale size={14} className="text-brand-green" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-bold">Net weight</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-ink tabular-nums transition-opacity duration-150">
            {formatEnIn(netWeightKg, 1)} kg
          </div>
          <div className="text-xs text-ink-3 font-semibold mt-0.5">
            net, excl. carton
          </div>
        </div>

        {/* Volume (CBM) - Omitted if no dimensions */}
        {hasDimensions && singleCartonCbm > 0 && (
          <div className="rounded-2xl border border-line bg-white p-3.5 sm:p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-1.5 text-ink-3 mb-1">
              <Box size={14} className="text-brand-green" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold">Volume</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-ink tabular-nums transition-opacity duration-150">
              {formatEnIn(totalCbm, 2)} CBM
            </div>
            <div className="text-xs text-ink-3 font-semibold mt-0.5">
              approx. volume
            </div>
          </div>
        )}
      </div>

      {/* 5. Collapsible Carton details */}
      <div className="rounded-2xl border border-line bg-white shadow-card">
        <button
          type="button"
          onClick={() => setDetailsOpen(!detailsOpen)}
          aria-expanded={detailsOpen}
          aria-controls="carton-specs-details"
          className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-ink hover:text-brand-green transition-colors"
        >
          <span className="flex items-center gap-2">
            <Box size={16} className="text-brand-green" aria-hidden="true" />
            Carton details & technical specifications
          </span>
          <ChevronDown
            size={18}
            className={`text-ink-3 transition-transform duration-200 ${
              detailsOpen ? "rotate-180 text-brand-green" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {detailsOpen && (
          <div
            id="carton-specs-details"
            className="border-t border-line/70 p-4 sm:p-5 pt-3 text-xs sm:text-[13px]"
          >
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between border-b border-line/40 pb-2">
                <dt className="text-ink-3">Item</dt>
                <dd className="font-bold text-ink m-0">
                  {variant.managerLabel || variant.size}
                </dd>
              </div>

              <div className="flex justify-between border-b border-line/40 pb-2">
                <dt className="text-ink-3">Weight / piece</dt>
                <dd className="font-bold text-ink m-0 tabular-nums">
                  {variant.weightPerPieceG != null ? `${formatEnIn(variant.weightPerPieceG, 1)} g` : "—"}
                </dd>
              </div>

              <div className="flex justify-between border-b border-line/40 pb-2">
                <dt className="text-ink-3">Carton size (L × W × H)</dt>
                <dd className="font-bold text-ink m-0 tabular-nums">
                  {hasDimensions
                    ? `${variant.caseMm![0]} × ${variant.caseMm![1]} × ${variant.caseMm![2]} mm`
                    : "—"}
                </dd>
              </div>

              <div className="flex justify-between border-b border-line/40 pb-2">
                <dt className="text-ink-3">Net / carton (excl. carton)</dt>
                <dd className="font-bold text-ink m-0 tabular-nums">
                  {netWeightPerCartonKg > 0 ? `${formatEnIn(netWeightPerCartonKg, 1)} kg` : "—"}
                </dd>
              </div>

              <div className="flex justify-between border-b border-line/40 pb-2 sm:col-span-2">
                <dt className="text-ink-3">CBM / carton</dt>
                <dd className="font-bold text-ink m-0 tabular-nums">
                  {singleCartonCbm > 0 ? `${singleCartonCbm.toFixed(3)} CBM` : "—"}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
