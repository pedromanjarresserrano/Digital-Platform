import { dateFormat, kbToSize, segFormat } from "../../../../utils/Utils";

export const Headers = [

    {
        name: "name",
        label: "Nombre"
    }, {
        name: "visualname",
        label: "Visual Name"
    }, {
        name: "duration",
        label: "Duration",
        converter: function (value) {
            return segFormat(value, false)
        }
    }, {
        name: "like",
        label: "Like"
    }, {
        name: "view",
        label: "Views"
    }, {
        name: "size",
        label: "Size file",
        converter: function (value) {
            return kbToSize(value)
        }
    }, {
        name: "year",
        label: "Year"
    }, {
        name: "quality",
        label: "Quality"
    }, {
        name: "portada",
        label: "Imagen portada"
    }, {
        name: "url",
        label: "Location"
    }, {
        name: "created",
        label: "Creado",
        converter: function (value) {
            return dateFormat(value)
        }
    }, {
        name: "updated",
        label: "Actualizado",
        converter: function (value) {
            return dateFormat(value)
        }
    }
];