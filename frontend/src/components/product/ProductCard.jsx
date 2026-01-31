import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
    const getLowestPrice = () => {
        if (!product.ProductPricings || product.ProductPricings.length === 0) return 'N/A';
        const prices = product.ProductPricings.map(p => parseFloat(p.price));
        return Math.min(...prices).toFixed(2);
    };

    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/300x200?text=No+Image';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `http://localhost:5000${cleanPath}`;
    };

    const imageUrl = product.ProductMedia && product.ProductMedia.length > 0
        ? getImageUrl(product.ProductMedia[0].media_url)
        : 'https://via.placeholder.com/300x200?text=No+Image'; // Placeholder

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-500">Daily Rate</span>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-primary-600">${product.price_per_day || getLowestPrice()}</p>
                            {product.status !== 'ACTIVE' && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                                    {product.status}
                                </span>
                            )}
                        </div>
                    </div>
                    <Link to={`/products/${product.product_id}`}>
                        <Button variant="outline" className="text-sm py-1 px-3">View</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
