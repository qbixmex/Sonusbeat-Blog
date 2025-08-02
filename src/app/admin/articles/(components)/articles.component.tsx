'use client';

import { type FC, startTransition, useOptimistic } from "react";
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
import { updateArticleStateAction } from "../(actions)/update-article-state.action";
import { deleteArticleAction } from "../(actions)/delete-article.action";
import { getFirstAndLastName } from "@/lib/utils";
import { AdminArticle } from "../(actions)/fetch-articles.action";
import Image from "next/image";
import RobotsBadges from "@/root/src/components/robots-badges.component";

type Props = Readonly<{
  articles: AdminArticle[];
}>;

export const Articles: FC<Props> = ({ articles }) => {

  const [optimisticState, setOptimisticState] = useOptimistic(articles, (prev, { id, published }) => {
    return prev.map(article =>
      article.id === id ? { ...article, published } : article
    );
  });

  const handleArticleState = async (articleId: string, currentPublished: boolean) => {
    startTransition(() => {
      setOptimisticState({ id: articleId, published: !currentPublished });
    });

    const response = await updateArticleStateAction(articleId);

    if (!response.ok) {
      startTransition(() => {
        setOptimisticState({ id: articleId, published: currentPublished });
      });
      toast.error(response.message);
      return;
    }

    if (response.ok) {
      toast.success(response.message);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    const response = await deleteArticleAction(articleId);

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
              <TableHead>Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="hidden lg:table-cell">Categoría</TableHead>
              <TableHead className="hidden lg:table-cell">Author</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead className="hidden lg:table-cell">Robots</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimisticState.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Link href={`/admin/articles/${article.id}`}>
                    <Image
                      src={
                        article.imageURL?.startsWith('https')
                          ? article.imageURL
                          : `/images/blog/${article.imageURL}`
                      }
                      alt={
                        (article.translations.length > 0)
                          ? article.translations[0].imageAlt
                          : "Imagen del artículo"
                      }
                      className="w-[150px] h-[75px] object-cover rounded"
                      width={150}
                      height={75}
                    />
                  </Link>
                </TableCell>
                <TableCell className="whitespace-break-spaces break-words max-w-xs">
                  <Link href={`/admin/articles/${article.id}`}>
                    {
                      (article.translations.length > 0)
                        ? article.translations[0].title
                        : "Título del artículo"
                    }
                  </Link>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Link
                    href={`/admin/categories/${article.category.translations[0].id}`}
                    className="text-blue-400 hover:underline"
                  >
                    { article.category.translations[0].name }
                  </Link>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Link
                    href={`/admin/profile/${(article.author as { id: string }).id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {getFirstAndLastName((article.author as { name: string }).name)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={article.published}
                    onCheckedChange={() => {
                      handleArticleState(article.id as string, article.published);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <RobotsBadges seoRobots={article.seoRobots as string} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-sky-600 hover:bg-sky-700"
                      title="Ver artículo"
                      asChild
                    >
                      <Link
                        href={`/admin/articles/${article.id}`}
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
                        href={`/admin/articles/${article.id}/edit`}
                        title="Editar artículo"
                      >
                        <span className="sr-only">Editar artículo</span>
                        <FileEdit className="size-5" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          size="icon"
                          className="bg-pink-600 hover:bg-pink-700 cursor-pointer"
                          title="Eliminar artículo"
                        >
                          <span className="sr-only">Eliminar Artículo</span>
                          <Trash className="size-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿ Estas seguro de eliminar este artículo ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer.
                            Esto eliminará el artículo y todos sus datos asociados de forma permanente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteArticle(article.id as string)}
                          >Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
