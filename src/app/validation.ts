import type {
  ApplicationFormValidationRule,
  RequiresAll,
  RequiresAny,
  ValidationRule,
  ApplicationRules,
  ApplicationErrors,
  ValidationRules,
  ErrorMessages,
  ValidationResult,
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

const rules: ApplicationRules = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  birthDate: validateBirthDate,
  specialty: validateSpecialty,
  experience: validateExperience,
  password: validatePassword,
};

const errors: ApplicationErrors = {
  name: "Your name is required for this mission.",
  email: "Correct email format is user@example.com.",
  phone: "Please, use only “+”, “-”, “(”, “)”, and a whitespace.",
  birthDate: "We require applicants to be between 20 and 50 years.",
  specialty: "Please, use up to 50 characters to describe your specialty.",
  experience: "For this mission, we search for experience 3+ years.",
  password:
    "Your password must be longer than 10 characters, include a capital letter and a digit.",
};

const createValidator = <TData>(rules: ValidationRules<TData>, errors: ErrorMessages<TData>) => {
  return function validate(data: TData): ValidationResult<TData> {
    const result: ValidationResult<TData> = {
      valid: true,
      errors: {},
    };

    Object.keys(rules).forEach((key) => {
      const field = key as keyof TData;
      const validate = rules[field];

      if (!validate) return;

      if (!validate(data)) {
        result.valid = false;
        result.errors[field] = errors[field];
      }
    });

    return result;
  };
};

// main validator
export const validateForm = createValidator(rules, errors);
