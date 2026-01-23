import { api } from "./api";

export interface Media {
  id: string;
  url: string;
  contentType: string;
  createdAt: string;
}

export const mediaService = {
  getAll() {
    return api.get<Media[]>("/media");
  },

  upload(file: File) {
    const formData = new FormData();
    formData.append("file", file); // 🔴 ESTE ERA EL ERROR

    return api.post<Media>("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id: string) {
    return api.delete(`/media/${id}`);
  }
};
