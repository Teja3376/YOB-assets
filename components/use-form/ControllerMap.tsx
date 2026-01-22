import SelectController from "./SelectController";
import InputController from "./InputController";
import CheckboxController from "./CheckboxController";
import TextareaController from "./TextareaController";
import DateController from "./DateController";
import RadioController from "./RadioType";
import TagsInputController from "./TagsInputController";
import SwitchController from "./SwitchController";
import { Control } from "react-hook-form";
import InputGroupController from "./InputGroupController";
import InputSelectController from "./InputSelectController.tsx";
import ButtonController from "./ButtonController";
// import ImageUploader from "./ImageController";
import FileUploadController from "./FileController";
// import ImageAndFileUploader from "./ImageAndFile";
// import MultiImageUploader from "./MultipleContoller";
import Switch2Controller from "./Switch2Controller";
import { useFormMode } from "./FormMode";
import PhoneNumberController from "./phoneNumberController";

const ControllerMap = (props: any) => {
  const { isReadOnly } = useFormMode();
  const mergedProps = {
    ...props,
    disabled: Boolean(isReadOnly || props?.disabled),
  };
  const { type } = mergedProps;
  switch (type) {
    case "select":
      return <SelectController {...mergedProps} />;
    case "switch":
      return <SwitchController {...mergedProps} />;

    case "switch2":
      return <Switch2Controller {...props} />;
    case "text":
    case "number":
    case "email":
    case "password":
    case "url":
    case "tel":
      return <InputController {...props} />;
    case "tagsinput":
      return <TagsInputController {...props} />;
    case "checkbox":
      return <CheckboxController {...props} />;
    case "textarea":
      return <TextareaController {...props} />;
    case "date":
      return <DateController {...props} />;
    case "radio":
      return <RadioController {...props} />;
    case "inputGroup":
      return <InputGroupController {...props} />;
    case "inputSelectController":
      return <InputSelectController {...props} />;
    case "button":
      return <ButtonController {...props} />;
    // case "image":
    //   return <ImageUploader {...props} />;
    case "file":
      return <FileUploadController {...props} />;
    // case "imageAndFile":
    //   return <ImageAndFileUploader {...props} />;
    // case "multiImage":
    //   return <MultiImageUploader {...props} />;
    case "phoneNumber":
      return <PhoneNumberController {...props} />;

    default:
      return null;
  }
};

export type FormFieldConfig = {
  name?: string;
  label?: string;
  labelIcon?: any;
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "url"
    | "select"
    | "checkbox"
    | "textarea"
    | "file"
    | "date"
    | "radio"
    | "tel"
    | "tagsinput"
    | "inputGroup"
    | "switch"
    | "button"
    | "inputSelectController"
    | "logoImage"
    | "image"
    | "switch2"
    | "imageAndFile"
    | "multiImage"
    | "phoneNumber";
  disabled?: boolean;
  options?: { value: string; label: string; disabled?: boolean }[];
  noOfFiles?: number;
  accept?: string[];
  rules?: any;
  control: Control<any>;
  hidden?: boolean;
  onChange?: (e: any) => void;
  watch?: any;
  setValue?: (name: string, value: any, options?: any) => void;
  fullWidth?: boolean;
  errors?: any;
  selectName?: string;
  selectRules?: any;
  inputOptions?: { value: string; label: string }[];
  position?: "left" | "right";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | "assetButton";
  size?: "default" | "sm" | "lg" | "icon";
  text?: string;
  onClick?: () => void;
  value?: string;
  placeholder?: string;
  maxSize?: number;
  bottomText?: string;
  allowFutureDates?: boolean;
  meta?: {
    refId: string;
    belongsTo: string;
    isPublic: boolean;
  };
  defaultValue?: string | number;
  onBlur?: () => void;
  inputType?: "text" | "number";
  autoClose?: boolean;
  dayDisabled?: (date: Date) => boolean;
  isDirty?: boolean;
  countryCode?: string;
};

export default ControllerMap;
