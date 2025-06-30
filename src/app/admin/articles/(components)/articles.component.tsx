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
import { Switch } from "@/root/src/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/root/src/components/ui/card";
import { Article } from "@/interfaces/article.interface";

type Props = Readonly<{
  articles: Article[];
}>;

export const Articles: React.FC<Props> = ({ articles }) => {
  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className={styles.cardTitle}>Artículos</CardTitle>
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <Link href={`/admin/articles/new`} title="Crear nuevo artículo">
            <span className="sr-only">Crear nuevo artículo</span>
            <File className="size-5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Título</TableHead>
              <TableHead className="hidden md:table-cell">Fecha de Publicación</TableHead>
              <TableHead className="hidden lg:table-cell">Categoría</TableHead>
              <TableHead className="hidden lg:table-cell">Author</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(article.publishedAt, "EEE MMMM dd, yyyy")}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {article.category}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {article.author}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={article.published}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-sky-600 hover:bg-sky-700"
                    title="Ver artículo"
                    asChild
                  >
                    <Link
                      href={`/admin/articles/${'abc-123-5555-3333'}`}
                      title="Ver artículo"
                    >
                      <span className="sr-only">Ver artículo</span>
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
                      href={`/admin/articles/${'abc-123-5555-3333'}/edit`}
                      title="Editar artículo"
                    >
                      <span className="sr-only">Editar artículo</span>
                      <FileEdit className="size-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-pink-600 hover:bg-pink-700 cursor-pointer"
                    title="Eliminar artículo"
                    onClick={() => { console.log('Delete article') }}
                  >
                    <span className="sr-only">Eliminar Artículo</span>
                    <Trash className="size-5" />
                  </Button>
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

export default Articles;
