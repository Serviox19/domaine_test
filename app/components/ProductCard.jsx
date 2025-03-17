import { useState } from 'react';
import { Image, Money, Link } from '@shopify/hydrogen';

export function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Check if onSale
  const isOnSale = selectedVariant.compareAtPriceV2 &&
    parseFloat(selectedVariant.compareAtPriceV2.amount) > parseFloat(selectedVariant.priceV2.amount);

  return (
    <div className="relative border">
      {/* Product Badge (On Sale) */}
      <span className="absolute top-2 left-2 text-red text-sm font-bold px-2 py-1 rounded">On Sale!</span>


      {/* Product Image */}
      <Link to={`/products/${product.handle}`}>
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
          <Image
            alt={product.title}
            data={product.images[0]}
            loading="lazy"
            aspectRatio="1/1"
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      {/* Variant Swatches (Colors) */}
      <div className="mt-4 flex justify-center gap-2">
        {/* products.variants (map through them, and render swatch button) */}
      </div>

      {/* Product Details */}
      <div className="product-details text-center">

        {/* Brand Name */}
        <p className="text-sm text-black">{product.vendor}</p>

        {/* Product Title */}
        <h3 className="text-lg font-semibold">
          <Link to={`/products/${product.handle}`}>
            {product.title}
          </Link>
        </h3>

        {/* Product Price */}
        <div className="mt-2">
          <Money
            data={selectedVariant.priceV2}
            className={`text-lg font-bold ${isOnSale ? 'line-through' : ''}`}
          />
          {isOnSale && (
            <Money
              data={selectedVariant.compareAtPriceV2}
              className="text-sm text-red-500 ml-2"
            />
          )}
        </div>

      </div>
    </div>
  );
}