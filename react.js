import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import { PetCard } from "../components/PetCard";
import { usePetStore } from "../utils/store";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const pets = usePetStore((state) => state.pets);
  const featuredPets = pets.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Find Your Perfect Pet Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our selection of cats, dogs, and birds to find your new family member.
          </p>
          <button 
            onClick={() => navigate('/listings')}
            className="btn btn-primary text-lg"
          >
            Browse All Pets
          </button>
        </div>

        {/* Featured Pets Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Featured Pets</h2>
            <button 
              onClick={() => navigate('/listings')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-50 rounded-xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-primary-900">
            Have a Pet to Sell?
          </h2>
          <p className="text-primary-700">
            Create a listing and connect with potential pet owners today.
          </p>
          <button 
            onClick={() => navigate('/add-listing')}
            className="btn btn-primary"
          >
            Create a Listing
          </button>
        </div>
      </main>
    </div>
  );
}
