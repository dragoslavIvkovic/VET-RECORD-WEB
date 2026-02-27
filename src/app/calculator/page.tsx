'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { APP_LINKS } from '../config/links';

interface Breed {
    id: string;
    name: string;
    min_weight_kg: number;
    max_weight_kg: number;
}

export default function CalculatorPage() {
    const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const [ageGroup, setAgeGroup] = useState<'puppy' | 'adult' | 'senior'>('adult');
    const [currentWeight, setCurrentWeight] = useState<string>('');
    const [result, setResult] = useState<{ 
        status: string; 
        colorClass: string; 
        message: string; 
        min: number; 
        max: number; 
        weight: number;
        percent: number;
    } | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch breeds when petType changes
    useEffect(() => {
        const fetchBreeds = async () => {
            setLoading(true);
            try {
                const url = petType === 'dog' 
                    ? 'https://raw.githubusercontent.com/dragoslavIvkovic/all-dog-breeds/main/all-dog-breeds.json'
                    : 'https://raw.githubusercontent.com/dragoslavIvkovic/all-cat-breeds/main/all-cat-breeds.json';
                const response = await fetch(url);
                const data = await response.json();
                setBreeds(petType === 'dog' ? data.dogs : data.cats);
                setSelectedBreed(null);
                setSearchQuery('');
                setResult(null);
            } catch (error) {
                console.error("Failed to fetch breeds", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBreeds();
    }, [petType]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const filteredBreeds = useMemo(() => {
        return breeds.filter(breed => breed.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [breeds, searchQuery]);

    const handleCalculate = () => {
        if (!selectedBreed || !currentWeight) return;
        
        const weight = parseFloat(currentWeight);
        if (isNaN(weight) || weight <= 0) return;

        const min = selectedBreed.min_weight_kg;
        const max = selectedBreed.max_weight_kg;

        let status = '';
        let colorClass = '';
        let message = '';

        if (weight < min * 0.9) {
            status = 'Dangerously Underweight';
            colorClass = 'text-red-500';
            message = `Your ${petType} is significantly below the ideal weight. Please consult a veterinarian to establish a healthy gain plan.`;
        } else if (weight >= min * 0.9 && weight < min) {
            status = 'Slightly Underweight';
            colorClass = 'text-yellow-600';
            message = `Your ${petType} is slightly below the ideal weight. Monitor their diet and body condition closely.`;
        } else if (weight >= min && weight <= max) {
            status = 'Ideal Weight';
            colorClass = 'text-green-500';
            message = `Great job! Your ${petType} is within the ideal adult weight range for their breed.`;
        } else if (weight > max && weight <= max * 1.1) {
            status = 'Slightly Overweight';
            colorClass = 'text-yellow-600';
            message = `Your ${petType} is slightly above the ideal weight. Consider a bit more exercise or adjusting food portions.`;
        } else {
            status = 'Dangerously Overweight';
            colorClass = 'text-red-500';
            message = `Your ${petType} is significantly above the ideal weight, which can lead to health issues. Please consult a veterinarian.`;
        }

        // Calculate percentage for the visual bar (0-100 scale)
        // 0-20% (Dangerously Under), 20-40% (Slightly Under), 40-60% (Ideal), 60-80% (Slightly Over), 80-100% (Dangerously Over)
        let percent = 50;
        if (weight < min * 0.9) {
            percent = ((weight - min * 0.7) / (min * 0.9 - min * 0.7)) * 20;
        } else if (weight < min) {
            percent = 20 + ((weight - min * 0.9) / (min - min * 0.9)) * 20;
        } else if (weight <= max) {
            percent = 40 + ((weight - min) / (max - min)) * 20;
        } else if (weight <= max * 1.1) {
            percent = 60 + ((weight - max) / (max * 1.1 - max)) * 20;
        } else {
            percent = 80 + ((weight - max * 1.1) / (max * 1.3 - max * 1.1)) * 20;
        }
        percent = Math.max(3, Math.min(97, percent)); // clamp to keep marker visible

        setResult({ status, colorClass, message, min, max, weight, percent });
    };

    return (
        <div className="min-h-screen flex flex-col pt-12 text-[#0C4C55] bg-gray-50/50">
            <main className="flex-1 container mx-auto px-4 max-w-3xl pb-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Pet Weight Calculator</h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">Is your furry friend at a healthy weight? Select their breed and enter their weight to find out instantly.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 border border-gray-100">
                    {/* Pet Type Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 relative z-10">
                        <button
                            onClick={() => { setPetType('dog'); setResult(null); }}
                            className={`flex-1 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 z-10 ${petType === 'dog' ? 'bg-white shadow-sm text-[#0C4C55]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🐶 Dog
                        </button>
                        <button
                            onClick={() => { setPetType('cat'); setResult(null); }}
                            className={`flex-1 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 z-10 ${petType === 'cat' ? 'bg-white shadow-sm text-[#0C4C55]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🐱 Cat
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Breed Select (Combobox) */}
                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Select Breed</label>
                            <input
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#0C4C55]/20 focus:border-[#0C4C55] transition-all outline-none"
                                placeholder={loading ? "Loading breeds..." : `Search for a ${petType} breed...`}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsDropdownOpen(true);
                                }}
                                onFocus={() => setIsDropdownOpen(true)}
                                disabled={loading}
                            />
                            {isDropdownOpen && (
                                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                    {filteredBreeds.length > 0 ? (
                                        filteredBreeds.map((breed) => (
                                            <button
                                                key={breed.id}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                                onClick={() => {
                                                    setSelectedBreed(breed);
                                                    setSearchQuery(breed.name);
                                                    setIsDropdownOpen(false);
                                                    setResult(null);
                                                }}
                                            >
                                                {breed.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-gray-500">No breeds found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Age/Life Stage */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Life Stage</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#0C4C55]/20 focus:border-[#0C4C55] transition-all outline-none appearance-none"
                                    value={ageGroup}
                                    onChange={(e) => setAgeGroup(e.target.value as any)}
                                >
                                    <option value="puppy">{petType === 'dog' ? 'Puppy' : 'Kitten'} (&lt; 1 year)</option>
                                    <option value="adult">Adult (1-8 years)</option>
                                    <option value="senior">Senior (9+ years)</option>
                                </select>
                            </div>

                            {/* Current Weight */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Current Weight (kg)</label>
                                <input
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#0C4C55]/20 focus:border-[#0C4C55] transition-all outline-none"
                                    placeholder="e.g. 15.5"
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={handleCalculate}
                            disabled={!selectedBreed || !currentWeight}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 mt-4 shadow-lg shadow-cyan-500/30
                                ${(!selectedBreed || !currentWeight) ? 'bg-gray-300 shadow-none cursor-not-allowed' : 'bg-[#0C4C55] hover:bg-[#0A3D44] hover:shadow-cyan-500/40 hover:-translate-y-0.5'}`}
                        >
                            Calculate Result
                        </button>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className="mt-12 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-center mb-8">Assessment Result</h2>
                            
                            <div className="flex flex-col items-center justify-center mb-8">
                                <span className={`text-4xl font-extrabold tracking-tight ${result.colorClass} mb-2`}>
                                    {result.status}
                                </span>
                                <p className="text-gray-600 text-center max-w-md mx-auto">
                                    {result.weight} kg (Target adult range: {result.min} - {result.max} kg)
                                </p>
                            </div>

                            {/* Visual Gauge Chart */}
                            <div className="relative w-full max-w-xl mx-auto pt-6 pb-12">
                                <div className="h-4 rounded-full w-full shadow-inner" style={{ background: 'linear-gradient(to right, #ef4444 10%, #f59e0b 30%, #10b981 50%, #f59e0b 70%, #ef4444 90%)' }}></div>
                                
                                {/* Marker */}
                                <div 
                                    className="absolute top-2 w-6 h-6 bg-white border-4 border-gray-900 rounded-full shadow-md transform -translate-x-1/2 transition-all duration-1000 ease-out"
                                    style={{ left: `${result.percent}%` }}
                                >
                                    {/* Arrow pointing down */}
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>

                                {/* Labels */}
                                <div className="absolute mt-3 w-full flex justify-between text-xs font-medium text-gray-400 px-1">
                                    <span>Under</span>
                                    <span>Ideal</span>
                                    <span>Over</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 text-center max-w-xl mx-auto mb-8 border border-gray-100 shadow-sm">
                                <p className="text-gray-800 text-lg">{result.message}</p>
                                {ageGroup === 'puppy' && (
                                    <p className="mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                                        <strong>Note:</strong> Since your {petType} is still a {petType === 'dog' ? 'puppy' : 'kitten'}, they are still growing! This calculator compares their current weight to the <strong>adult</strong> target weights for their breed.
                                    </p>
                                )}
                            </div>

                            {/* Marketing CTA Banner */}
                            <div className="mt-12 bg-linear-to-br from-[#0C4C55] to-[#08353B] rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3">Stop guessing. Track their health.</h3>
                                    <p className="text-gray-200 mb-8 max-w-md mx-auto">
                                        Monitor your pet's exact weight, daily routines, and medical history instantly with the Vet Record App.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <a href={APP_LINKS.GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="transition hover:scale-105 active:scale-95">
                                            <img src="/images/download/googleplay.png" alt="Get it on Google Play" className="h-12 w-auto" />
                                        </a>
                                        <a href={APP_LINKS.APP_STORE} target="_blank" rel="noopener noreferrer" className="transition hover:scale-105 active:scale-95">
                                            <img src="/images/download/appstore.png" alt="Download on the App Store" className="h-12 w-auto" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
