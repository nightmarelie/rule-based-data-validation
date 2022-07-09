import type { ApplicationFormValidationRule } from "./types";
import { exists, contains } from "./utils";

const onlyInternational: ApplicationFormValidationRule = ({ phone }) => phone.startsWith("+");

const onlySafeCharacters: ApplicationFormValidationRule = ({ phone }) =>
  !contains(phone, /[^\d\s\-\(\)\+]/g);

export const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

export const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

export const validatePhone: ApplicationFormValidationRule = (data) =>
  onlyInternational(data) && onlySafeCharacters(data);
