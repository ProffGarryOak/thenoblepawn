export default function SellSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 bg-gradient-to-br from-[#f5e9d7] to-[#e6d3b3]">
      <div className="bg-white/90 rounded-xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-[#c9b37c]">
        <svg
          className="mx-auto mb-5 h-20 w-20 text-[#c9b37c]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-extrabold mb-3 text-[#7c6a3c] font-serif tracking-tight">
          Submission Successful!
        </h1>
        <p className="text-[#5a4a1b] mb-8 text-lg font-medium">
          Your item has been submitted for appraisal.
          <br />
          Our team will review your submission and notify you once the process is
          complete.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-[#c9b37c] hover:bg-[#bfa76a] text-white font-bold py-2 px-8 rounded-full shadow transition-colors duration-200 text-lg"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
