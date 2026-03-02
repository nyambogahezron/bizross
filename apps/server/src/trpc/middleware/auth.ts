import { auth } from "../../lib/auth";
import type { TokenPayload } from "../../types/auth";

export async function getUserFromHeader(
    req: Request,
): Promise<TokenPayload | null> {
    const headers = new Headers();
    req.headers.forEach((value, key) => {
        headers.set(key, value);
    });

    const session = await auth.api.getSession({
        headers,
    });

    if (!session) {
        return null;
    }

    return {
        id: session.user.id,
        name: session.user.name || "",
        username: session.user.email.split("@")[0] || "",
        role: session.user.role,
    };
}