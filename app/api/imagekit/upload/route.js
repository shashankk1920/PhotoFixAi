// .env.local configuration for ImageKit:
// NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY=public_G0pXH1nYcIwr144kSi95vTWbY8k=
// IMAGE_KIT_PRIVATE_KEY=private_4A0/dyJ3e6fhmrm35Gqw/27ATeU=
// NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT=https://ik.imagekit.io/0yr4cgf3w

import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY, // should be 'public_G0pXH1nYcIwr144kSi95vTWbY8k='
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, // should be 'private_4A0/dyJ3e6fhmrm35Gqw/27ATeU='
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT, // should be 'https://ik.imagekit.io/0yr4cgf3w'
});
console.log("ImageKit keys loaded:", {
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ? "[SET]" : "[MISSING]",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT
});






export async function POST(request) {
  console.log("[ImageKit Upload] Incoming request at", new Date().toISOString());
  console.log("Request headers:", request.headers);
  try {
      console.log("[ImageKit] POST handler called");
    console.log("IMAGE_KIT_PRIVATE_KEY:", process.env.IMAGE_KIT_PRIVATE_KEY);
    console.log("NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY:", process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY);
    console.log("NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT:", process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT);
      console.log("Step 1: Checking environment variables...");

    if (!process.env.IMAGE_KIT_PRIVATE_KEY) {
      console.error("Missing IMAGE_KIT_PRIVATE_KEY env variable");
      return Response.json({ error: "Missing IMAGE_KIT_PRIVATE_KEY env variable" }, { status: 500 });
    }

    let userId = null;
    try {
      const authResult = await auth();
      userId = authResult?.userId;
        console.log("Authenticated userId:", userId);
    } catch (authError) {
      console.error("Auth error:", authError);
      return Response.json({ error: "Auth error", details: authError.message }, { status: 500 });
    }
    if (!userId) {
      console.error("Unauthorized: No userId");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
      console.log("Step 2: Authenticating user...");

    let formData, file, fileName;
    try {
      formData = await request.formData();
      file = formData.get("file");
      fileName = formData.get("fileName");
        console.log("FormData file:", file);
        console.log("FormData fileName:", fileName);
    } catch (formError) {
      console.error("FormData error:", formError);
      return Response.json({ error: "FormData error", details: formError.message }, { status: 400 });
    }

    if (!file || !fileName) {
      console.error("Missing file or fileName");
      return Response.json({ error: "Missing file or fileName" }, { status: 400 });
    }
      console.log("Step 3: Parsing form data...");

    let buffer;
    try {
      const bytes = await file.arrayBuffer();
      buffer = Buffer ? Buffer.from(bytes) : new Uint8Array(bytes);
        console.log("Buffer created, length:", buffer.length);
    } catch (bufferError) {
      console.error("Buffer error:", bufferError);
      return Response.json({ error: "Buffer error", details: bufferError.message }, { status: 500 });
    }

    const timestamp = Date.now();
    const sanitizedFileName = fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;
      console.log("Step 4: Converting file to buffer...");

    let uploadResponse;
    try {
      console.log("[ImageKit] Attempting upload...");
      console.log("Upload params:", {
        fileType: typeof buffer,
        fileLength: buffer.length,
        fileName: uniqueFileName,
        folder: "/projects",
        publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY,
        privateKeySet: !!process.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT
      });
      uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: uniqueFileName,
        folder: "/projects",
      });
      console.log("ImageKit upload response:", uploadResponse);
    } catch (uploadError) {
      console.error("ImageKit upload error:", uploadError);
      if (uploadError && uploadError.response) {
        console.error("ImageKit error response:", uploadError.response.data);
      }
      return Response.json({ error: "ImageKit upload error", details: uploadError.message }, { status: 500 });
    }

    let thumbnailUrl = null;
    try {
      thumbnailUrl = imagekit.url({
        src: uploadResponse.url,
        transformation: [
          {
            width: 400,
            height: 300,
            cropMode: "maintain_ar",
            quality: 80,
          },
        ],
      });
        console.log("Thumbnail URL:", thumbnailUrl);
    } catch (thumbError) {
      console.error("Thumbnail error:", thumbError);
      thumbnailUrl = null;
    }

      console.log("Step 5: Preparing upload parameters...");
    return Response.json({
      success: true,
      url: uploadResponse.url,
      thumbnailUrl: thumbnailUrl,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name,
    });
  } catch (error) {
      console.error("Unknown error in POST handler:", error);
    // Fallback: always return JSON
    console.error("Unknown error:", error);
    return Response.json(
      {
        success: false,
        error: "Unknown error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}


