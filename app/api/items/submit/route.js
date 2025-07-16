import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Item from '@/models/item';

export const POST = async (request) => {
  try {
    await connectToDB();
    const formData = await request.formData();

    // Extract text fields
    const itemData = {
      name: formData.get('name'),
      category: formData.get('category'),
      condition: formData.get('condition'),
      description: formData.get('description'),
      history: formData.get('history') || undefined,
      source: formData.get('source') || undefined,
      // Set price field from priceSuggestion
      price: parseFloat(formData.get('priceSuggestion')),
      authenticityProof: formData.get('authenticityProof') || undefined,
      aiAnalysis: JSON.parse(formData.get('aiAnalysis')),
      // Store seller as Clerk user ID string (schema should be updated if needed)
      seller: formData.get('userId'),
      status: 'pending',
    };

    // Remove priceSuggestion as it's no longer needed in itemData
    delete itemData.priceSuggestion;

    // Process images
    const imageFiles = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'images') {
        imageFiles.push(value);
      }
    }

    // Upload images to storage (e.g., Cloudinary, S3)
    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        // In a real app, you would upload to your storage service here
        // This is a mock implementation
        return {
          url: `https://example.com/uploads/${Date.now()}-${file.name}`,
          isPrimary: false,
        };
      })
    );

    // Mark first image as primary
    if (uploadedImages.length > 0) {
      uploadedImages[0].isPrimary = true;
    }

    // Create new item
    const newItem = new Item({
      ...itemData,
      images: uploadedImages,
    });

    await newItem.save();

    // In a real app, you might:
    // 1. Notify admin about new submission
    // 2. Add to queue for manual verification
    // 3. Charge authentication fee

    return NextResponse.json(
      { success: true, itemId: newItem._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};