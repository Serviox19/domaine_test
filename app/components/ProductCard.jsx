import { useState } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';

export function ProductCard({ product, loading }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0].node);
  const [hoverImage, setHoverImage] = useState(null);
  console.log(selectedVariant)

  // Check if onSale
  const isOnSale = selectedVariant.compareAtPriceV2 &&
    parseFloat(selectedVariant.compareAtPriceV2.amount) > parseFloat(selectedVariant.priceV2.amount);

  // Get the variant image or fallback
  const variantImage = selectedVariant.image || product.featuredImage;

  // Handle variant selection
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setHoverImage(null); // Reset hover image when changing variant
  };

  return (
    <div className="relative border p-4">
      {/* Product Badge (On Sale) */}
      {isOnSale && (
        <span className="absolute top-4 left-4 text-base text-red-600 font-medium px-2 py-1 border rounded-3xl z-10">On Sale!</span>
      )}

      {/* Product Image */}
      <Link to={`/products/${product.handle}`}>
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded border-solid border border-gray-200"
          onMouseEnter={() => setHoverImage(product.images.edges[1]?.node || selectedVariant.image)}
          onMouseLeave={() => setHoverImage(null)}>
          <Image
            alt={product.title}
            data={hoverImage || variantImage}
            loading={loading}
            aspectRatio="1/1"
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      {/* Variant Swatches (Colors) */}
      <div className="my-3 flex justify-left gap-2">
        {product.variants.edges.map(({ node: variant }) => {
          const colorOption = variant.selectedOptions.find(option => option.name.toLowerCase() === 'color');
          if (!colorOption) return null;

          return (
            <button
              key={variant.id}
              onClick={() => handleVariantChange(variant)}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedVariant.id === variant.id ? 'border-black' : 'border-gray-300'
                }`}
              style={{ backgroundColor: colorOption.value.toLowerCase() }}
              title={colorOption.value}
            />
          );
        })}
      </div>

      {/* Product Details */}
      <div className="product-details text-left">

        {/* Brand Name */}
        <p className="text-sm text-black font-normal">{product.vendor}</p>

        {/* Product Title */}
        <h3 className="text-base font-medium">
          <Link to={`/products/${product.handle}`}>
            {product.title}
          </Link>
        </h3>

        {/* Product Price */}
        <div className="mt-1 flex items-center">
          <Money
            data={selectedVariant.priceV2}
            className={`text-sm font-normal ${isOnSale ? 'line-through' : ''}`}
          />
          {isOnSale && (
            <Money
              data={selectedVariant.compareAtPriceV2}
              className="text-sm font-normal text-red-500 ml-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}