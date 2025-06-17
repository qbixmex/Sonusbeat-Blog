import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type Props = {
  title: string;
};

type Item = {
  id: string;
  title: string;
  badge: string;
  image: string;
  count: number;
};

const popularContent: Item[] = [
  {
    id: "bt35",
    title: "JavaScript Tutorial",
    badge: "Coding",
    image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 4300,
  },
  {
    id: "it93",
    title: "Tech Trends 2025",
    badge: "Tech",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 3200,
  },
  {
    id: "2nri",
    title: "The Future of AI",
    badge: "AI",
    image: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2400,
  },
  {
    id: "9du4",
    title: "React Hooks Explained",
    badge: "Coding",
    image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1500,
  },
  {
    id: "bk29",
    title: "Image Generation AI",
    badge: "AI",
    image: "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1200,
  },
];

const latestTransactions = [
  {
    id: "of82",
    title: "Subscription Renewal",
    badge: "John Doe",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: "gh47",
    title: "Payment for Services",
    badge: "Jane Smith",
    image: "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100,
  },
  {
    id: "kl56",
    title: "Subscription Renewal",
    badge: "Michael Johnson",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300,
  },
  {
    id: "ui34",
    title: "Payment for Services",
    badge: "Lily Adams",
    image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: "zx90",
    title: "Subscription Renewal",
    badge: "Sam Brown",
    image: "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
];

export const CardList: React.FC<Props> = ({ title }) => {
  const list = (title === "Últimas Transacciones")
    ? latestTransactions
    : popularContent;

    return (
    <>
      <h2 className="text-3xl text-primary-foreground font-semibold mb-6">{title}</h2>
      <div className="flex flex-col gap-2">
        {list.map((item) => {
          const { id, title, image, badge } = item;
          return (
            <Card key={id} className="flex-row items-center justify-between gap-4 p-4">
              <div className="size-12 rounded-sm relative overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-1 p-0">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Badge variant="secondary">{ badge }</Badge>
              </CardContent>
              <CardFooter className="p-0">
                <span>{item.count / 1000} k</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default CardList;
