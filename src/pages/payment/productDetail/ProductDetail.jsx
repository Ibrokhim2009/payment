import React from 'react';
import {
  BiStar,
  BiCheck,
  BiShield,
  BiTime,
  BiHeart
} from 'react-icons/bi';
import ProductFeatures from './ProductFeatures';

const ProductDetail = () => {
  return (
    <div className=" rounded-2xl w-[100%] overflow-hidden">
      <div className="flex flex-col w-[100%] lg:flex-row">
        {/* Product Details Section */}
        <div className="w-full max-w-[800px]   p-6 lg:p-8">
          {/* Image Gallery */}
          <div className="relative group">
            <div className=" rounded-xl overflow-hidden bg-gray-100">
              <img
                src="https://img.freepik.com/free-psd/3d-rendering-black-background-product-podium-stand-studio_1258-123102.jpg"
                alt="Product"
                className="w-full h-[400px] object-cover transform transition-all duration-500 group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                <BiHeart className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="lg:text-2xl font-bold text-gray-900">Premium Wireless Headphones</h1>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <BiStar key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">$199.99</div>
                <div className="text-sm text-gray-500 line-through">$249.99</div>
              </div>
            </div>
            <ProductFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;