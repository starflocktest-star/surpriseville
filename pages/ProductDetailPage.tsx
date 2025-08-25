import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { useUserAuth } from '../contexts/UserAuthContext';
import { useWishlist } from '../contexts/WishlistContext';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { currentUser } = useUserAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const product = useMemo(() => products.find((p) => p.id === Number(id)), [id, products]);
  const isWishlisted = useMemo(() => wishlist.some(item => item.id === product?.id), [wishlist, product]);

  const [customizations, setCustomizations] = useState<{ [key: string]: string }>({});
  const [includedItemQuantities, setIncludedItemQuantities] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(product?.price || 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      // Initialize text/select customizations
      const initialCustomizations: { [key: string]: string } = {};
      product.customizationOptions?.forEach(option => {
        if (option.type === 'select' && option.choices && option.choices.length > 0) {
          initialCustomizations[option.id] = option.choices[0].name;
        } else if (option.type === 'text') {
          initialCustomizations[option.id] = '';
        }
      });
      setCustomizations(initialCustomizations);

      // Initialize included item quantities
      const initialQuantities: { [key: string]: number } = {};
      product.details.forEach(item => {
        initialQuantities[item.name] = item.quantity;
      });
      setIncludedItemQuantities(initialQuantities);
      
      // Reset main states
      setUnitPrice(product.price);
      setQuantity(1);
    }
  }, [id, product]);

  useEffect(() => {
    if (!product) return;

    let totalUnitPrice = product.price;

    // Calculate cost from text/select customizations
    let customizationCost = 0;
    product.customizationOptions?.forEach(option => {
      const selectedValue = customizations[option.id];
      if (!selectedValue) return;

      if (option.type === 'select' && option.choices) {
        const choice = option.choices.find(c => c.name === selectedValue);
        if (choice) customizationCost += choice.cost;
      } else if (option.type === 'text' && option.costPerCharacter) {
        customizationCost += selectedValue.length * option.costPerCharacter;
      }
    });

    // Calculate cost from extra included items
    let includedItemsExtraCost = 0;
    product.details.forEach(item => {
        if (item.isQuantityCustomizable && item.costPerUnit) {
            const currentQuantity = includedItemQuantities[item.name] || item.quantity;
            const baseQuantity = item.quantity;
            if (currentQuantity > baseQuantity) {
                includedItemsExtraCost += (currentQuantity - baseQuantity) * item.costPerUnit;
            }
        }
    });

    setUnitPrice(totalUnitPrice + customizationCost + includedItemsExtraCost);
  }, [customizations, includedItemQuantities, product]);


  const handleCustomizationChange = (optionId: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [optionId]: value }));
  };
  
  const handleIncludedItemQuantityChange = (itemName: string, newQuantity: number, minQuantity: number) => {
    const validatedQuantity = Math.max(minQuantity, isNaN(newQuantity) ? minQuantity : newQuantity);
    setIncludedItemQuantities(prev => ({ ...prev, [itemName]: validatedQuantity }));
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!product) return;
    addToCart(product, quantity, customizations, unitPrice, includedItemQuantities);
    alert(`${product.name} has been added to your cart!`);
  };

  const handleWishlistToggle = () => {
    if (!currentUser) {
        navigate('/login');
        return;
    }
    if (!product) return;
    if (isWishlisted) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-3xl font-bold">Product not found!</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="flex justify-center items-start">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full max-w-md rounded-lg shadow-lg object-cover" 
          />
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-500 ml-3">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">₹{(unitPrice * quantity).toLocaleString()}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          
          {product.customizationOptions && product.customizationOptions.length > 0 && (
            <div className="my-6 p-4 border rounded-lg bg-secondary/30">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Customize Your Package:</h3>
              <div className="space-y-4">
                {product.customizationOptions.map((option) => (
                  <div key={option.id}>
                    <label htmlFor={option.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {option.name} {option.type === 'text' && option.costPerCharacter ? `(+₹${option.costPerCharacter}/char)` : ''}
                    </label>
                    {option.type === 'text' && (
                      <input
                        type="text"
                        id={option.id}
                        name={option.id}
                        value={customizations[option.id] || ''}
                        onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                        placeholder={option.placeholder}
                        maxLength={option.maxLength}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      />
                    )}
                    {option.type === 'select' && option.choices && (
                      <select
                        id={option.id}
                        name={option.id}
                        value={customizations[option.id] || ''}
                        onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
                      >
                        {option.choices.map((choice) => (
                          <option key={choice.name} value={choice.name}>
                            {choice.name} {choice.cost > 0 ? `(+₹${choice.cost})` : ''}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">
               {product.serviceType === 'package' ? "What's Included:" : "Service Details:"}
            </h3>
            <ul className="space-y-2 text-gray-700">
              {product.details.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                  <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500">
                          {item.quantity} included
                          {item.isQuantityCustomizable && item.costPerUnit && ` (+₹${item.costPerUnit} for each extra)`}
                      </p>
                  </div>
                  {item.isQuantityCustomizable && (
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                          <button
                              onClick={() => handleIncludedItemQuantityChange(item.name, (includedItemQuantities[item.name] || item.quantity) - 1, item.quantity)}
                              className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md"
                              aria-label={`Decrease quantity of ${item.name}`}
                          >
                              -
                          </button>
                          <input
                              type="number"
                              value={includedItemQuantities[item.name] || item.quantity}
                              onChange={(e) => handleIncludedItemQuantityChange(item.name, parseInt(e.target.value, 10), item.quantity)}
                              className="w-16 text-center border-l border-r py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                              min={item.quantity}
                              aria-label={`Quantity of ${item.name}`}
                          />
                          <button
                              onClick={() => handleIncludedItemQuantityChange(item.name, (includedItemQuantities[item.name] || item.quantity) + 1, item.quantity)}
                              className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                              aria-label={`Increase quantity of ${item.name}`}
                          >
                              +
                          </button>
                      </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {product.serviceType === 'package' && (
            <div className="my-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Package Quantity:</label>
              <div className="flex items-center w-fit border rounded-md">
                  <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-l-md"
                      aria-label="Decrease package quantity"
                  >
                      -
                  </button>
                  <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-16 p-2 text-center border-l border-r focus:outline-none focus:ring-1 focus:ring-primary"
                      min="1"
                  />
                  <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-r-md"
                      aria-label="Increase package quantity"
                  >
                      +
                  </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`flex-1 font-bold py-3 px-6 rounded-lg border-2 transition-colors duration-300 ${
                isWishlisted 
                ? 'bg-primary/20 text-primary border-primary' 
                : 'bg-secondary text-primary border-primary hover:bg-primary/20'
              }`}
            >
              {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;