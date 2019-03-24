const Methods = {
    test(id) {
        console.log('触发change方法了' + id);

        $http.get({
            url: '/qrc/skin/findByTemplateId',
            params: {
                templateId: id
            },
        }).then((res) => {
            if (res.code === 10000) {
                // this.skinData = res.data;
                // this.selectOptions = res.data;
                let storeData = JSON.parse(sessionStorage.getItem("apiData"));
                storeData.skinData = res.data;
                sessionStorage.setItem("apiData", JSON.stringify(storeData));
                vm._data.apiData.skinData = res.data
                window.parseInstance.matchingRoute();

            }
        });
    }

};

export default Methods;

