type ApplicantName = string;
type PhoneNumber = string;
type EmailAddress = string;
type BirthDate = DateString;
type UserPhoto = Image;

type KnownSpecialty = "engineer" | "scientist" | "psychologist";
type UnknownSpecialty = string;
type ExperienceYears = NumberLike;

type Password = string;

type ApplicationFormData = {
  name: ApplicantName;
  phone: PhoneNumber;
  email: EmailAddress;
  birthDate: BirthDate;
  photo: UserPhoto;

  specialty: KnownSpecialty;
  customSpecialty: UnknownSpecialty;
  experience: ExperienceYears;

  password: Password;
};

type ApplicationFormValidationRule = (data: ApplicationFormData) => boolean;

type ValidationRule<T> = (data: T) => boolean;

type RequiresAll<T> = ValidationRule<T>;
type RequiresAny<T> = ValidationRule<T>;

type ErrorMessage = string;

type ErrorMessages<TData> = Partial<Record<keyof TData, ErrorMessage>>;

type ValidationRules<TData> = Partial<Record<keyof TData, ValidationRule<TData>>>;

type ValidationResult<TData> = {
  valid: boolean;
  errors: ErrorMessages<TData>;
};

type ApplicationRules = ValidationRules<ApplicationFormData>;
type ApplicationErrors = ErrorMessages<ApplicationFormData>;

type FieldError = {
  field: string;
  message: ErrorMessage;
};

export type {
  ApplicationFormData,
  ApplicationFormValidationRule,
  KnownSpecialty,
  ValidationRule,
  RequiresAll,
  RequiresAny,
  ErrorMessage,
  ErrorMessages,
  ValidationRules,
  ValidationResult,
  ApplicationRules,
  ApplicationErrors,
  FieldError,
};
