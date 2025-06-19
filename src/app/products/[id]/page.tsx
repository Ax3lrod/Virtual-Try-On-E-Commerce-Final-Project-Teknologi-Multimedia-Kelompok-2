import { products } from "@/content/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
