import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional(),
  items: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(160),
        quantityHint: z.string().trim().max(60).optional(),
      })
    )
    .max(50)
    .default([]),
});

export type QuoteRequestPayload = z.infer<typeof quoteRequestSchema>;
