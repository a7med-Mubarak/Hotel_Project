const BASE_URL = "https://upskilling-egypt.com:3000/api/v0"

const BASE_AUTH_ADMIN = `${BASE_URL}/admin/users`
const BASE_ADMIN = `${BASE_URL}/admin`


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

export { AUTH_ADMIN_ENDPOINTS, PORTAL_AUTH_ENDPOINTS }
