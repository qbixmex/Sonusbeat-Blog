'use client';

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { LoaderCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { handleLoginCredentials } from "@/app/(auth)/actions/handleLoginCredentials";
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z
    .string({
      required_error: "¡ El correo electrónico es obligatorio !",
      invalid_type_error: "¡ El correo electrónico debe ser un string !",
    })
    .trim()
    .email("¡ Formato inválido de correo electrónico !"),
  password: z
    .string()
    .trim()
    .min(8, "La contraseña debe tener al menos (8) caracteres"),
});

export const Credentials = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    const response = await handleLoginCredentials({ email, password });
    if (response === 'Success') {
      form.reset();
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      window.location.href = "/admin/dashboard";
    }
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className={cn({
              "bg-secondary hover:bg-secondary cursor-not-allowed": form.formState.isSubmitting,
            })}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2 text-secondary-foreground animate-pulse">
                <span className="text-sm italic">Espere</span>
                <LoaderCircle className="size-4 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Acceder</span> <Send />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Credentials;
