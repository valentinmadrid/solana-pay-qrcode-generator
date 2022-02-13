import { supabase } from "../../client";

function handler(req, res) {
    supabase.auth.api.setAuthCookie(req, res)
}

export default handler;