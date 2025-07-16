'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

export default function SellPage() {
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    description: '',
    history: '',
    source: '',
    priceSuggestion: '',
    authenticityProof: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files.slice(0, 10 - images.length)]; // Limit to 10 images
    setImages(newImages);

    const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const getAiAnalysis = async () => {
    if (!userId) {
      router.push('/sign-in');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getToken();
      const formDataToSend = new FormData();
      
      images.forEach(image => formDataToSend.append('images', image));
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post('/api/ai/analyze', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setAiAnalysis(response.data);
      setStep(3);
    } catch (error) {
      console.error('AI analysis failed:', error);
      alert(error.response?.data?.error || 'AI analysis failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForAppraisal = async () => {
    if (!userId) {
      router.push('/sign-in');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getToken();
      const formDataToSend = new FormData();
      
      images.forEach(image => formDataToSend.append('images', image));
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('aiAnalysis', JSON.stringify(aiAnalysis));
      formDataToSend.append('userId', userId);

      await axios.post('/api/items/submit', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/sell/success');
    } catch (error) {
      console.error('Submission failed:', error);
      alert(error.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f4e8]">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-2 text-[#4a0f0f]">Sell Your Treasure</h1>
            <p className="text-lg text-[#4a0f0f] font-playfair">
              {step === 1 && "Tell us about your item"}
              {step === 2 && "Review your submission"}
              {step === 3 && "AI Analysis Results"}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-cinzel text-lg font-bold border-2 ${
                      step === stepNumber
                        ? 'bg-[#d4af37] text-[#4a0f0f] border-[#d4af37]'
                        : step > stepNumber
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-gray-200 text-gray-600 border-gray-300'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span className="text-xs mt-2 text-gray-500 font-playfair">
                    {stepNumber === 1 && 'Details'}
                    {stepNumber === 2 && 'Review'}
                    {stepNumber === 3 && 'Analysis'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                <div
                  className="h-1 bg-[#d4af37] transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Step 1: Item Details */}
          {step === 1 && (
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-[#d4af37]/30">
              <div className="mb-6">
                <h2 className="text-xl font-cinzel text-[#4a0f0f] mb-4">Item Photos</h2>
                <div className="border-2 border-dashed border-[#d4af37] rounded-lg p-4 bg-[#f8f4e8]">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded border-2 border-[#d4af37]/40"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer bg-[#f0d700]/10 hover:bg-[#d4af37]/20 text-[#4a0f0f] py-2 px-4 rounded inline-block font-playfair border border-[#d4af37] transition">
                    <span>+ Add Photos</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2 font-playfair">
                    Upload clear photos from multiple angles (max 10 photos)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Watches">Watches</option>
                      <option value="Collectibles">Collectibles</option>
                      <option value="Art">Art</option>
                      <option value="Antiques">Antiques</option>
                      <option value="Electronics">Vintage Electronics</option>
                      <option value="Memorabilia">Memorabilia</option>
                      <option value="Coins">Coins & Currency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                      Condition *
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="Mint">Mint</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                    required
                    placeholder="Include details like materials, measurements, markings, etc."
                  />
                </div>

                <div>
                  <label htmlFor="history" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Item History (Optional)
                  </label>
                  <textarea
                    id="history"
                    name="history"
                    rows={3}
                    value={formData.history}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                    placeholder="How did you acquire this item? Any known provenance?"
                  />
                </div>

                <div>
                  <label htmlFor="source" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Source (Optional)
                  </label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                    placeholder="Where was this item purchased/found?"
                  />
                </div>

                <div>
                  <label htmlFor="priceSuggestion" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Your Price Suggestion *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-[#d4af37] sm:text-sm font-bold">$</span>
                    </div>
                    <input
                      type="number"
                      id="priceSuggestion"
                      name="priceSuggestion"
                      value={formData.priceSuggestion}
                      onChange={handleChange}
                      className="focus:ring-[#d4af37] focus:border-[#d4af37] block w-full pl-7 pr-12 sm:text-sm border-[#d4af37] rounded-md py-2 px-3 font-playfair"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="authenticityProof" className="block text-sm font-cinzel text-[#4a0f0f] mb-1">
                    Proof of Authenticity (Optional)
                  </label>
                  <textarea
                    id="authenticityProof"
                    name="authenticityProof"
                    rows={3}
                    value={formData.authenticityProof}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-[#d4af37] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-playfair"
                    placeholder="Certificates, receipts, or other documentation"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.category || !formData.condition || !formData.description || !formData.priceSuggestion || images.length === 0}
                  className="bg-[#d4af37] hover:bg-[#bfa133] text-[#4a0f0f] font-bold py-2 px-8 rounded font-cinzel transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review Submission */}
          {step === 2 && (
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-[#d4af37]/30">
              <h2 className="text-xl font-cinzel text-[#4a0f0f] mb-6">Review Your Submission</h2>
              <div className="mb-8">
                <h3 className="text-md font-cinzel text-[#d4af37] mb-3">Item Photos</h3>
                <div className="flex flex-wrap gap-4">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded border-2 border-[#d4af37]/40"
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-playfair">Item Name</p>
                  <p className="font-medium font-cinzel text-[#4a0f0f]">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-playfair">Category</p>
                  <p className="font-medium font-cinzel text-[#4a0f0f]">{formData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-playfair">Condition</p>
                  <p className="font-medium font-cinzel text-[#4a0f0f]">{formData.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-playfair">Your Price Suggestion</p>
                  <p className="font-medium font-cinzel text-[#4a0f0f]">${formData.priceSuggestion}</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 font-playfair">Description</p>
                <p className="font-medium font-playfair whitespace-pre-line text-[#4a0f0f]">{formData.description}</p>
              </div>
              {formData.history && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-playfair">Item History</p>
                  <p className="font-medium font-playfair whitespace-pre-line text-[#4a0f0f]">{formData.history}</p>
                </div>
              )}
              {formData.source && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-playfair">Source</p>
                  <p className="font-medium font-playfair text-[#4a0f0f]">{formData.source}</p>
                </div>
              )}
              {formData.authenticityProof && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-playfair">Proof of Authenticity</p>
                  <p className="font-medium font-playfair whitespace-pre-line text-[#4a0f0f]">{formData.authenticityProof}</p>
                </div>
              )}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-8 rounded font-cinzel"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={getAiAnalysis}
                  disabled={isSubmitting}
                  className="bg-[#d4af37] hover:bg-[#bfa133] text-[#4a0f0f] font-bold py-2 px-8 rounded font-cinzel transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
                >
                  {isSubmitting ? 'Analyzing...' : 'Get AI Analysis'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: AI Analysis */}
          {step === 3 && aiAnalysis && (
  <div className="bg-amber-50 shadow-lg rounded-lg p-6 border border-amber-200">
    <h2 className="text-2xl font-cinzel font-bold text-maroon-800 mb-6 border-b border-amber-300 pb-2">
      Royal Authentication Results
    </h2>
    
    {(() => {
      const parseMaybeJson = (val) => {
        if (!val) return null;
        if (typeof val === 'object') return val;
        const cleaned = val.trim().replace(/^```json|^```|```$/g, '').trim();
        try {
          return JSON.parse(cleaned);
        } catch {
          return null;
        }
      };
      
      const authenticity = parseMaybeJson(aiAnalysis.analysis?.authenticity) || {};
      const valuation = parseMaybeJson(aiAnalysis.analysis?.valuation) || {};
      
      return (
        <>
          {/* Authenticity Assessment */}
          {authenticity && (
            <div className="mb-6 p-5 bg-white rounded-lg border-2 border-emerald-800 shadow-md">
              <div className="flex items-center mb-3">
                <div className="bg-emerald-800 text-gold-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-emerald-900">Royal Seal of Authenticity</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
                  <p className="text-sm font-playfair text-amber-800">Verdict</p>
                  <p className="text-lg font-cinzel font-semibold capitalize text-emerald-900">
                    {authenticity.assessment || 'Under Review'}
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
                  <p className="text-sm font-playfair text-amber-800">Confidence</p>
                  <div className="flex items-center">
                    <div className="w-full bg-amber-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-emerald-700 h-2.5 rounded-full" 
                        style={{ width: `${authenticity.confidence || 0}%` }}
                      ></div>
                    </div>
                    <span className="font-playfair text-emerald-900">{authenticity.confidence ?? 'N/A'}%</span>
                  </div>
                </div>
              </div>

              {Array.isArray(authenticity.indicators) && authenticity.indicators.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-playfair font-semibold text-emerald-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Indicators
                  </h4>
                  <ul className="space-y-2">
                    {authenticity.indicators.map((indicator, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-playfair text-gray-700">{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(authenticity.redFlags) && authenticity.redFlags.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-playfair font-semibold text-red-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Royal Inspector&apos;s Notes
                  </h4>
                  <ul className="space-y-2">
                    {authenticity.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-playfair text-gray-700">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {authenticity.summary && (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-cinzel font-semibold text-emerald-800 mb-2">Royal Authentication Summary</h4>
                  <p className="font-playfair italic text-gray-700">{authenticity.summary}</p>
                </div>
              )}
            </div>
          )}

          {/* Valuation Assessment */}
          {valuation && (
            <div className="mb-6 p-5 bg-white rounded-lg border-2 border-amber-700 shadow-md">
              <div className="flex items-center mb-3">
                <div className="bg-amber-700 text-gold-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-amber-900">Royal Appraisal</h3>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl font-cinzel font-bold text-amber-800">
                  ${valuation.lowEstimate?.toLocaleString?.() ?? 'N/A'} - ${valuation.highEstimate?.toLocaleString?.() ?? 'N/A'}
                </div>
                {formData.priceSuggestion && (
                  <div className="text-sm font-playfair bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    <span className="font-semibold text-amber-800">Your suggestion:</span> 
                    <span className="ml-1 text-amber-900">${parseFloat(formData.priceSuggestion).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-playfair font-semibold text-amber-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Valuation Factors
                  </h4>
                  <ul className="space-y-2">
                    {Array.isArray(valuation.factors) && valuation.factors.map((factor, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-playfair text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {valuation.summary && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-cinzel font-semibold text-amber-800 mb-2">Royal Appraiser&apos;s Notes</h4>
                    <p className="font-playfair italic text-gray-700">{valuation.summary}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      );
    })()}

    {/* Recommendations */}
    {aiAnalysis.recommendations && (
      <div className="mb-6 p-5 bg-white rounded-lg border-2 border-maroon-700 shadow-md">
        <div className="flex items-center mb-3">
          <div className="bg-maroon-700 text-gold-100 p-2 rounded-full mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-cinzel font-semibold text-maroon-800">Royal Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          {aiAnalysis.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start">
              <div className="bg-maroon-100 text-maroon-800 p-1 rounded-full mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-playfair text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="mt-8 flex justify-between">
      <button
        type="button"
        onClick={() => setStep(2)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-cinzel font-bold py-2 px-6 rounded border border-gray-300 transition"
      >
        Back
      </button>
      <button
        type="button"
        onClick={submitForAppraisal}
        disabled={isSubmitting}
        className="bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-cinzel font-bold py-2 px-6 rounded border border-maroon-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting to Royal Court...
          </span>
        ) : (
          'Submit for Royal Appraisal'
        )}
      </button>
    </div>
  </div>
)}
        </div>
      </main>
    </div>
  );
}