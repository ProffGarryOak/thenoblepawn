import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the new model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const itemData = {
      name: formData.get('name'),
      category: formData.get('category'),
      condition: formData.get('condition'),
      description: formData.get('description'),
      history: formData.get('history'),
      source: formData.get('source'),
      priceSuggestion: formData.get('priceSuggestion'),
      authenticityProof: formData.get('authenticityProof'),
    };

    // Get images
    const imageFiles = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'images') {
        imageFiles.push(value);
      }
    }

    // Use the new Gemini model (e.g., gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare prompts
    const authenticityPrompt = `
      Analyze this item for authenticity based on the provided information and images, this is just a rough idea for the user, it will be sent to professional appraisal so just judge on what data user gave, if user mentions anything like  Description: 
      - History: 
      - Source: 
      - Authenticity Proof: , trust that for now. keep response like a profesion pawn shop owner would, not like a lawyer.
       Return your answer as a JSON object with the following fields: assessment, confidence, indicators (array), redFlags (array), summary.
      Example:
      {
        "assessment": "Likely reproduction",
        "confidence": 95,
        "indicators": ["Style and craftsmanship ...", "Material ..."],
        "redFlags": ["Lack of provenance ...", "Image quality ..."],
        "summary": "In summary, ..."
      }
      
      Information:
      - Name: ${itemData.name}
      - Category: ${itemData.category}
      - Condition: ${itemData.condition}
      - Description: ${itemData.description}
      - History: ${itemData.history || 'Not provided'}
      - Source: ${itemData.source || 'Not provided'}
      - Authenticity Proof: ${itemData.authenticityProof || 'Not provided'}
    `;

    const valuationPrompt = `
      Estimate the market value range for this item.  keep response like a profesional pawn shop owner would, not like a lawyer.Return your answer as a JSON object with the following fields: lowEstimate, highEstimate, factors (array), summary.
      Example:
      {
        "lowEstimate": 50,
        "highEstimate": 500,
        "factors": ["Authenticity ...", "Material ..."],
        "summary": "In conclusion, ..."
      }
      
      Information:
      - Name: ${itemData.name}
      - Category: ${itemData.category}
      - Condition: ${itemData.condition}
      - Description: ${itemData.description}
      - Seller's suggested price: ${itemData.priceSuggestion}
    `;

    // Process images and text with Gemini
    const imageParts = await Promise.all(
      imageFiles.slice(0, 4).map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          inlineData: {
            data: Buffer.from(buffer).toString('base64'),
            mimeType: file.type,
          },
        };
      })
    );

    // Get authenticity analysis
    const authenticityResult = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: authenticityPrompt },
            ...imageParts,
          ],
        },
      ],
    });

    const valuationResult = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: valuationPrompt },
            ...imageParts,
          ],
        },
      ],
    });

    let authenticityJson, valuationJson;
    const parseGeminiJson = (text) => {
      if (!text) return {};
      const cleaned = text.trim().replace(/^```json|^```|```$/g, '').trim();
      try {
        return JSON.parse(cleaned);
      } catch {
        return { summary: text };
      }
    };
    const authenticityText = await authenticityResult.response.text();
    const valuationText = await valuationResult.response.text();
    authenticityJson = parseGeminiJson(authenticityText);
    valuationJson = parseGeminiJson(valuationText);

    console.log('Gemini Authenticity Response:', authenticityJson);
    console.log('Gemini Valuation Response:', valuationJson);

    return NextResponse.json({
      success: true,
      analysis: {
        authenticity: authenticityJson,
        valuation: valuationJson,
      },
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

// This code 