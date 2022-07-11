import type { ApplicationFormValidationRule, KnownSpecialty } from "./types";
import { exists, contains, inRange, yearsOf } from "./utils";

const onlyInternational: ApplicationFormValidationRule = ({ phone }) => phone.startsWith("+");

const onlySafeCharacters: ApplicationFormValidationRule = ({ phone }) =>
  !contains(phone, /[^\d\s\-\(\)\+]/g);

const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);

const validateEmail: ApplicationFormValidationRule = ({ email }) =>
  email.includes("@") && email.includes(".");

const validatePhone: ApplicationFormValidationRule = (data) =>
  onlyInternational(data) && onlySafeCharacters(data);

const MIN_AGE = 20;
const MAX_AGE = 50;

const validDate: ApplicationFormValidationRule = ({ birthDate }) =>
  !Number.isNaN(Date.parse(birthDate));

const allowedAge: ApplicationFormValidationRule = ({ birthDate }) =>
  inRange(yearsOf(Date.parse(birthDate)), MIN_AGE, MAX_AGE);

const MAX_SPECIALTY_LENGTH = 50;
const DEFAULT_SPECIALTIES: List<KnownSpecialty> = ["engineer", "scientist", "psychologist"];

const isKnownSpecialty: ApplicationFormValidationRule = ({ specialty }) =>
  DEFAULT_SPECIALTIES.includes(specialty);

const isValidCustom: ApplicationFormValidationRule = ({ customSpecialty: custom }) =>
  exists(custom) && custom.length <= MAX_SPECIALTY_LENGTH;

const MIN_EXPERIENCE_YEARS = 3;

const isNumberLike: ApplicationFormValidationRule = ({ experience }) =>
  Number.isFinite(Number(experience));

const isExperienced: ApplicationFormValidationRule = ({ experience }) =>
  Number(experience) >= MIN_EXPERIENCE_YEARS;

export {
  validateName,
  validateEmail,
  validatePhone,
  validDate,
  allowedAge,
  isKnownSpecialty,
  isValidCustom,
  isNumberLike,
  isExperienced,
};
