export const loadVapiEnvs = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY,
    assistantKey: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
  };
};
