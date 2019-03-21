import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/// <reference path="../interface/httpTypes.d.ts" />

const config: any = {
    baseURL: process.env.apiUrl || '',
	  withCredentials: true, // Check cross-site Access-Control
};

const $axios = axios.create(config);

$axios.interceptors.request.use(
	(conf: any) => {
		// Do something before request is sent
		return conf;
	},
	(error: any) => {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
$axios.interceptors.response.use(
	(response: any) => {
		// Do something with response data
		return response;
	},
	(error: any) => {
        // handleResStatus(error);
		// Do something with response error
		return Promise.reject(error);
	},
);

class Http {
    public ajax(options: HttpTypes.HttpConfig) {
        return new Promise((resolve, reject) => {
            $axios(options).then((res) => {
                resolve(res.data);
            }, (error: any) => {
                reject(error);
            });
        });
    }

    public get(options: HttpTypes.HttpConfig) {
        return this.ajax({
            method: 'get',
            url: options.url,
            params: options.params,
        });
    }

    public post(options: HttpTypes.HttpConfig) {
        return this.ajax({
            method: 'post',
            url: options.url,
            data: (qs as any).stringify(options.data),
            params: options.params,
        });
    }
}

(Plugin as any).install = (instance: any, options: any) => {
    instance.axios = new Http();
    (window as any).$http = new Http();

    Object.defineProperties(instance.prototype, {
        http: {
            get() {
                return new Http();
            },
        },
    });
};


Vue.use((Plugin as any));

export default Plugin;
