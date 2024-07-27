import validator from "validator";
import * as z from "zod";

export const LoginSchema = z.object({
  areaCode: z.string(),
  phone: z
    .string()
    .refine(
      (val) =>
        validator.isMobilePhone(val, ["zh-CN", "zh-HK", "zh-MO", "zh-TW"]),
      {
        message: "Phone number is required ",
      }
    ),
  verifcode: z.string().min(6, {
    message: "Verification Code is required",
  }),
});

export const RegisterSchemas = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
