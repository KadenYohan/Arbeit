"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CATEGORIES,
  DISTRICTS,
  CITIES,
  FEATURE_TAGS,
  PAY_TYPES,
} from "@/lib/constants";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface FormData {
  // Step 1
  title: string;
  category: string;
  subCategory: string;
  payType: string;
  payMin: string;
  payMax: string;
  scheduleDays: string[];
  shiftFrom: string;
  shiftTo: string;
  slots: string;
  workSetup: string;
  // Step 2
  district: string;
  city: string;
  streetAddress: string;
  nearestStation: string;
  featureTags: string[];
  requirementsNotes: string;
  // Step 3
  description: string;
}

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    subCategory: "",
    payType: "hourly",
    payMin: "",
    payMax: "",
    scheduleDays: [],
    shiftFrom: "",
    shiftTo: "",
    slots: "1",
    workSetup: "on-site",
    district: "",
    city: "",
    streetAddress: "",
    nearestStation: "",
    featureTags: [],
    requirementsNotes: "",
    description: "",
  });

  const cities = formData.district
    ? CITIES[parseInt(formData.district)] || []
    : [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset city when district changes
    if (name === "district") {
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter((d) => d !== day)
        : [...prev.scheduleDays, day],
    }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      featureTags: prev.featureTags.includes(featureId)
        ? prev.featureTags.filter((f) => f !== featureId)
        : [...prev.featureTags, featureId],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("[v0] Submitting job:", formData);

    // TODO: Call API to create job listing
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/employer/listings?success=1");
    }, 1500);
  };

  const formatPay = () => {
    if (!formData.payMin || !formData.payMax) return "";
    const typeLabel =
      formData.payType === "hourly"
        ? "/hr"
        : formData.payType === "daily"
          ? "/day"
          : "/mo";
    return `₱${formData.payMin}–₱${formData.payMax}${typeLabel}`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[800px] px-4">
        {/* Header */}
        <h1 className="text-h1 mb-2">Post a Job</h1>
        <p className="mb-6 text-sm text-[var(--color-gray)]">
          Fill out the form below to create a new job listing
        </p>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  s <= step
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-gray-border)] text-[var(--color-gray)]"
                }`}
              >
                {s}
              </div>
              <span
                className={`ml-2 hidden text-sm md:inline ${
                  s <= step
                    ? "font-medium text-[var(--color-dark)]"
                    : "text-[var(--color-gray)]"
                }`}
              >
                {s === 1 ? "Job Details" : s === 2 ? "Location" : "Description"}
              </span>
              {s < 3 && (
                <div
                  className={`mx-4 h-0.5 w-16 md:w-24 ${
                    s < step
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-gray-border)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-[10px] border border-[var(--color-gray-border)] bg-white p-6">
          {/* Step 1 - Job Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-h2 mb-4">Job Details</h2>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Job Title <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={80}
                  placeholder="e.g., Part-time Barista"
                  className="input"
                />
                <p className="mt-1 text-right text-xs text-[var(--color-gray-mid)]">
                  {formData.title.length}/80
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Category <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Sub-category
                  </label>
                  <input
                    type="text"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    placeholder="e.g., Cafe Staff"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Pay Type <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <div className="flex gap-4">
                  {PAY_TYPES.map((type) => (
                    <label key={type.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payType"
                        value={type.id}
                        checked={formData.payType === type.id}
                        onChange={handleChange}
                        className="text-[var(--color-primary)]"
                      />
                      <span className="text-sm">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Min Pay (₱) <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <input
                    type="number"
                    name="payMin"
                    value={formData.payMin}
                    onChange={handleChange}
                    min="0"
                    className="input"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Max Pay (₱) <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <input
                    type="number"
                    name="payMax"
                    value={formData.payMax}
                    onChange={handleChange}
                    min="0"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Schedule Days <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`tag cursor-pointer transition-colors ${
                        formData.scheduleDays.includes(day)
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                          : "hover:bg-[var(--color-primary-pale)]"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Shift From <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <input
                    type="time"
                    name="shiftFrom"
                    value={formData.shiftFrom}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Shift To <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <input
                    type="time"
                    name="shiftTo"
                    value={formData.shiftTo}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Slots Available <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <input
                    type="number"
                    name="slots"
                    value={formData.slots}
                    onChange={handleChange}
                    min="1"
                    max="99"
                    className="input"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Work Setup <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <select
                    name="workSetup"
                    value={formData.workSetup}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="on-site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Location */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-h2 mb-4">Location & Requirements</h2>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    District <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select district</option>
                    {DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    City <span className="text-[var(--color-red-error)]">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.district}
                    className="input disabled:bg-gray-50"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Street Address / Landmark{" "}
                  <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="e.g., 123 Ayala Avenue"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Nearest Station{" "}
                  <span className="text-[var(--color-gray-mid)]">(optional)</span>
                </label>
                <input
                  type="text"
                  name="nearestStation"
                  value={formData.nearestStation}
                  onChange={handleChange}
                  placeholder="e.g., Ayala MRT-3"
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Feature Tags{" "}
                  <span className="text-[var(--color-gray-mid)]">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleFeatureToggle(tag.id)}
                      className={`tag cursor-pointer transition-colors ${
                        formData.featureTags.includes(tag.id)
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                          : "hover:bg-[var(--color-primary-pale)]"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Requirements Notes{" "}
                  <span className="text-[var(--color-gray-mid)]">(optional)</span>
                </label>
                <textarea
                  name="requirementsNotes"
                  value={formData.requirementsNotes}
                  onChange={handleChange}
                  maxLength={300}
                  rows={3}
                  placeholder="e.g., Must be willing to work weekends"
                  className="input resize-none"
                />
                <p className="mt-1 text-right text-xs text-[var(--color-gray-mid)]">
                  {formData.requirementsNotes.length}/300
                </p>
              </div>
            </div>
          )}

          {/* Step 3 - Description & Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-h2 mb-4">Description & Review</h2>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Job Description{" "}
                  <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  minLength={50}
                  maxLength={1000}
                  rows={8}
                  placeholder="Describe the job responsibilities, what you're looking for, and what you offer..."
                  className="input resize-none"
                />
                <p className="mt-1 text-right text-xs text-[var(--color-gray-mid)]">
                  {formData.description.length}/1000 (min 50)
                </p>
              </div>

              {/* Preview Card */}
              <div className="rounded-[10px] border border-[var(--color-gray-border)] bg-[var(--color-primary-pale)] p-4">
                <h3 className="mb-3 text-sm font-semibold text-[var(--color-primary)]">
                  Preview
                </h3>
                <div className="rounded-[10px] border border-[var(--color-gray-border)] bg-white p-4">
                  <h4 className="mb-1 font-semibold text-[var(--color-dark)]">
                    {formData.title || "Job Title"}
                  </h4>
                  <p className="mb-2 text-sm text-[var(--color-gray)]">
                    Your Company Name
                  </p>
                  {formData.featureTags.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {formData.featureTags.slice(0, 3).map((tagId) => (
                        <span key={tagId} className="tag text-[10px]">
                          {FEATURE_TAGS.find((t) => t.id === tagId)?.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mb-1 text-sm font-semibold text-[var(--color-orange)]">
                    {formatPay() || "Pay not set"}
                  </p>
                  <p className="text-xs text-[var(--color-gray)]">
                    {formData.city || "City"} | {formData.nearestStation || "Station"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-outline h-[48px] px-6"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary h-[48px] px-6"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary h-[56px] px-8 text-[16px] disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
