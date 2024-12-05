import { AppError } from "./AppError";

export const replacePlaceholders = (html: string, placeholders: { [key: string]: string }) => {
    try {
        let updatedHtml = html;
        for (const key in placeholders) {
            if (placeholders.hasOwnProperty(key)) {
                updatedHtml = updatedHtml.replace(new RegExp(key, 'g'), placeholders[key]);
            }
        }
        return updatedHtml;
    } catch (error) {
        throw new AppError("something went wrong" + error, 400)
    }
};
