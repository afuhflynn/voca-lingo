import Vapi from "@vapi-ai/web";
import { assistantOptions } from "./vapi.config";
import { config } from "dotenv";

config();

// Initialize Vapi with your API key
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string);
