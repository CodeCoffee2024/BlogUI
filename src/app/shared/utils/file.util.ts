import { environment } from "../../../../environment";

export function getImage(str: string): string {
    return environment.folderPath + str;
}