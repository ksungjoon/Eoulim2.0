import instance from './instance';

interface ApiResponse {
  onSuccess: () => void;
  onError: () => void;
}

interface ChildData {
  name: string;
  birth: string;
  gender: string;
  school: string;
  grade: string;
}

interface GetChildData extends ChildData {
  childId: number;
  status: string;
}

interface CreateChildParams extends ApiResponse {
  childData: ChildData;
}

interface ModifyChildParams extends ApiResponse {
  childData: GetChildData;
}

interface DeleteChildParams extends ApiResponse {
  childId: number;
}

interface CheckSchoolParams {
  school: string;
  onSuccess: (data: boolean) => void;
  onError: () => void;
}

interface GetChildParams {
  childId: number;
  onSuccess: (data: GetChildData) => void;
  onError: () => void;
}

export const postCreateChild = async ({ childData, onSuccess, onError }: CreateChildParams) => {
  try {
    await instance.post('/children', childData);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const postCheckSchool = async ({ school, onSuccess, onError }: CheckSchoolParams) => {
  try {
    const response = await instance.post(`/open-api/schools`, {
      keyword: school,
    });
    onSuccess(response.data.data);
  } catch (error) {
    onError();
  }
};

export const getChildData = async ({ childId, onSuccess, onError }: GetChildParams) => {
  try {
    const response = await instance.get(`/children/${childId}`);
    onSuccess(response.data.data);
  } catch (error) {
    onError();
  }
};

export const putModifyChild = async ({ childData, onSuccess, onError }: ModifyChildParams) => {
  try {
    await instance.put(`/children/${childData.childId}`, childData);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const deleteChild = async ({ childId, onSuccess, onError }: DeleteChildParams) => {
  try {
    await instance.delete(`/children/${childId}`);
    onSuccess();
  } catch (error) {
    onError();
  }
};
