"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PersonStandingIcon} from "lucide-react";
import {z} from "zod";
import {useForm} from "@tanstack/react-form";
import {Input} from "@/components/ui/input";

const formSchema = z.object({
    email: z.email("Enter a valid email address."),
    password: z.string().min(1, "Enter your password."),
});

export default function LoginPage() {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: () => {
            console.log('login validation passed');
        },
    });

    return <>
        <PersonStandingIcon />
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login to your SupportMe account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4 flex flex-col gap-4" noValidate onSubmit={(event) => {
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
                                placeholder="johndoe@example.com"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                                aria-invalid={field.state.meta.errors.length > 0}
                                aria-describedby="email-description email-errors"
                            />
                            <p id="email-description" className="text-sm text-muted-foreground">
                                This is the email address to login with
                            </p>
                            <p id="email-errors" role="alert" className="text-sm text-destructive">
                                {field.state.meta.errors.map((error) => error?.message).join(' ')}
                            </p>
                        </div>}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => <div className="space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium">Password</label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="password"
                                autoComplete="current-password"
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
                    <form.Subscribe selector={(state) => state.isSubmitting}>
                        {(isSubmitting) => <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>}
                    </form.Subscribe>
                </form>
            </CardContent>
            <CardFooter className="gap-2 justify-between">
                <small>Don&apos;t have an account?</small>
                <Button variant="outline" size="sm" nativeButton={false} render={
                    <Link href="/sign-up" />
                }>
                    Sign up
                </Button>
            </CardFooter>
        </Card>
    </>
}
