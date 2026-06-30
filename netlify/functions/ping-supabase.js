export async function handler() {
  const SUPABASE_URL =
    "https://tfgbohpqatvinfrcuzxw.supabase.co/rest/v1/categories";
  const SUPABASE_KEY = import.meta.env.SUPABASE_ANON_KEY;
  try {
    const responce = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      },
    );
    if (!responce.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Supabase alive" }),
      };
    } else {
      return {
        statusCode: responce.status,
        body: JSON.stringify({ status: "Error pinging Supabase" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "Ping failed", error: error.message }),
    };
  }
}
