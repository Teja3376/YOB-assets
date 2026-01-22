import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { Control } from "react-hook-form";

export const dummyConfig = (control: Control<any>): FormFieldConfig[] => [
    // TEXT
    // SWITCH 2
    {
        name: "notifications",
        label: "Enable Notifications",
        type: "switch2",
        control,
        fullWidth: true,
    },
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter name",
        rules: {
            required: "this is required"
        },
        control,
        fullWidth: true,
    },

    // DATE
    {
        name: "dob",
        label: "Date of Birth",
        type: "date",
        control,
        allowFutureDates: false,
    },

    // NUMBER
    {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter age",
        control,
    },

    // EMAIL
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        control,
        fullWidth: true,
        rules: {
            required: "this is required"
        },
    },

    // PASSWORD
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        control,
        rules: {
            required: "this is required"
        },
        fullWidth: true,
    },

    // PHONE NUMBER
    {
        name: "phone",
        label: "Phone Number",
        type: "phoneNumber",
        control,
        countryCode: "IN",
    },

    // URL
    {
        name: "website",
        label: "Website",
        type: "url",
        placeholder: "https://example.com",
        control,
    },


    // SELECT
    {
        name: "gender",
        label: "Gender",
        type: "select",
        control,
        options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Fe male" },
            { value: "other", label: "Other" },
        ],
    },

    // TAGS INPUT
    {
        name: "skills",
        label: "Skills",
        type: "tagsinput",
        control,
        placeholder: "Add skills",
    },


    // TEXTAREA
    {
        name: "about",
        label: "About You",
        type: "textarea",
        placeholder: "Tell something about yourself",
        control,
        rules: {
            required: "this is required"
        },
        fullWidth: true,
    },


    // RADIO
    {
        name: "subscription",
        label: "Subscription Plan",
        type: "radio",
        control,
        options: [
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro" },
            { value: "enterprise", label: "Enterprise" },
        ],
    },



    // SWITCH
    {
        name: "isActive",
        label: "Is Active",
        type: "switch",
        control,
    },

    //   // INPUT GROUP
    {
        name: "salary",
        selectName: "salaryCurrency",
        label: "Salary",
        type: "inputGroup",
        control,
        inputType: "number",
        position: "right",
        options: [
            { value: "INR", label: "₹ INR" },
            { value: "USD", label: "$ USD" },
            { value: "EUR", label: "€ EUR" },
        ],
        fullWidth: true,
    },

    //   // INPUT + SELECT
    {
        name: "amount",
        selectName: "amountCurrency",
        label: "Amount",
        type: "inputSelectController",
        control,
        options: [
            { value: "INR", label: "INR" },
            { value: "USD", label: "USD" },
        ],
        fullWidth: true,
    },



    // CHECKBOX
    {
        name: "acceptTerms",
        label: "Accept Terms & Conditions",
        type: "checkbox",
        control,
        rules: {
            required: "this is required"
        },
        fullWidth: true,
    },
];
