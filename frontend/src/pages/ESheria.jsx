import React from "react";

const ESheria = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Legal Documents Made for Everyone
          </h1>
          <p className="text-gray-600 mt-4">
            Download and print your customised legal documents in under 5
            minutes.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              className="w-1/3 px-4 py-2 border rounded-l-md focus:outline-none"
              placeholder="Search..."
            />
            <button className="bg-green-500 text-white px-6 py-2 rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Step 1 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Complete a questionnaire</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Input the details needed in your document.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Step 2 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Preview & Pay</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Confirm that you have put the correct details and pay.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Step 3 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Download & Print</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Download your document and print it.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Step 4 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Sign it & make it legal</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Sign your document and have it witnessed if necessary.
              </p>
            </div>
          </div>

          <button className="mt-8 bg-green-500 text-white px-6 py-2 rounded-md">
            View All Documents
          </button>
        </div>
      </section>
    </div>
  );
};

export default ESheria;
