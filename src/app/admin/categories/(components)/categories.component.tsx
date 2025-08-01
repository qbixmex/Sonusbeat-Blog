'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/root/src/components/ui/button";
import Link from "next/link";
import { Eye, File, FileEdit, Trash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Category } from "@/interfaces/category.interface";
import { deleteCategoryAction } from "../(actions)/delete-category.action";

type Props = Readonly<{
  categories: Category[];
}>;

export const Categories: React.FC<Props> = ({ categories }) => {
  const handleDeleteCategory = async (categoryId: string) => {
    const response = await deleteCategoryAction(categoryId);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    if (response.ok) {
      toast.success(response.message);
    }
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardContent className="flex-1">
        <div className="w-full max-w-[1024px] mx-auto">
          <section className="flex items-center justify-between gap-2 mb-5">
            <h1 className="text-3xl lg:text-5xl font-semibold">
              Lista de Categorías
            </h1>
            <Button
              size="icon"
              className="bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link href={`/admin/categories/new`} title="Crear nuevo artículo">
                <span className="sr-only">Lista de Categorías</span>
                <File className="size-5" />
              </Link>
            </Button>
          </section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="lg:w-[200px]">Nombre</TableHead>
                <TableHead className="lg:w-[200px]">Slug</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.translations[0].name}</TableCell>
                  <TableCell>{category.translations[0].slug}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-sky-600 hover:bg-sky-700"
                      title="Ver artículo"
                      asChild
                    >
                      <Link
                        href={`/admin/categories/${category.id}`}
                        title="Ver categoría"
                      >
                        <span className="sr-only">Ver categoría</span>
                        <Eye className="size-5" />
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-amber-600 hover:bg-amber-700"
                      asChild
                    >
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        title="Editar categoría"
                      >
                        <span className="sr-only">Editar categoría</span>
                        <FileEdit className="size-5" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          size="icon"
                          className="bg-pink-600 hover:bg-pink-700 cursor-pointer"
                          title="Eliminar categoría"
                        >
                          <span className="sr-only">Eliminar Categoría</span>
                          <Trash className="size-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿ Estas seguro de eliminar esta categoría ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer.
                            Esto eliminará la categoría y todos sus datos asociados de forma permanente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCategory(category.id as string)}
                          >Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" title="Anteriores" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" title="Siguientes" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default Categories;
