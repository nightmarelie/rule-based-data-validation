import type { ApplicationFormValidationRule, ApplicationFormData } from "./types";
import { exists, contains, inRange, yearsOf, isNumber } from "./utils";
import {
  MIN_AGE,
  MAX_AGE,
  MIN_PASSWORD_SIZE,
  MAX_SPECIALTY_LENGTH,
  DEFAULT_SPECIALTIES,
  MIN_EXPERIENCE_YEARS,
} from "./constants";

const onlyInternational: ApplicationFormValidationRule = ({ phone }) => phone.startsWith("+");

const onlySafeCharacters: ApplicationFormValidationRule = ({ phone }) =>
  !contains(phone, /[^\d\s\-\(\)\+]/g);

const validDate: ApplicationFormValidationRule = ({ birthDate }) =>
  !Number.isNaN(Date.parse(birthDate));

const allowedAge: ApplicationFormValidationRule = ({ birthDate }) =>
  inRange(yearsOf(Date.parse(birthDate)), MIN_AGE, MAX_AGE);

const isKnownSpecialty: ApplicationFormValidationRule = ({ specialty }) =>
  DEFAULT_SPECIALTIES.includes(specialty);

const isValidCustom: ApplicationFormValidationRule = ({ customSpecialty: custom }) =>
  exists(custom) && custom.length <= MAX_SPECIALTY_LENGTH;

const isNumberLike: ApplicationFormValidationRule = ({ experience }) => isNumber(experience);

const isExperienced: ApplicationFormValidationRule = ({ experience }) =>
  Number(experience) >= MIN_EXPERIENCE_YEARS;

const atLeastOneCapital = /[A-Z]/g;
const atLeastOneDigit = /\d/gi;

const hasRequiredSize: ApplicationFormValidationRule = ({ password }) =>
  password.length >= MIN_PASSWORD_SIZE;

const hasCapital: ApplicationFormValidationRule = ({ password }) =>
  contains(password, atLeastOneCapital);

const hasDigit: ApplicationFormValidationRule = ({ password }) =>
  contains(password, atLeastOneDigit);

// Validation
const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

const validatePhone: ApplicationFormValidationRule = (data) =>
  onlyInternational(data) && onlySafeCharacters(data);

const validatePassword = (form: ApplicationFormData) =>
  hasRequiredSize(form) && hasCapital(form) && hasDigit(form);

const validateBirthDate = (form: ApplicationFormData) => validDate(form) && allowedAge(form);

const validateExperience = (form: ApplicationFormData) => isNumberLike(form) && isExperienced(form);

export {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateBirthDate,
  validateExperience,
};
