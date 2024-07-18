import crypto from "crypto";

export const generateSignature = () => {
    return crypto
        .createHmac("sha256", process.env.REACT_APP_MAILUI_SECRET || "")
        .update(process.env.REACT_APP_MAILUI_PROJECT_ID || "")
        .digest("hex");
};