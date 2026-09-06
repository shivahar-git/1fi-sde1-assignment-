const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/$/, "");


async function request(path) {

  const response = await fetch(
    `${API_URL}${path}`
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.message || "Something went wrong"
    );
  }

  return body.data;
}


export function getProducts() {

  return request("/products");

}


export function getProduct(slug) {

  return request(`/products/${slug}`);

}
