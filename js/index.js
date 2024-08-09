const baseUrl = "https://localhost:7142/api/Client/"

Vue.createApp({
    data() {
        return {
            objList: [],
            singleObj: null,
            filterInputValue: "",
            deleteIdInputValue: "",
            getIdInputValue: "",
            addData: { clientId: "", clientName: "", enabled: "", created: "" },
            updData: { id: "", clientId: "", clientName: "", enabled: "", created: "" },
            getMessage: "",
            addMessage: "",
            updateMessage: "",
            deleteMessage: "",
        }
    },
    async created() {
        this.getAllObjs(baseUrl);
    },
    methods: {
        //---: CRUD SEKTION :----
        async getAllObjs() {
            try {
                const response = await axios.get(baseUrl + "filter");
                this.objList = response.data;
                console.log("objList errors?", this.objList);
            } catch (ex) {
                alert(ex.message);
            }
        },
        async getById(id) {
            const url = baseUrl + id;
            try {
                const response = await axios.get(url);
                this.singleObj = response.data;
                this.getMessage = `${response.status} ${response.statusText}`;
                console.log("singleObj:", this.singleObj);
                console.log("getMessage:", this.getMessage);
            } catch (ex) {
                this.getMessage = ex.response.data;
                console.error("Error fetching data:", ex);
            }
        },
        async addObj() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = `${response.status} ${response.statusText}`
                this.getAllObjs()
            } catch (ex) {
                this.addMessage = ex.response.data
                //alert(ex.message)
            }
        },
        async updateObj() {
            const url = baseUrl + this.updData.id
            try {
                response = await axios.put(url, this.updData)
                this.updateMessage = `${response.status} ${response.statusText}`
                this.getAllObjs()
            } catch (ex) {
                this.updateMessage = ex.response.data
                //alert(ex.message)
            }
        },
        async deleteObj(deleteIdInput) {
            const url = baseUrl + deleteIdInput
            try {
                response = await axios.delete(url)
                this.deleteMessage = `${response.status} ${response.statusText}`
                this.getAllObjs()
            } catch (ex) {
                this.deleteMessage = ex.response.data
                console.error
                //alert(ex.message)
            }
        },
        //---: FILTER & SORTING SECTION :---
        filterByClientId(list) {
            if (!this.filterInputValue) {
                return list;
            }
            return list.filter(obj => obj.clientId.toLowerCase().includes(this.filterInputValue.toLowerCase()));
        },
        sortById() {
            this.objList.sort((obj1, obj2) => obj1.id - obj2.id);
        },
        sortByIdDesc() {
            this.objList.sort((obj1, obj2) => obj2.id - obj1.id);
        },
        sortByClientId() {
            this.objList.sort((obj1, obj2) => obj1.clientId.localeCompare(obj2.clientId));
        },
        sortByClientIdDesc() {
            this.objList.sort((obj1, obj2) => obj2.clientId.localeCompare(obj1.clientId));
        },
        sortByClientName() {
            this.objList.sort((obj1, obj2) => {
                if (obj1.clientName === null) return 1;
                if (obj2.clientName === null) return -1;
                return obj1.clientName.localeCompare(obj2.clientName);
            });
        },
        sortByClientNameDesc() {
            this.objList.sort((obj1, obj2) => {
                if (obj1.clientName === null) return 1;
                if (obj2.clientName === null) return -1;
                return obj2.clientName.localeCompare(obj1.clientName);
            });
        },
        sortByEnabled() {
            this.objList.sort((obj1, obj2) => obj1.enabled - obj2.enabled);
        },
        sortByEnabledDesc() {
            this.objList.sort((obj1, obj2) => obj2.enabled - obj1.enabled);
        },
        sortByCreatedAscending() {
            this.objList.sort((obj1, obj2) => new Date(obj1.created) - new Date(obj2.created));
        },
        sortByCreatedDescending() {
            this.objList.sort((obj1, obj2) => new Date(obj2.created) - new Date(obj1.created));
        },
    }
}).mount("#app")