import { PUBLIC_BASE_API } from "$env/static/public";
import { axiosPriv } from "$lib/services/http";

export const getProfile = async () => {
  return await axiosPriv.get(`${PUBLIC_BASE_API}/auth/api/v1/profile/`);
};

export const updateProfile = async (payload: Record<string, any>) => {
  return await axiosPriv.put(
    `${PUBLIC_BASE_API}/auth/api/v1/profile/`,
    payload,
  );
};
