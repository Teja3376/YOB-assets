"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { dummyConfig } from "@/components/form-configs/dummy/dummyconfig";
import FormGenerator from "@/components/use-form/FormGenerator";

const Page = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            age: "",
            email: "",
            password: "",
            website: "",
            phone: "",
            gender: "",
            acceptTerms: false,
            about: "",
            dob: null,
            subscription: "",
            skills: [],
            isActive: false,
            notifications: false,
            salary: "",
            salaryCurrency: "",
            amount: "",
            amountCurrency: "",
        },
    });


    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Form Testing</h3>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        {FormGenerator(dummyConfig(form.control))}
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Page;
