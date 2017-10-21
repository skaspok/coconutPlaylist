import { SafeResourceUrl } from "@angular/platform-browser";

export interface SanitizableDeezerObject {
    deezerRef?: string;
    sanitizedUrl: SafeResourceUrl;
}