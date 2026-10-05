"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  containerClassName?: string
}

function PasswordInput({
  className,
  containerClassName,
  id,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Input
        {...props}
        id={inputId}
        disabled={disabled}
        type={visible ? "text" : "password"}
        className={cn("pr-10!", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        disabled={disabled}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-controls={inputId}
        aria-pressed={visible}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeIcon aria-hidden="true" /> : <EyeOffIcon aria-hidden="true" />}
      </Button>
    </div>
  )
}

export { PasswordInput }
export type { PasswordInputProps }
