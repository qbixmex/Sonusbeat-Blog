"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const formSchema = z.object({
  username: z
    .string({ message: "El nombre de usuario es obligatorio !" })
    .min(3, "El nombre de usuario debe contener por lo menos 3 caracteres.")
    .max(20, "El nombre de usuario no puede exceder los 20 caracteres."),
  email: z
    .string({ message: "El correo electrónico es obligatorio !" })
    .email("El correo electrónico debe ser válido."),
  phone: z
    .string({ message: "El número de teléfono es obligatorio !" })
    .min(10, "El número de teléfono debe contener por lo menos 10 dígitos.")
    .max(20, "El número de teléfono no puede exceder los 15 dígitos."),
  location: z
    .string({ message: "La ubicación es obligatoria !" })
    .min(3, "La ubicación debe contener por lo menos 3 caracteres.")
    .max(50, "La ubicación no puede exceder los 50 caracteres."),
  role: z.enum([ "admin", "user" ]).optional(),
});

export const EditUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "qbixmex",
      email: "qbixmex@gmail.com",
      phone: "(+52) 555-444-2222",
      location: "Guadalajara",
      role: "admin",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Hacer algo con los valores del formulario.
    // ✅ Esto será seguro y validado por tipo.
    console.table(values);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-5">Editar Usuario</SheetTitle>
        <SheetDescription asChild aria-describedby={undefined}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="user">Usuario</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <section className="flex justify-end">
               <Button type="submit" className="text-white">
                  <span>Actualizar</span>
                  <Send />
                </Button>
             </section>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditUser;