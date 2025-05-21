import Vapi from "@vapi-ai/web";

export const loadVapiEnvs = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY,
    assistantKey: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
  };
};

const vapiKeys = loadVapiEnvs();
export const vapi = new Vapi(vapiKeys.apiKey as string);
