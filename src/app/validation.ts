import type { ApplicationFormValidationRule } from "./types";
import { exists, contains, inRange, yearsOf } from "./utils";

const onlyInternational: ApplicationFormValidationRule = ({ phone }) => phone.startsWith("+");

const onlySafeCharacters: ApplicationFormValidationRule = ({ phone }) =>
  !contains(phone, /[^\d\s\-\(\)\+]/g);

export const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

export const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

export const validatePhone: ApplicationFormValidationRule = (data) =>
  onlyInternational(data) && onlySafeCharacters(data);

const MIN_AGE = 20;
const MAX_AGE = 50;

export const validDate: ApplicationFormValidationRule = ({ birthDate }) =>
  !Number.isNaN(Date.parse(birthDate));

export const allowedAge: ApplicationFormValidationRule = ({ birthDate }) =>
  inRange(yearsOf(Date.parse(birthDate)), MIN_AGE, MAX_AGE);
