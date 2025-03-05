'use client';

import Image from 'next/image';

import { Eye, Feather, Heart, Monitor, Smartphone, UserCheck } from 'lucide-react';

export function FeatureSection() {
    return (
        <div className='relative'>
            <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h6 className='mb-3 text-sm font-bold tracking-wider text-red-500 uppercase'>Features</h6>
                    <h4 className='font-bebas mb-6 text-2xl leading-normal font-bold md:text-3xl md:leading-normal'>
                        Your Ultimate Pet Care Companion
                    </h4>
                    <p className='mx-auto max-w-xl text-slate-400'>
                        Looking for a smarter way to manage your pet's health and wellness? Vet Record is the complete
                        pet care organizer that puts your furry friend's health records at your fingertips.
                    </p>
                </div>

                <div className='mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-12 lg:grid-cols-12'>
                    <div className='order-2 md:col-span-6 lg:order-1 lg:col-span-4'>
                        <div className='grid grid-cols-1 gap-6'>
                            <div className='group flex duration-500 xl:p-3'>
                                <div className='order-1 mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white md:order-2 dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <Monitor className='size-5' />
                                </div>
                                <div className='order-2 ms-4 flex-1 md:order-1 md:ms-0 md:me-4 md:text-end'>
                                    <h4 className='mb-0 text-lg font-semibold'>Complete Health Monitoring</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Track all aspects of your pet's health and wellness with detailed medical
                                        records and analytics
                                    </p>
                                </div>
                            </div>

                            <div className='group flex duration-500 xl:p-3'>
                                <div className='order-1 mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white md:order-2 dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <Feather className='size-5' />
                                </div>
                                <div className='order-2 ms-4 flex-1 md:order-1 md:ms-0 md:me-4 md:text-end'>
                                    <h4 className='mb-0 text-lg font-semibold'>Smart Vaccination Management</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Never miss important pet immunizations with our intelligent vaccination tracking
                                        system
                                    </p>
                                </div>
                            </div>

                            <div className='group flex duration-500 xl:p-3'>
                                <div className='order-1 mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white md:order-2 dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <Eye className='size-5' />
                                </div>
                                <div className='order-2 ms-4 flex-1 md:order-1 md:ms-0 md:me-4 md:text-end'>
                                    <h4 className='mb-0 text-lg font-semibold'>Medication Tracking System</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Set up pet medicine reminders and manage treatment schedules effortlessly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='order-1 md:col-span-12 lg:order-2 lg:col-span-4 lg:mx-4'>
                        <Image
                            src='/images/smartframe.png'
                            alt='Vet Record App Interface'
                            width={400}
                            height={800}
                            className='mx-auto'
                        />
                    </div>

                    <div className='order-3 md:col-span-6 lg:col-span-4'>
                        <div className='grid grid-cols-1 gap-6'>
                            <div className='group flex duration-500 xl:p-3'>
                                <div className='mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <UserCheck className='size-5' />
                                </div>
                                <div className='ms-4 flex-1'>
                                    <h4 className='mb-0 text-lg font-semibold'>Digital Vet Records</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Store and access complete pet medical history instantly from anywhere
                                    </p>
                                </div>
                            </div>

                            <div className='group flex duration-500 xl:p-3'>
                                <div className='mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <Smartphone className='size-5' />
                                </div>
                                <div className='ms-4 flex-1'>
                                    <h4 className='mb-0 text-lg font-semibold'>Intelligent Pet Care Alerts</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Get timely notifications for vaccinations, medications, and important pet care
                                        reminders
                                    </p>
                                </div>
                            </div>

                            <div className='group flex duration-500 xl:p-3'>
                                <div className='mt-1 flex size-16 items-center justify-center rounded-2xl bg-red-500/5 align-middle text-2xl text-red-500 shadow-sm duration-500 group-hover:bg-red-500 group-hover:text-white dark:bg-red-500/10 dark:shadow-gray-800'>
                                    <Heart className='size-5' />
                                </div>
                                <div className='ms-4 flex-1'>
                                    <h4 className='mb-0 text-lg font-semibold'>Multi-Device Access</h4>
                                    <p className='mt-3 text-slate-400'>
                                        Access your pet's health records from any device with real-time cloud
                                        synchronization
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
