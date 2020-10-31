const SECOND_NUM = 1000;

const MINUTE_NUM = 60 * SECOND_NUM;

const axios_post_config = {
    headers:{
        'Content-Type':'multipart/form-data'
    },
    timeout:2*MINUTE_NUM
}

const generate_cfg = (headers,timeout)=>{
    return {
        headers,
        timeout
    }
};

export const AXIOS_POST_CONFIG = axios_post_config;
export const CONFIG_GENERATOR = generate_cfg;
