"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {CalendarIcon, PersonStandingIcon} from "lucide-react";
import {useState} from "react";
import {format, startOfDay, subYears} from "date-fns";
import {z} from "zod";
import {useForm, useStore} from "@tanstack/react-form";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/password-input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Checkbox} from "@/components/ui/checkbox";

function latestDateOfBirth() {
    return subYears(startOfDay(new Date()), 18);
}

const formSchema = z.object({
    email: z.email("Enter a valid email address."),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string(),
    numberOfEmployee: z.string(),
    dob: z.date().nullable(),
    password: z.string().min(8, 'Password must be at least 8 characters long').refine((value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    }, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'),
    passwordConfirm: z.string().min(8, 'Password confirmation must be at least 8 characters long'),
    agreeToTerms: z.boolean().refine((value) => value, 'You must agree to the terms and conditions.'),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match.',
            path: ['passwordConfirm'],
        });
    }
    if (!data.dob || data.dob > latestDateOfBirth()) {
        ctx.addIssue({
            code: 'custom',
            message: data.dob ? 'You must be at least 18 years old.' : 'Select your date of birth.',
            path: ['dob'],
        });
    }
    if (data.accountType !== 'company') return;
    if (!data.companyName.trim()) {
        ctx.addIssue({
            code: 'custom',
            message: 'Enter your company name.',
            path: ['companyName'],
        });
    }
    const employeeCount = Number(data.numberOfEmployee);
    if (!/^\d+$/.test(data.numberOfEmployee) || !Number.isSafeInteger(employeeCount) || employeeCount < 1) {
        ctx.addIssue({
            code: 'custom',
            message: 'Enter a whole number of employees greater than zero.',
            path: ['numberOfEmployee'],
        });
    }
});

