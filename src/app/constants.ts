import { KnownSpecialty } from "./types";

const MIN_AGE = 20;
const MAX_AGE = 50;
const MIN_PASSWORD_SIZE = 10;
const MAX_SPECIALTY_LENGTH = 50;
const DEFAULT_SPECIALTIES: List<KnownSpecialty> = ["engineer", "scientist", "psychologist"];
const MIN_EXPERIENCE_YEARS = 3;

export {
  MIN_AGE,
  MAX_AGE,
  MIN_PASSWORD_SIZE,
  MAX_SPECIALTY_LENGTH,
  DEFAULT_SPECIALTIES,
  MIN_EXPERIENCE_YEARS,
};
