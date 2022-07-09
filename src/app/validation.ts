import type { ApplicationFormData, ApplicationFormValidationRule } from "./types";

export const validateName: ApplicationFormValidationRule = ({ name }) => !!name;
