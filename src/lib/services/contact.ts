import { PUBLIC_BASE_API } from '$env/static/public';
import axios from 'axios';

export async function contactUs(values: Record<string, unknown>) {
	return await axios.post(`${PUBLIC_BASE_API}/dw/api/v2/contact-us`, values);
}

export async function supportUs(values: Record<string, unknown>) {
	return await axios.post(`${PUBLIC_BASE_API}/dw/api/v2/support-us`, values);
}
