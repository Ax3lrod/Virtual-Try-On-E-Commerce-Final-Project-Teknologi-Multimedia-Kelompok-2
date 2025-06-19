import { products } from "@/content/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const productId = (await params).productId;
  const product = products.find((p) => p.id === productId);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
