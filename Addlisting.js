import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '../utils/store';
import { PET_TYPES, BREEDS } from '../utils/constants';
import type { Pet, PetType } from '../utils/types';

export default function AddListing() {
  const navigate = useNavigate();
  const addPet = usePetStore((state) => state.addPet);
  const [selectedType, setSelectedType] = useState<PetType>('cat');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newPet: Pet = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      type: selectedType,
      breed: formData.get('breed') as string,
      age: Number(formData.get('age')),
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      location: formData.get('location') as string,
      seller: {
        name: formData.get('sellerName') as string,
        contact: formData.get('sellerEmail') as string,
      }
    };

    addPet(newPet);
    navigate('/listings');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl mb-6">Add New Pet Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-medium">Pet Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Pet Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as PetType)}
                name="type"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {PET_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Breed</label>
              <select
                name="breed"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {BREEDS[selectedType].map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Age (years)</label>
              <input
                type="number"
                name="age"
                min="0"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Price ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              required
              placeholder="https://example.com/pet-image.jpg"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-medium">Your Name</label>
              <input
                type="text"
                name="sellerName"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Your Email</label>
              <input
                type="email"
                name="sellerEmail"
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/listings')}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
}
