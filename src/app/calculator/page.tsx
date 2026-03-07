'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import Footer from '../components/Footer';
import { APP_LINKS } from '../config/links';
import { usePostHog } from 'posthog-js/react';

interface Breed {
    id: string;
    name: string;
    min_weight_kg: number;
    max_weight_kg: number;
}

export default function CalculatorPage() {
    const posthog = usePostHog();
    const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [ageGroup, setAgeGroup] = useState<'puppy' | 'adult' | 'senior'>('adult');
    const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs' | 'oz'>('lbs');
    const [currentWeight, setCurrentWeight] = useState<string>('');
    const [result, setResult] = useState<{
        status: string;
        colorClass: string;
        message: string;
        min: number;
        max: number;
        weight: number;
        weightDisplay: string;
        percent: number;
    } | null>(null);

    const toKg = (value: number, unit: 'kg' | 'lbs' | 'oz'): number => {
        if (unit === 'lbs') return value * 0.453592;
        if (unit === 'oz') return value * 0.0283495;

        return value;
    };

    const fromKg = (kg: number, unit: 'kg' | 'lbs' | 'oz'): number => {
        if (unit === 'lbs') return kg / 0.453592;
        if (unit === 'oz') return kg / 0.0283495;

        return kg;
    };

    const formatWeight = (kg: number, unit: 'kg' | 'lbs' | 'oz'): string => {
        const val = fromKg(kg, unit);

        return `${val.toFixed(1)} ${unit}`;
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch breeds when petType changes
    useEffect(() => {
        const fetchBreeds = async () => {
            setLoading(true);
            try {
                const url =
                    petType === 'dog'
                        ? 'https://raw.githubusercontent.com/dragoslavIvkovic/all-dog-breeds/main/all-dog-breeds.json'
                        : 'https://raw.githubusercontent.com/dragoslavIvkovic/all-cat-breeds/main/all-cat-breeds.json';
                const response = await fetch(url);
                const data = await response.json();
                setBreeds(petType === 'dog' ? data.dogs : data.cats);
                setSelectedBreed(null);
                setSearchQuery('');
                setResult(null);
            } catch (error) {
                console.error('Failed to fetch breeds', error);
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
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    const filteredBreeds = useMemo(() => {
        return breeds.filter((breed) => breed.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [breeds, searchQuery]);

    const handleCalculate = () => {
        if (!selectedBreed || !currentWeight) return;

        const rawWeight = parseFloat(currentWeight);
        if (isNaN(rawWeight) || rawWeight <= 0) return;

        const weight = toKg(rawWeight, weightUnit);
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

        const weightDisplay = `${rawWeight} ${weightUnit}`;
        setResult({ status, colorClass, message, min, max, weight, weightDisplay, percent });
        posthog.capture('calculator_result_shown', {
            pet_type: petType,
            breed_name: selectedBreed.name,
            age_group: ageGroup,
            weight_unit: weightUnit,
            weight_value: rawWeight,
            weight_status: status
        });
        (window as any).gtag?.('event', 'use_calculator', {
            'page_path': window.location.pathname
        });
    };

    return (
        <div className='flex min-h-screen flex-col bg-gray-50/50 pt-12 text-[#0C4C55]'>
            <main className='container mx-auto max-w-3xl flex-1 px-4 pb-20'>
                <div className='mb-10 text-center'>
                    <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>Pet Weight Calculator</h1>
                    <p className='mx-auto max-w-xl text-lg text-gray-600'>
                        Is your furry friend at a healthy weight? Select their breed and enter their weight to find out
                        instantly.
                    </p>
                </div>

                <div className='rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10'>
                    {/* Pet Type Toggle */}
                    <div className='relative z-10 mb-8 flex rounded-2xl bg-gray-100 p-1'>
                        <button
                            onClick={() => {
                                setPetType('dog');
                                setResult(null);
                            }}
                            className={`z-10 flex-1 rounded-xl px-4 py-3 text-lg font-medium transition-all duration-300 ${petType === 'dog' ? 'bg-white text-[#0C4C55] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            🐶 Dog
                        </button>
                        <button
                            onClick={() => {
                                setPetType('cat');
                                setResult(null);
                            }}
                            className={`z-10 flex-1 rounded-xl px-4 py-3 text-lg font-medium transition-all duration-300 ${petType === 'cat' ? 'bg-white text-[#0C4C55] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            🐱 Cat
                        </button>
                    </div>

                    <div className='space-y-6'>
                        {/* Breed Select (Combobox) */}
                        <div className='relative' ref={dropdownRef}>
                            <label className='mb-2 block text-sm font-semibold text-gray-700'>Select Breed</label>
                            <input
                                type='text'
                                className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 transition-all outline-none focus:border-[#0C4C55] focus:ring-2 focus:ring-[#0C4C55]/20'
                                placeholder={loading ? 'Loading breeds...' : `Search for a ${petType} breed...`}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsDropdownOpen(true);
                                }}
                                onFocus={() => setIsDropdownOpen(true)}
                                disabled={loading}
                            />
                            {isDropdownOpen && (
                                <div className='absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg'>
                                    {filteredBreeds.length > 0 ? (
                                        filteredBreeds.map((breed) => (
                                            <button
                                                key={breed.id}
                                                className='w-full border-b border-gray-50 px-4 py-3 text-left transition-colors last:border-0 hover:bg-gray-50'
                                                onClick={() => {
                                                    setSelectedBreed(breed);
                                                    setSearchQuery(breed.name);
                                                    setIsDropdownOpen(false);
                                                    setResult(null);
                                                    posthog.capture('calculator_breed_selected', {
                                                        pet_type: petType,
                                                        breed_name: breed.name
                                                    });
                                                }}>
                                                {breed.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div className='px-4 py-3 text-gray-500'>No breeds found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Life Stage */}
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-gray-700'>Life Stage</label>
                            <select
                                className='w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 transition-all outline-none focus:border-[#0C4C55] focus:ring-2 focus:ring-[#0C4C55]/20'
                                value={ageGroup}
                                onChange={(e) => setAgeGroup(e.target.value as 'puppy' | 'adult' | 'senior')}>
                                <option value='puppy'>{petType === 'dog' ? 'Puppy' : 'Kitten'} (&lt; 1 year)</option>
                                <option value='adult'>Adult (1-8 years)</option>
                                <option value='senior'>Senior (9+ years)</option>
                            </select>
                        </div>

                        {/* Weight Unit + Current Weight */}
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-gray-700'>Current Weight</label>
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-2'>
                                <div className='flex shrink-0 rounded-xl bg-gray-100 p-1'>
                                    {(['lbs', 'kg', 'oz'] as const).map((unit) => (
                                        <button
                                            key={unit}
                                            type='button'
                                            onClick={() => {
                                                setWeightUnit(unit);
                                                setResult(null);
                                            }}
                                            className={`rounded-lg px-3 py-3 text-sm font-semibold transition-all ${
                                                weightUnit === unit
                                                    ? 'bg-white text-[#0C4C55] shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}>
                                            {unit}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type='number'
                                    min='0.1'
                                    step='0.1'
                                    className='flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 transition-all outline-none focus:border-[#0C4C55] focus:ring-2 focus:ring-[#0C4C55]/20'
                                    placeholder={
                                        weightUnit === 'kg'
                                            ? 'e.g. 7.0'
                                            : weightUnit === 'lbs'
                                              ? 'e.g. 15.4'
                                              : 'e.g. 112'
                                    }
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={handleCalculate}
                            disabled={!selectedBreed || !currentWeight}
                            className={`mt-4 w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 ${!selectedBreed || !currentWeight ? 'cursor-not-allowed bg-gray-300 shadow-none' : 'bg-[#0C4C55] hover:-translate-y-0.5 hover:bg-[#0A3D44] hover:shadow-cyan-500/40'}`}>
                            Calculate Result
                        </button>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className='animate-in fade-in slide-in-from-bottom-4 mt-12 border-t border-gray-100 pt-8 duration-500'>
                            <h2 className='mb-8 text-center text-2xl font-bold'>Assessment Result</h2>

                            <div className='mb-8 flex flex-col items-center justify-center'>
                                <span className={`text-4xl font-extrabold tracking-tight ${result.colorClass} mb-2`}>
                                    {result.status}
                                </span>
                                <p className='mx-auto max-w-md text-center text-gray-600'>
                                    {result.weightDisplay} (Target adult range: {formatWeight(result.min, weightUnit)} –{' '}
                                    {formatWeight(result.max, weightUnit)})
                                </p>
                            </div>

                            {/* Visual Gauge Chart */}
                            <div className='relative mx-auto w-full max-w-xl pt-6 pb-12'>
                                <div
                                    className='h-4 w-full rounded-full shadow-inner'
                                    style={{
                                        background:
                                            'linear-gradient(to right, #ef4444 10%, #f59e0b 30%, #10b981 50%, #f59e0b 70%, #ef4444 90%)'
                                    }}></div>

                                {/* Marker */}
                                <div
                                    className='absolute top-2 h-6 w-6 -translate-x-1/2 transform rounded-full border-4 border-gray-900 bg-white shadow-md transition-all duration-1000 ease-out'
                                    style={{ left: `${result.percent}%` }}>
                                    {/* Arrow pointing down */}
                                    <div className='absolute -top-4 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-900'></div>
                                </div>

                                {/* Labels */}
                                <div className='absolute mt-3 flex w-full justify-between px-1 text-xs font-medium text-gray-400'>
                                    <span>Under</span>
                                    <span>Ideal</span>
                                    <span>Over</span>
                                </div>
                            </div>

                            <div className='mx-auto mb-8 max-w-xl rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm'>
                                <p className='text-lg text-gray-800'>{result.message}</p>
                                {ageGroup === 'puppy' && (
                                    <p className='mt-4 rounded-lg border border-yellow-100 bg-yellow-50 p-3 text-sm text-yellow-700'>
                                        <strong>Note:</strong> Since your {petType} is still a{' '}
                                        {petType === 'dog' ? 'puppy' : 'kitten'}, they are still growing! This
                                        calculator compares their current weight to the <strong>adult</strong> target
                                        weights for their breed.
                                    </p>
                                )}
                            </div>

                            {/* Marketing CTA Banner */}
                            <div className='relative mt-12 overflow-hidden rounded-3xl bg-linear-to-br from-[#0C4C55] to-[#08353B] p-8 text-center text-white shadow-xl'>
                                <div className='absolute -top-24 -right-24 h-48 w-48 animate-pulse rounded-full bg-cyan-400/20 blur-3xl'></div>
                                <div className='relative z-10'>
                                    <h3 className='mb-3 text-2xl font-bold'>Stop guessing. Track their health.</h3>
                                    <p className='mx-auto mb-8 max-w-md text-gray-200'>
                                        Monitor your pet&apos;s exact weight, daily routines, and medical history
                                        instantly with the Vet Record App.
                                    </p>
                                    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                                        <a
                                            href={APP_LINKS.GOOGLE_PLAY}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='transition hover:scale-105 active:scale-95'
                                            onClick={() => {
                                                (window as any).gtag?.('event', 'click_play_store', { 'page_path': window.location.pathname });
                                            }}>
                                            <img
                                                src='/images/download/googleplay.png'
                                                alt='Get it on Google Play'
                                                className='h-12 w-auto'
                                            />
                                        </a>
                                        <a
                                            href={APP_LINKS.APP_STORE}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='transition hover:scale-105 active:scale-95'
                                            onClick={() => {
                                                (window as any).gtag?.('event', 'click_app_store', { 'page_path': window.location.pathname });
                                            }}>
                                            <img
                                                src='/images/download/appstore.png'
                                                alt='Download on the App Store'
                                                className='h-12 w-auto'
                                            />
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
