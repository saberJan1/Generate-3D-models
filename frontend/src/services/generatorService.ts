import api from './api';

export interface Result<T> {
    code: number;
    msg: string;
    data: T;
}

export interface GenerateModelRequest {
    text: string;
    length: number;
    width: number;
    height: number;
    style: string;
}

export interface ModelResponse {
    modelUrl: string;
    thumbnailUrl: string;
    // Add other fields as per backend DTO
}

export const generatorService = {
    getStyles: async () => {
        const res = await api.get<Result<string[]>>('/v1/models/styles');
        return res.data.data;
    },

    getFormConfig: async () => {
        const res = await api.get<Result<any>>('/v1/models/form-config');
        return res.data.data;
    },

    generate: async (data: GenerateModelRequest) => {
        const res = await api.post<Result<ModelResponse>>('/v1/models/generate', data);
        return res.data.data;
    },

    generateFromImage: async (formData: FormData) => {
        const res = await api.post<Result<ModelResponse>>('/v1/models/generate-from-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.data;
    }
};
