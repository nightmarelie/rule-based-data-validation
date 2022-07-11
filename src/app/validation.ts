import type {
  ApplicationFormValidationRule,
  RequiresAll,
  RequiresAny,
  ValidationRule,
} from "./types";
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

// abstraction
function all<T>(rules: List<ValidationRule<T>>): RequiresAll<T> {
  return (data) => rules.every((isValid) => isValid(data));
}

function some<T>(rules: List<ValidationRule<T>>): RequiresAny<T> {
  return (data) => rules.some((isValid) => isValid(data));
}

// rules
const phoneRules = [onlyInternational, onlySafeCharacters];
const birthDateRules = [validDate, allowedAge];
const specialtyRules = [isKnownSpecialty, isValidCustom];
const experienceRules = [isNumberLike, isExperienced];
const passwordRules = [hasRequiredSize, hasCapital, hasDigit];

// validators
const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

const validatePhone = all(phoneRules);
const validateBirthDate = all(birthDateRules);
const validateSpecialty = some(specialtyRules);
const validateExperience = all(experienceRules);
const validatePassword = all(passwordRules);

// main validator
export const validateForm = all([
  validateName,
  validateEmail,
  validatePhone,
  validateBirthDate,
  validateSpecialty,
  validateExperience,
  validatePassword,
]);
