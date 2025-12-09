'use client';

import { useEffect } from 'react';

export default function TestDouladeskPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://forms.mydouladesk.com/widget.js?tenant=aurora-media';
    script.setAttribute('data-form-id', 'birth-doula-form');
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 py-20">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6">
          Get In Touch
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl font-light">
          We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </section>

      {/* Widget Container */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div id="douladesk-form-container"></div>
      </section>

      {/* Gallery Text Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
            Explore our collection of work and see what we&apos;ve been up to. From creative projects to client collaborations,
            discover the stories behind our portfolio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gallery Item 1</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gallery Item 2</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gallery Item 3</p>
          </div>
        </div>
      </section>
    </div>
  );
}
