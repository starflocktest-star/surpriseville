import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { Product, IncludedItem, CustomizationOption, CustomizationChoice, ServiceType } from '../../types';
import { CATEGORIES } from '../../constants';

const AdminProductFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProductById, addProduct, updateProduct } = useProducts();
    const isEditing = id !== undefined;

    const [product, setProduct] = useState<Omit<Product, 'id' | 'rating' | 'reviews'>>({
        name: '',
        category: CATEGORIES.find(c=>c.id !== 'all')?.id || 'birthday',
        price: 0,
        imageUrl: '',
        description: '',
        details: [],
        customizationOptions: [],
        serviceType: 'package',
    });

    useEffect(() => {
        if (isEditing) {
            const existingProduct = getProductById(Number(id));
            if (existingProduct) {
                setProduct(existingProduct);
            }
        }
    }, [id, isEditing, getProductById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        let finalValue: string | number | ServiceType = value;
        if (type === 'number') {
            finalValue = parseFloat(value) || 0;
        }

        setProduct(prev => ({ ...prev, [name]: finalValue }));
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handlers for IncludedItem (details)
    const handleDetailChange = (index: number, field: keyof IncludedItem, value: any) => {
        const newDetails = [...product.details];
        if (field === 'isQuantityCustomizable') {
             newDetails[index] = { ...newDetails[index], [field]: value as boolean };
        } else if (field === 'quantity' || field === 'costPerUnit') {
             newDetails[index] = { ...newDetails[index], [field]: Number(value) };
        } else {
             newDetails[index] = { ...newDetails[index], [field]: value as string };
        }
        setProduct(prev => ({...prev, details: newDetails}));
    };
    const addDetail = () => {
        setProduct(prev => ({...prev, details: [...prev.details, { name: '', quantity: 1, isQuantityCustomizable: false, costPerUnit: 0 }]}));
    };
    const removeDetail = (index: number) => {
        setProduct(prev => ({...prev, details: prev.details.filter((_, i) => i !== index)}));
    };
    
    // Handlers for CustomizationOption
    const handleOptionChange = (index: number, field: keyof CustomizationOption, value: any) => {
        const newOptions = [...(product.customizationOptions || [])];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setProduct(prev => ({ ...prev, customizationOptions: newOptions }));
    };
    const addOption = () => {
        const newOption: CustomizationOption = { id: `custom_${Date.now()}`, name: '', type: 'text', choices: [] };
        setProduct(prev => ({ ...prev, customizationOptions: [...(prev.customizationOptions || []), newOption] }));
    };
    const removeOption = (index: number) => {
        setProduct(prev => ({ ...prev, customizationOptions: (prev.customizationOptions || []).filter((_, i) => i !== index) }));
    };
    
    // Handlers for CustomizationChoice
    const handleChoiceChange = (optionIndex: number, choiceIndex: number, field: keyof CustomizationChoice, value: any) => {
        const newOptions = [...(product.customizationOptions || [])];
        const newChoices = [...(newOptions[optionIndex].choices || [])];
        if (field === 'cost') {
            newChoices[choiceIndex] = {...newChoices[choiceIndex], [field]: Number(value) };
        } else {
            newChoices[choiceIndex] = {...newChoices[choiceIndex], [field]: value as string };
        }
        newOptions[optionIndex].choices = newChoices;
        setProduct(prev => ({...prev, customizationOptions: newOptions}));
    };
    const addChoice = (optionIndex: number) => {
        const newOptions = [...(product.customizationOptions || [])];
        const choices = newOptions[optionIndex].choices || [];
        newOptions[optionIndex].choices = [...choices, { name: '', cost: 0 }];
        setProduct(prev => ({ ...prev, customizationOptions: newOptions }));
    };
    const removeChoice = (optionIndex: number, choiceIndex: number) => {
        const newOptions = [...(product.customizationOptions || [])];
        newOptions[optionIndex].choices = (newOptions[optionIndex].choices || []).filter((_, i) => i !== choiceIndex);
        setProduct(prev => ({...prev, customizationOptions: newOptions}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateProduct(product as Product);
        } else {
            addProduct(product);
        }
        navigate('/admin');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Package' : 'Create New Package'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" value={product.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (Base)</label>
                        <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Service Type</label>
                        <select name="serviceType" value={product.serviceType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="package">Package</option>
                            <option value="service">Service</option>
                            <option value="venue">Venue</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input type="file" name="image" onChange={handleImageUpload} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                        {product.imageUrl && <img src={product.imageUrl} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md" />}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                </div>

                {/* Included Items */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Included Items</h3>
                    {product.details.map((detail, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-md mb-2 bg-gray-50">
                            <input type="text" value={detail.name} onChange={e => handleDetailChange(index, 'name', e.target.value)} placeholder="Item Name" className="border-gray-300 rounded-md shadow-sm" />
                            <input type="number" value={detail.quantity} onChange={e => handleDetailChange(index, 'quantity', e.target.value)} placeholder="Quantity" className="border-gray-300 rounded-md shadow-sm" />
                            <input type="number" value={detail.costPerUnit || ''} onChange={e => handleDetailChange(index, 'costPerUnit', e.target.value)} placeholder="Cost Per Extra" className="border-gray-300 rounded-md shadow-sm" disabled={!detail.isQuantityCustomizable} />
                            <div className="flex items-center justify-between">
                               <label className="flex items-center"><input type="checkbox" checked={detail.isQuantityCustomizable} onChange={e => handleDetailChange(index, 'isQuantityCustomizable', e.target.checked)} className="rounded" /> <span className="ml-2 text-sm">Custom Qty?</span></label>
                               <button type="button" onClick={() => removeDetail(index)} className="text-red-500">Remove</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addDetail} className="mt-2 text-sm text-indigo-600">+ Add Item</button>
                </div>

                {/* Customization Options */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Customization Options</h3>
                    {product.customizationOptions?.map((option, optionIndex) => (
                        <div key={option.id} className="p-3 border rounded-md mb-2 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input type="text" value={option.name} onChange={e => handleOptionChange(optionIndex, 'name', e.target.value)} placeholder="Option Name" className="border-gray-300 rounded-md shadow-sm" />
                                <input type="text" value={option.id} onChange={e => handleOptionChange(optionIndex, 'id', e.target.value)} placeholder="Option ID" className="border-gray-300 rounded-md shadow-sm" />
                                <select value={option.type} onChange={e => handleOptionChange(optionIndex, 'type', e.target.value)} className="border-gray-300 rounded-md shadow-sm">
                                    <option value="text">Text Input</option>
                                    <option value="select">Select Dropdown</option>
                                </select>
                            </div>
                             <button type="button" onClick={() => removeOption(optionIndex)} className="text-red-500 text-xs mt-2">Remove Option</button>
                            
                            {option.type === 'select' && (
                                <div className="mt-2 pl-4 border-l-2">
                                     {option.choices?.map((choice, choiceIndex) => (
                                         <div key={choiceIndex} className="flex items-center gap-2 mb-1">
                                             <input type="text" value={choice.name} onChange={e => handleChoiceChange(optionIndex, choiceIndex, 'name', e.target.value)} placeholder="Choice Name" className="w-full border-gray-300 rounded-md shadow-sm text-sm" />
                                             <input type="number" value={choice.cost} onChange={e => handleChoiceChange(optionIndex, choiceIndex, 'cost', e.target.value)} placeholder="Cost" className="w-32 border-gray-300 rounded-md shadow-sm text-sm" />
                                             <button type="button" onClick={() => removeChoice(optionIndex, choiceIndex)} className="text-red-500 text-xs">X</button>
                                         </div>
                                     ))}
                                     <button type="button" onClick={() => addChoice(optionIndex)} className="text-xs text-indigo-600">+ Add Choice</button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addOption} className="mt-2 text-sm text-indigo-600">+ Add Customization Option</button>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to="/admin" className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</Link>
                    <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover">{isEditing ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductFormPage;