import { dateFormat } from "../../../../utils/Utils";

export const Headers = [{
    name: "name",
    label: "Nombre"
}, {
    name: "visualname",
    label: "Visual Name"
}, {
    name: "like",
    label: "Like"
}, {
    name: "view",
    label: "Views"
}, {
    name: "pages",
    label: "Pages"
}, {
    name: "year",
    label: "Year"
}, {
    name: "writer",
    label: "Writer"
}, {
    name: "portada",
    label: "Imagen portada"
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