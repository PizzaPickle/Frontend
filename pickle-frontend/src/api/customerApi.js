import { defaultInstance } from "./axiosInstance";

export const customerLogin = async (id, password) => {
    try {
        const data = defaultInstance.post("/customer/login", {
            id: id,
            password: password,
        })
        // if(대충 token 있으면) {
        // TODO
        //     cookie 저장하는 코드~ 이 쿠키는 httpOnly여야 합니다
        // }
        return data;
    } catch (error) {
        //에러 핸들링 로직
        console.log(error);
    }
}

/**
 * 나중에 사용 시
 * await customerLogin(id, password)
 *    .then(~~~)
 *    .catch(~~~)
 * 해서 사용하면 될듯
 */