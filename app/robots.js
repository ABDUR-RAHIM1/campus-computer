import { BASE_URL } from "@/constans";

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/profile/',
                    '/auth-admin/',
                    '/dashboard/',
                ],
            }
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
