import type { ApplicationFormData, ApplicationFormValidationRule } from "./types";
import { exists } from "./utils";

export const validateName: ApplicationFormValidationRule = ({ name }) => exists(name);
