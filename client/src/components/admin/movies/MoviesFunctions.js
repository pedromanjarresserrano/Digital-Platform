import axios from "axios"


export async function fixFull(props) {

    try {
        let headers = {}
        headers["x-access-token"] = '' + localStorage.getItem("utoken");

        await axios.get("/api/fixes/specialnames?remake=true", {
            headers: headers
        })

        await axios.get("/api/fixes/fullfixes", {
            headers: headers
        })
        toastr["success"]("Fixing movies");

    } catch (error) {
        console.log(error);

        toastr["success"]("Error on fixing");

    }
}