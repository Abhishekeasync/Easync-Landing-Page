"use client";

import { ArrowRight, CalendarCheck, CheckCircle, Clock, ShieldCheck } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ACCOUNTS_OPTIONS, BUSINESS_TYPES } from "./content";
import { Button } from "./primitives";
import { submitDemoRequest } from "./submitDemoRequest";

export type DemoRequest = {
  fullName: string;
  mobile: string;
  email: string;
  businessType: string;
  currentTool: string;
  website?: string;
};

type DemoField = keyof DemoRequest;
type DemoErrors = Partial<Record<DemoField, string>>;

const initialValues: DemoRequest = {
  fullName: "",
  mobile: "",
  email: "",
  businessType: "",
  currentTool: "",
  website: "",
};

const fieldOrder: DemoField[] = [
  "fullName",
  "mobile",
  "email",
  "businessType",
  "currentTool",
];

function normalizeMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function validateDemoRequest(values: DemoRequest): DemoErrors {
  const errors: DemoErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";

  if (!values.mobile.trim()) {
    errors.mobile = "Enter your mobile number.";
  } else if (!/^[6-9]\d{9}$/.test(normalizeMobile(values.mobile))) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.businessType) errors.businessType = "Select a type of business.";
  
  // currentTool is optional - no validation needed
  
  // Honeypot check
  if (values.website && values.website.trim() !== "") {
    errors.website = "This submission could not be accepted.";
  }

  return errors;
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className ?? ""}`}>
      <label
        className="flex items-center justify-between text-sm font-medium text-slate-700"
        htmlFor={id}
      >
        <span>{label}</span>
      </label>
      {children}
      {error ? (
        <span
          id={`${id}-error`}
          className="text-xs font-medium text-rose-600 animate-fadeIn"
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function DemoForm() {
  const formId = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<DemoRequest>(initialValues);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  function fieldId(name: DemoField) {
    return `${formId}-${name}`;
  }

  function update(name: DemoField, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    setSubmitted(false);
    setApiMessage(null);
    if (Object.keys(errors).length > 0) {
      setErrors(validateDemoRequest(next));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    // Don't submit if already loading
    if (loading) return;
    
    // Client-side validation
    const nextErrors = validateDemoRequest(values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setSubmitted(false);
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    // Clear any previous API message
    setApiMessage(null);
    setLoading(true);

    try {
      const result = await submitDemoRequest({
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        mobile: normalizeMobile(values.mobile),
        businessType: values.businessType,
        currentTool: values.currentTool || null,
      });

      if (result.success) {
        // Success - show confirmation
        setSubmitted(true);
        setApiMessage(result.message);
      } else {
        // Failure - show errors
        if (result.errors) {
          // Field-level errors from server
          setErrors(result.errors);
          const firstServerError = fieldOrder.find((field) => result.errors![field]);
          if (firstServerError) {
            document.getElementById(fieldId(firstServerError))?.focus();
          }
        }
        // Generic error message
        setApiMessage(result.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (invalid: boolean) =>
    `w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-950 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
      invalid
        ? "border-rose-300 ring-rose-200"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
    }`;

  const selectClass = (invalid: boolean) =>
    `${inputClass(invalid)} demo-select pr-10 cursor-pointer`;

  return (
    <form
      id="demo"
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2 py-2"
            role="status"
          >
            <h3 className="flex items-center gap-2 text-lg font-medium tracking-tight text-slate-950">
              <CheckCircle
                size={20}
                weight="fill"
                className="shrink-0 text-emerald-600"
                aria-hidden
              />
              Request received
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Thanks{values.fullName.trim() ? `, ${values.fullName.trim().split(/\s+/)[0]}` : ""}.
              We&apos;ll reach out within 48 hours to arrange your demo. Check{" "}
              <span className="text-slate-950">{values.email.trim()}</span> for
              your confirmation.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="flex flex-col gap-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <CalendarCheck size={14} weight="bold" /> Free 20-min demo
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={12} weight="bold" /> Within 48 h
                </span>
              </div>
              <h2 className="mt-2 text-lg font-medium tracking-tight text-slate-950">
                Book a walkthrough
              </h2>
              <p className="text-sm text-slate-500">
                GSTR-2B matching and inventory, on your kind of business.
              </p>
            </div>

            {/* API error message */}
            {apiMessage && !submitted && (
              <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-sm text-rose-800">
                {apiMessage}
              </div>
            )}

            {/* Honeypot field - hidden from humans, filled by bots */}
            <div className="absolute left-[-9999px] w-0 h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={fieldId("website")}>Website</label>
              <input
                id={fieldId("website")}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website || ""}
                onChange={(event) => update("website", event.target.value)}
              />
            </div>

            <Field
              id={fieldId("fullName")}
              label="Full Name"
              error={errors.fullName}
            >
              <input
                id={fieldId("fullName")}
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g. Rajesh Sharma"
                value={values.fullName}
                aria-invalid={Boolean(errors.fullName)}
                onChange={(event) => update("fullName", event.target.value)}
                className={inputClass(Boolean(errors.fullName))}
              />
            </Field>

            <Field
              id={fieldId("mobile")}
              label="Mobile Number"
              error={errors.mobile}
            >
              <input
                id={fieldId("mobile")}
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={values.mobile}
                aria-invalid={Boolean(errors.mobile)}
                onChange={(event) => update("mobile", event.target.value)}
                className={inputClass(Boolean(errors.mobile))}
              />
            </Field>

            <Field id={fieldId("email")} label="Email" error={errors.email}>
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="you@company.com"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass(Boolean(errors.email))}
              />
            </Field>

            <Field
              id={fieldId("businessType")}
              label="Type of Business"
              error={errors.businessType}
            >
              <select
                id={fieldId("businessType")}
                name="businessType"
                value={values.businessType}
                aria-invalid={Boolean(errors.businessType)}
                onChange={(event) => update("businessType", event.target.value)}
                className={selectClass(Boolean(errors.businessType))}
              >
                <option value="">Select business industry</option>
                {BUSINESS_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-1 gap-3">
              {/*
              <Field
                id={fieldId("annualTurnover")}
                label="Turnover"
                error={errors.annualTurnover}
              >
                <select
                  id={fieldId("annualTurnover")}
                  name="annualTurnover"
                  value={values.annualTurnover}
                  aria-invalid={Boolean(errors.annualTurnover)}
                  onChange={(event) =>
                    update("annualTurnover", event.target.value)
                  }
                  className={selectClass(Boolean(errors.annualTurnover))}
                >
                  <option value="">Select range</option>
                  {TURNOVER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              */}

              <Field
                id={fieldId("currentTool")}
                label="Current Tool"
                error={errors.currentTool}
              >
                <select
                  id={fieldId("currentTool")}
                  name="currentTool"
                  value={values.currentTool}
                  aria-invalid={Boolean(errors.currentTool)}
                  onChange={(event) =>
                    update("currentTool", event.target.value)
                  }
                  className={selectClass(Boolean(errors.currentTool))}
                >
                  <option value="">Select tool</option>
                  {ACCOUNTS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-1 w-full"
              disabled={loading}
            >
              {loading ? (
                <>Submitting...</>
              ) : (
                <>
                  Book Free Demo Now <ArrowRight size={16} weight="bold" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
              <ShieldCheck size={14} weight="fill" className="text-emerald-500" />
              <span>Zero obligation · No credit card required</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