export default function SignUpPage() {
    const router = useRouter();
    const [dobOpen, setDobOpen] = useState(false);
    const maxDateOfBirth = latestDateOfBirth();
    const form = useForm({
        defaultValues: {
            email: '',
            accountType: 'personal' as 'personal' | 'company',
            companyName: '',
            numberOfEmployee: '',
            dob: null as Date | null,
            password: '',
            passwordConfirm: '',
            agreeToTerms: false,
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: () => {
            router.replace('/dashboard');
        },
    });

    const accountType = useStore(form.store, (state) => state.values.accountType);

    return <>
        <PersonStandingIcon />
        <Card className="w-full max-w-sm gap-6 bg-background [--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                <CardDescription>
                    Sign up for a new SupportMe account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-5 [&_[data-slot=input]]:h-10 [&_[data-slot=input]]:px-3 [&_p[role=alert]:empty]:hidden" noValidate onSubmit={(event) => {
                    event.preventDefault();
                    void form.handleSubmit();
                }}>
                    <form.Field name="email">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Email</label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="email"
                                autoComplete="email"
                                placeholder="john@doe.com"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                                aria-invalid={field.state.meta.errors.length > 0}
                                aria-describedby="email-description email-errors"
                            />
                            <p id="email-description" className="sr-only">
                                This is the email address to sign up with
                            </p>
                            <p id="email-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>

                        </div>}
                    </form.Field>
                    <form.Field name="accountType">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Account type</label>
                            <Select
                                name={field.name}
                                value={field.state.value}
                                items={{personal: 'Personal', company: 'Business'}}
                                onValueChange={(value) => {
                                    if (value === 'personal' || value === 'company') {
                                        field.handleChange(value);
                                    }
                                }}
                            >
                                <SelectTrigger
                                    id={field.name}
                                    className="h-10 w-full px-3"
                                    onBlur={field.handleBlur}
                                    aria-invalid={field.state.meta.errors.length > 0}
                                    aria-describedby="accountType-errors"
                                >
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="company">Business</SelectItem>
                                </SelectContent>
                            </Select>
                            <p id="accountType-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>
                        </div>}
                    </form.Field>
                    <form.Field name="dob">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Date of birth</label>
                            <Popover open={dobOpen} onOpenChange={(open) => {
                                setDobOpen(open);
                                if (!open) field.handleBlur();
                            }}>
                                <PopoverTrigger render={
                                                     <Button
                                                        type="button"
                                                        variant="outline"
                                                        id={field.name}
                                                        className="h-10 w-full justify-between px-3 font-medium"
                                                        onBlur={field.handleBlur}
                                                        aria-invalid={field.state.meta.errors.length > 0}
                                                        aria-describedby="dob-description dob-errors"
                                                    />
                                                }>
                                    {field.state.value ? format(field.state.value, 'PPP') : 'Pick a date'}
                                    <CalendarIcon className="size-5" />
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0" aria-label="Choose date of birth">
                                    <Calendar
                                        mode="single"
                                        selected={field.state.value ?? undefined}
                                        defaultMonth={field.state.value ?? maxDateOfBirth}
                                        captionLayout="dropdown"
                                        startMonth={new Date(1900, 0)}
                                        endMonth={maxDateOfBirth}
                                        disabled={{after: maxDateOfBirth}}
                                        onSelect={(date) => {
                                            field.handleChange(date ?? null);
                                            if (date) {
                                                field.handleBlur();
                                                setDobOpen(false);
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <p id="dob-description" className="sr-only">
                                You must be at least 18 years old to sign up
                            </p>
                            <p id="dob-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>

                        </div>}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Password</label>
                            <PasswordInput
                                id={field.name}
                                name={field.name}
                                autoComplete="new-password"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                                aria-invalid={field.state.meta.errors.length > 0}
                                aria-describedby="password-errors"
                            />
                            <p id="password-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>
                        </div>}
                    </form.Field>
                    <form.Field name="passwordConfirm">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Confirm password</label>
                            <PasswordInput
                                id={field.name}
                                name={field.name}
                                autoComplete="new-password"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                                aria-invalid={field.state.meta.errors.length > 0}
                                aria-describedby="passwordConfirm-errors"
                            />
                            <p id="passwordConfirm-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>
                        </div>}
                    </form.Field>
                    {accountType === 'company' &&
                    <>
                        <form.Field name="companyName">
                            {(field) => <div className="space-y-2">
                                <label htmlFor={field.name} className="text-sm font-medium">Company name</label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    autoComplete="organization"
                                    placeholder="Your company name"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) => field.handleChange(event.target.value)}
                                    aria-invalid={field.state.meta.errors.length > 0}
                                    aria-describedby="companyName-description companyName-errors"
                                />
                                <p id="companyName-description" className="text-sm text-muted-foreground">
                                    This is the name of your company
                                </p>
                                <p id="companyName-errors" role="alert" className="text-sm text-destructive">
                                    {field.state.meta.errors.map((error) => error?.message).join(' ')}
                                </p>

                            </div>}
                        </form.Field>
                        <form.Field name="numberOfEmployee">
                            {(field) => <div className="space-y-2">
                                <label htmlFor={field.name} className="text-sm font-medium">Number of employees</label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min={1}
                                    step={1}
                                    placeholder="10"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) => field.handleChange(event.target.value)}
                                    aria-invalid={field.state.meta.errors.length > 0}
                                    aria-describedby="numberOfEmployee-description numberOfEmployee-errors"
                                />
                                <p id="numberOfEmployee-description" className="text-sm text-muted-foreground">
                                    Enter the number of employees in your company
                                </p>
                                <p id="numberOfEmployee-errors" role="alert" className="text-sm text-destructive">
                                    {field.state.meta.errors.map((error) => error?.message).join(' ')}
                                </p>

                            </div>}
                        </form.Field>

                    </>
                    }
                    <form.Field name="agreeToTerms">
                        {(field) => <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id={field.name}
                                    name={field.name}
                                    className="mt-0.5 border-[#e63370] data-checked:border-[#e63370] data-checked:bg-[#e63370] data-checked:text-white dark:data-checked:bg-[#e63370]"
                                    checked={field.state.value}
                                    onCheckedChange={(checked) => field.handleChange(checked)}
                                    onBlur={field.handleBlur}
                                    required
                                    aria-invalid={field.state.meta.errors.length > 0}
                                    aria-describedby="agreeToTerms-description agreeToTerms-errors"
                                />
                                <label htmlFor={field.name} className="cursor-pointer text-sm leading-5">
                                    I accept the terms and conditions
                                </label>
                            </div>
                            <p id="agreeToTerms-description" className="text-sm leading-5 text-muted-foreground">
                                By signing up you agree to our <span className="text-[#e63370]">terms and conditions</span>
                            </p>
                            <p id="agreeToTerms-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>
                        </div>}
                    </form.Field>
                    <form.Subscribe selector={(state) => state.isSubmitting}>
                        {(isSubmitting) => <Button type="submit" className="h-10 w-full bg-[#e63370] font-semibold text-white hover:bg-[#cf2861]" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing up...' : 'SIGN UP'}
                        </Button>}
                    </form.Subscribe>
                </form>
            </CardContent>
            <CardFooter className="gap-2 justify-between border-t-0 bg-transparent pt-0">
                <small className="text-sm">Already have an account?</small>
                <Button variant="outline" size="sm" className="h-9 px-3" nativeButton={false} render={
                                                                              <Link href="/login" />
                                                                         }>
                    LOGIN
                </Button>
            </CardFooter>
        </Card>
    </>
}
