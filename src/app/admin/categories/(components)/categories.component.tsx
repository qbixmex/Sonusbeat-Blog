'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "../styles.module.css";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Category } from "@/interfaces/category.interface";
// import { updateArticleStateAction } from "../../(actions)/update-article-state.action";
// import { deleteArticleAction } from "../../(actions)/delete-article.action";

type Props = Readonly<{
  categories: Category[];
}>;

export const Categories: React.FC<Props> = ({ categories }) => {
  const handleDeleteCategory = async (categoryId: string) => {
    // const response = await deleteCategoryAction(categoryId);

    // if (!response.ok) {
    //   toast.error(response.message);
    //   return;
    // }

    // if (response.ok) {
    //   toast.success(response.message);
    // }
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className={styles.cardTitle}>Categorías</CardTitle>
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <Link href={`/admin/categories/new`} title="Crear nuevo artículo">
            <span className="sr-only">Crear categoría</span>
            <File className="size-5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
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
