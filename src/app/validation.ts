import type { ApplicationFormData, ApplicationFormValidationRule } from "./types";
import { exists } from "./utils";

export const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

export const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

export const validatePhone: ApplicationFormValidationRule = ({ phone }) =>
  phone.startsWith("+") && phone.search(/[^\d\s\-\(\)\+]/g) < 0;
