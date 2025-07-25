# The Noble Pawn

AI-powered Digital Pawn Shop Marketplace

## Features
- Upload and sell second-hand, vintage, or collectible items
- AI-powered authentication and price suggestion (Gemini API)
- Admin approval and commission system
- Stripe payments for appraisal and purchases
- Cloudinary image uploads
- Clerk authentication
- Royal & vintage themed UI (TailwindCSS)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_URL=your_gemini_api_url
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Visit** `http://localhost:3000` to view the app.

---

## Directory Structure
- `/app` – Next.js App Router pages
- `/components` – Reusable UI components
- `/lib` – Utility functions (AI, Stripe, Cloudinary, etc.)
- `/models` – Mongoose schemas
- `/styles` – Tailwind config, custom CSS

---

## Tech Stack
- Next.js, React, TailwindCSS, Framer Motion
- MongoDB, Mongoose
- Clerk (auth)
- Stripe (payments)
- Cloudinary (images)
- Gemini API (AI)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   t h e n o b l e p a w n  
 