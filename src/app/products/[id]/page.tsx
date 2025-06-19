import { products } from "@/content/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
