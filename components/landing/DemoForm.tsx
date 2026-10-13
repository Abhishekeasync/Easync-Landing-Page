"use client";

import { ArrowRight, CalendarCheck, CheckCircle, Clock } from "@phosphor-icons/react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ACCOUNTS_OPTIONS, BUSINESS_TYPES, OTHER_BUSINESS_TYPE } from "./content";
import { Button } from "./primitives";
import { submitDemoRequest } from "./submitDemoRequest";

export type DemoRequest = {
  fullName: string;
  mobile: string;
  email: string;
  businessType: string;
  businessTypeOther: string;
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
  businessTypeOther: "",
  currentTool: "",
  website: "",
};

const fieldOrder: DemoField[] = [
  "fullName",
  "mobile",
  "email",
  "businessType",
  "businessTypeOther",
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

  if (values.businessType === OTHER_BUSINESS_TYPE) {
    const detail = values.businessTypeOther.trim();
    if (detail.length > 200) {
      errors.businessTypeOther = "Please keep this under 200 characters.";
    }
  }
  
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
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className ?? ""}`}>
      <label
        className="flex flex-col gap-0.5 text-sm font-medium text-slate-700"
        htmlFor={id}
      >
        <span>
          {label}
          {required ? (
            <span className="text-rose-600" aria-hidden="true">
              {" *"}
            </span>
          ) : null}
        </span>
        {optional ? (
          <span className="text-xs font-normal text-slate-400">(optional)</span>
        ) : null}
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

function DemoSelect({
  id,
  value,
  placeholder,
  options,
  invalid,
  required,
  onChange,
}: {
  id: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  invalid: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const fieldClass = `w-full rounded-md border bg-white px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 demo-select pr-10 cursor-pointer ${
    invalid
      ? "border-rose-300 ring-rose-200"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
  } ${value ? "text-slate-950" : "text-slate-400"}`;

  return (
    <div ref={rootRef} className={`relative ${open ? "z-20" : ""}`}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid}
        aria-required={required || undefined}
        onClick={() => setOpen((current) => !current)}
        className={fieldClass}
      >
        {value || placeholder}
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-sm"
        >
          {options.map((option) => {
            const selected = value === option;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm ${
                    selected
                      ? "bg-slate-100 font-medium text-slate-950"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
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
    if (name === "businessType" && value !== OTHER_BUSINESS_TYPE) {
      next.businessTypeOther = "";
    }
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
        businessTypeOther:
          values.businessType === OTHER_BUSINESS_TYPE
            ? values.businessTypeOther.trim() || null
            : null,
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
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                  <Clock size={12} weight="bold" /> Callback within 48 hrs
                </span>
              </div>
              <h2 className="mt-2 text-lg font-medium tracking-tight text-slate-950">
                Book your free demo
              </h2>
              <p className="text-sm text-slate-500">
                We&apos;ll show you how Easync handles your invoicing, GST and
                stock, for your kind of business.
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
              required
              error={errors.fullName}
            >
              <input
                id={fieldId("fullName")}
                name="fullName"
                type="text"
                required
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
              required
              error={errors.mobile}
            >
              <input
                id={fieldId("mobile")}
                name="mobile"
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={values.mobile}
                aria-invalid={Boolean(errors.mobile)}
                onChange={(event) => update("mobile", event.target.value)}
                className={inputClass(Boolean(errors.mobile))}
              />
            </Field>

            <Field id={fieldId("email")} label="Email" required error={errors.email}>
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                required
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
              required
              error={errors.businessType}
            >
              <DemoSelect
                id={fieldId("businessType")}
                value={values.businessType}
                placeholder="Select business industry"
                options={BUSINESS_TYPES}
                invalid={Boolean(errors.businessType)}
                required
                onChange={(value) => update("businessType", value)}
              />
            </Field>

            {values.businessType === OTHER_BUSINESS_TYPE ? (
              <Field
                id={fieldId("businessTypeOther")}
                label="Tell us your business"
                optional
                error={errors.businessTypeOther}
              >
                <input
                  id={fieldId("businessTypeOther")}
                  name="businessTypeOther"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. retail, pharma, construction"
                  value={values.businessTypeOther}
                  aria-invalid={Boolean(errors.businessTypeOther)}
                  onChange={(event) =>
                    update("businessTypeOther", event.target.value)
                  }
                  className={inputClass(Boolean(errors.businessTypeOther))}
                />
              </Field>
            ) : null}

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
                <DemoSelect
                  id={fieldId("currentTool")}
                  value={values.currentTool}
                  placeholder="Select tool"
                  options={ACCOUNTS_OPTIONS}
                  invalid={Boolean(errors.currentTool)}
                  onChange={(value) => update("currentTool", value)}
                />
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

            <div className="flex flex-col gap-2 pt-2 text-center">
              <p className="m-0 text-[11px] font-medium text-slate-500">
                Free · No obligation · We&apos;ll call you within 48 hours
              </p>
              <p className="m-0 text-[11px] leading-relaxed text-slate-400">
                By submitting, you agree to be contacted about Easync Books.{" "}
                <Link
                  href="/privacy"
                  className="text-slate-600 underline underline-offset-2 hover:text-slate-950"
                >
                  Privacy policy
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

