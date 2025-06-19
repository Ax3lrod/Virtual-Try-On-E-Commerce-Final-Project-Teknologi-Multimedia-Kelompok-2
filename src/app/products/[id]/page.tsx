import { products } from "@/content/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
