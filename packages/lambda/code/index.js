// Constants

/**
 * Generic retry helper with exponential backoff
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @param {number} retries - Number of retry attempts
 * @param {number} backoffMs - Initial backoff delay in milliseconds
 * @returns {Promise<Response>} The fetch response
 */
async function fetchWithRetry(url, options, retries = 3, backoffMs = 500) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${await response.text()}`);
      }

      return response;
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err.message);

      if (attempt < retries) {
        const delay = backoffMs * Math.pow(2, attempt);
        console.log(`Retrying in ${delay} ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
}

/**
 * Main Lambda handler
 * @param {object} event - AWS Lambda event
 * @returns {Promise<object>} Response object
 */
exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));

  // Validate environment variables
  const API_ENDPOINT = process.env.API_ENDPOINT;
  if (!API_ENDPOINT) {
    throw new Error("API_ENDPOINT environment variable is required");
  }

  const detail = event.detail || {};
  const bucket = detail.bucket?.name;
  const key = detail.object?.key;

  if (!bucket || !key) {
    const error = "Bucket or key missing from event";
    console.error(error, { bucket, key });
    // For event-driven Lambda, log and return - don't throw unless you want retries
    return { 
      status: "skipped", 
      reason: error,
      details: { bucket: !!bucket, key: !!key }
    };
  }

  // Use the S3 key as the document reference
  const documentReference = key;

  // Build payload
  const payload = {
    documentStorageType: "s3",
    documentReference,
  };

  console.log("Calling API with payload:", payload);

  // Call API with fetch
  try {
    const response = await fetchWithRetry(API_ENDPOINT, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.text();
    console.log("API Response:", response.status, body);
    
    return { 
      status: "success",
      documentReference,
      message: "Document processing completed successfully"
    };
  } catch (err) {
    console.error("All retries failed. Could not call API:", err.message);
    // Throw error to trigger Lambda retry mechanism for critical failures
    throw new Error(`API call failed after retries: ${err.message}`);
  }
};
