import "./styles/app.css";
import "./styles/global.css";
import { validateForm } from "./app/validation";
import { ApplicationFormData, ErrorMessage, FieldError, ApplicationErrors } from "./app/types";

const errorSelector = ".validation-error";

const specialtySelect = document.getElementById("specialty");
const customSpecialty = document.getElementById("custom");
const applicationForm = document.getElementById("form");

function observeDependentFields() {
  const select = specialtySelect as HTMLSelectElement;
  const dependant = customSpecialty as HTMLElement;

  select.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    const showDependant = target.value === "other";

    dependant.hidden = !showDependant;
    if (showDependant) dependant.querySelector("input")?.focus?.();
  });
}

function createErrorElement(message: ErrorMessage): HTMLSpanElement {
  const error = document.createElement("span");
  error.className = "validation-error";
  error.textContent = message;

  return error;
}

function showErrorMessage({ field, message }: FieldError) {
  const input = applicationForm?.querySelector(`[name="${field}"]`);
  const scope = input?.closest("label");
  if (!scope) return;

  const error = createErrorElement(message);
  scope.appendChild(error);
}

function showErrors(errors: ApplicationErrors) {
  Object.entries(errors).forEach(([field, message]) => {
    showErrorMessage({ field, message });
  });
}

function clearErrors() {
  const errors = applicationForm?.querySelectorAll(errorSelector);
  errors?.forEach((node) => node.remove());
}

function handleFormSubmit(e: SubmitEvent) {
  e.preventDefault();
  clearErrors();

  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
  const { valid, errors } = validateForm(data as ApplicationFormData);

  if (valid) setTimeout(() => alert("Application sent!"), 0);
  else showErrors(errors);
}

observeDependentFields();
applicationForm?.addEventListener("submit", handleFormSubmit);
