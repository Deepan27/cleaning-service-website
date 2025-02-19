import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Clock,
  Home,
  MapPin,
  CheckCircle2,
  Star,
  X,
  Sparkles,
  Shield,
  Leaf
} from 'lucide-react';

export default function CleaningServiceApp() {
  const [currentView, setCurrentView] = useState('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [showInvoice, setShowInvoice] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    frequency: 'one-time'
  });

  const serviceTypes = [
    {
      value: "residential",
      label: "Residential Cleaning",
      price: 150,
      description: "Perfect for homes and apartments",
      icon: Home
    },
    {
      value: "commercial",
      label: "Commercial Cleaning",
      price: 300,
      description: "Ideal for offices and retail spaces",
      icon: MapPin
    },
    {
      value: "deep",
      label: "Deep Cleaning",
      price: 400,
      description: "Thorough cleaning of all spaces",
      icon: Star
    }
  ];

  const frequencies = [
    { value: "one-time", label: "One-time Service", discount: 0 },
    { value: "weekly", label: "Weekly Service 15% OFF", discount: 15 },
    { value: "bi-weekly", label: "Bi-weekly Service 10% OFF", discount: 10 },
    { value: "monthly", label: "Monthly Service 5% OFF", discount: 5 }
  ];

  const timeSlots = [
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
    { value: "16:00", label: "04:00 PM" }
  ];

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1 && !formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (currentStep === 2) {
      if (!formData.date) {
        newErrors.date = "Please select a date";
      }
      if (!formData.time) {
        newErrors.time = "Please select a time slot";
      }
    }

    if (currentStep === 3) {
      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = "Please enter a valid name";
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone || !/^\+?[0-9]{10,14}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
      if (!formData.address || formData.address.trim().length < 5) {
        newErrors.address = "Please enter a valid address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const service = serviceTypes.find(s => s.value === formData.serviceType);
    const frequency = frequencies.find(f => f.value === formData.frequency);
    if (!service || !frequency) return 0;
    return service.price * (1 - frequency.discount / 100);
  };

  const resetForm = () => {
    setCurrentView('home');
    setCurrentStep(1);
    setShowInvoice(false);
    setErrors({});
    setFormData({
      serviceType: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      frequency: 'one-time'
    });
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 3) {
        setShowInvoice(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const Header = () => (
    <div className="bg-white shadow-sm p-4 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={resetForm}
          className="text-2xl font-bold text-emerald-600 flex items-center gap-2"
        >
          <Home className="w-6 h-6" />
          CleanCo
        </button>
        {currentView === 'booking' && (
          <button
            onClick={() => setCurrentView('home')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="space-y-16">
      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6 px-4">
          <h1 className="text-5xl font-extrabold mb-4">Transform Your Space, Elevate Your Life</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90 mb-8">
            Professional cleaning services that go beyond surface-level cleanliness. Experience the perfect blend of precision, care, and convenience.
          </p>
          <button
            onClick={() => setCurrentView('booking')}
            className="bg-white text-emerald-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your Cleaning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <Sparkles className="w-12 h-12 text-emerald-600 mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Exceptional Quality</h3>
          <p className="text-gray-600">Our trained professionals use advanced techniques and eco-friendly products to deliver unparalleled cleaning results.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <Shield className="w-12 h-12 text-emerald-600 mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Fully Insured</h3>
          <p className="text-gray-600">Complete peace of mind with our comprehensive insurance coverage for all cleaning services.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <Leaf className="w-12 h-12 text-emerald-600 mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Eco-Friendly</h3>
          <p className="text-gray-600">We prioritize environmentally responsible cleaning methods that are safe for your home and the planet.</p>
        </div>
      </div>
    </div>
  );

  const InvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={() => setShowInvoice(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="text-center border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900">Booking Confirmation</h2>
            <p className="text-gray-600">Thank you for choosing our service!</p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{formData.phone}</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">
                {serviceTypes.find(s => s.value === formData.serviceType)?.label}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Frequency:</span>
              <span className="font-medium">
                {frequencies.find(f => f.value === formData.frequency)?.label}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formData.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">
                {timeSlots.find(t => t.value === formData.time)?.label}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>RM {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4">
        {showInvoice && <InvoiceModal />}
        {currentView === 'home' ? (
          <HomePage />
        ) : (
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="flex justify-between items-center">
              {['Service', 'Schedule', 'Details'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                    ${currentStep > index + 1 ? 'bg-emerald-500 border-emerald-500 text-white' :
                      currentStep === index + 1 ? 'border-emerald-500 text-emerald-500' :
                        'border-gray-300 text-gray-300'}`}
                  >
                    {index + 1}
                  </div>
                  <span className={`ml-2 ${currentStep === index + 1 ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.value}
                      onClick={() => setFormData({ ...formData, serviceType: service.value })}
                      className={`cursor-pointer p-6 rounded-xl border-2
                        ${formData.serviceType === service.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'}`}
                    >
                      <service.icon className="w-8 h-8 text-emerald-500 mb-4" />
                      <h3 className="font-semibold mb-2">{service.label}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <p className="font-bold text-emerald-600">RM {service.price}</p>
                    </div>
                  ))}
                  {errors.serviceType && (
                    <div className="col-span-full text-red-500 text-sm mt-2">
                      {errors.serviceType}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className={`w-full p-3 border rounded-lg ${errors.date ? 'border-red-500' : ''}`}
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select
                      className={`w-full p-3 border rounded-lg ${errors.time ? 'border-red-500' : ''}`}
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      placeholder="Address"
                      className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : ''}`}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select
                      className="w-full p-3 border rounded-lg"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    >
                      {frequencies.map((freq) => (
                        <option key={freq.value} value={freq.value}>
                          {freq.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-end mt-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="mr-2 px-6 py-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {currentStep === 3 ? 'Review & Confirm' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
