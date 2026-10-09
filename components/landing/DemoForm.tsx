"use client";

import { ArrowRight, CalendarCheck, CheckCircle, Clock, ShieldCheck } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ACCOUNTS_OPTIONS, BUSINESS_TYPES } from "./content";
// import { TURNOVER_OPTIONS } from "./content";
import { Button } from "./primitives";

export type DemoRequest = {
  fullName: string;
  mobile: string;
  email: string;
  businessType: string;
  annualTurnover: string;
  accountsToday: string;
};

type DemoField = keyof DemoRequest;
type DemoErrors = Partial<Record<DemoField, string>>;

const initialValues: DemoRequest = {
  fullName: "",
  mobile: "",
  email: "",
  businessType: "",
  annualTurnover: "",
  accountsToday: "",
};

const fieldOrder: DemoField[] = [
  "fullName",
  "mobile",
  "email",
  "businessType",
  // "annualTurnover",
  "accountsToday",
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
  // if (!values.annualTurnover) {
  //   errors.annualTurnover = "Select your annual turnover.";
  // }
  if (!values.accountsToday) {
    errors.accountsToday = "Select how you keep accounts today.";
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

  function fieldId(name: DemoField) {
    return `${formId}-${name}`;
  }

  function update(name: DemoField, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    setSubmitted(false);
    if (Object.keys(errors).length > 0) {
      setErrors(validateDemoRequest(next));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDemoRequest(values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setSubmitted(false);
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setSubmitted(true);
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
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <CalendarCheck size={14} weight="bold" /> Free 20-min demo
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} weight="bold" /> Callback in 15 min
          </span>
        </div>
        <h2 className="mt-2 text-lg font-medium tracking-tight text-slate-950">
          Book a walkthrough
        </h2>
        <p className="text-sm text-slate-500">
          GSTR-2B matching and inventory, on your kind of business.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200/80 p-6 text-center my-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={32} weight="fill" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Demo Request Confirmed!
            </h3>
            <p className="text-sm font-medium text-slate-700">
              Thank you, <span className="font-bold text-slate-900">{values.fullName.trim()}</span>. Our senior implementation specialist will call you at <span className="font-bold text-slate-900">{values.mobile}</span> within 15 minutes.
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-100/60 rounded-lg px-3 py-1.5 border border-emerald-200">
              ✓ 3 Months Free Trial voucher activated for your business.
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="flex flex-col gap-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
                id={fieldId("accountsToday")}
                label="Current Tool"
                error={errors.accountsToday}
              >
                <select
                  id={fieldId("accountsToday")}
                  name="accountsToday"
                  value={values.accountsToday}
                  aria-invalid={Boolean(errors.accountsToday)}
                  onChange={(event) =>
                    update("accountsToday", event.target.value)
                  }
                  className={selectClass(Boolean(errors.accountsToday))}
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
            >
              Book Free Demo Now <ArrowRight size={16} weight="bold" />
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

