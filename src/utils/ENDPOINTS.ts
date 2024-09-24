const BASE_URL = "https://upskilling-egypt.com:3000/api/v0"

const BASE_AUTH_ADMIN = `${BASE_URL}/admin/users`
const BASE_ADMIN = `${BASE_URL}/admin` 
export const IMG_BASE_URL="https://upskilling-egypt.com:3000"

const AUTH_ADMIN_ENDPOINTS = {
  LOGIN: `${BASE_AUTH_ADMIN}/login`,
  FORGOT_PASSWORD: `${BASE_AUTH_ADMIN}/forgot-password`,
  RESET_PASSWORD: `${BASE_AUTH_ADMIN}/reset-password`,
  CHANGE_PASSWORD: `${BASE_AUTH_ADMIN}/change-password`,
  GET_USER: `${BASE_AUTH_ADMIN}/me`,
  CHART: `${BASE_ADMIN}/dashboard`,
  Booking: `${BASE_ADMIN}/booking`
}

const PORTAL_AUTH_URL = `${BASE_URL}/portal/users`

const PORTAL_AUTH_ENDPOINTS = {
  LOGIN: `${PORTAL_AUTH_URL}/login`,
  REGISTER: `${PORTAL_AUTH_URL}`,
  FORGOT_PASSWORD: `${PORTAL_AUTH_URL}/forgot-password`,
  RESET_PASSWORD: `${PORTAL_AUTH_URL}/reset-password`,
  CHANGE_PASSWORD: `${PORTAL_AUTH_URL}/change-password`,
  GET_USER: `${PORTAL_AUTH_URL}/me`,
}


const BASE_ROOM_ADMIN = `${BASE_URL}/admin/rooms`

const ROOM_ADMIN_ENDPOINTS = {
  getRooms: BASE_ROOM_ADMIN,
  createRooms: BASE_ROOM_ADMIN,
  facility: "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
  delete: (id: number) => `${BASE_ROOM_ADMIN}/${id}`, // استخدام ${id} بدلاً من $(id)
};
const BASE_ADS_ADMIN = `${BASE_URL}/admin/ads`

const ADS_ADMIN_ENDPOINTS = {
  getAds: BASE_ADS_ADMIN,
  createAds: BASE_ADS_ADMIN,
  facility: "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
  delete: (id: number) => `${BASE_ADS_ADMIN}/${id}`, // استخدام ${id} بدلاً من $(id)
};
export { AUTH_ADMIN_ENDPOINTS, PORTAL_AUTH_ENDPOINTS, ROOM_ADMIN_ENDPOINTS, ADS_ADMIN_ENDPOINTS }
