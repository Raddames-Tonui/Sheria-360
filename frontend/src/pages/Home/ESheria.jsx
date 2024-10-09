import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast"; 

const ESheria = () => {
  const { token } = useContext(AuthContext); 
  const [redirectTo, setRedirectTo] = React.useState(null);

  const handleDocumentClick = () => {
    if (!token) {
      toast.error("Please login to access the contents!"); 
      setRedirectTo('/auth/login'); 
    } else {
      setRedirectTo('/sheria/search-docs'); 
    }
  };

  // If redirectTo is set, redirect the user
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="font-sans mt-4 mx-4">
      {/* Hero Section */}
      <section className="mt-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold ">
            Legal Documents Made Easy for Everyone
          </h1>
          <p className="text-gray-600 mt-4">
            Download and print your customised legal documents in under 5 minutes.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <img src="/svgs/experience.svg" alt="Step 1 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Search for Document</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Search category and name of your document.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <img src="/svgs/contact-info.svg" alt="Step 2 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Preview & Pay</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Confirm that you have put the correct details and pay.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <img src="/svgs/visibility.svg" alt="Step 3 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Download & Print</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Download your document and print it.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <img src="/svgs/profile-photo.svg" alt="Step 4 Icon" />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">Sign it & make it legal</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Sign your document and have it witnessed if necessary.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={handleDocumentClick} 
              className="mt-8 bg-lime-600 hover:bg-lime-700 text-white font-bold px-8 py-5 rounded-md"
            >
              View All Documents
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESheria;
