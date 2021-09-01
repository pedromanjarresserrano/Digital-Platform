import { dateFormat } from "../../../../utils/Utils";

export const Headers = [{
    name: "name",
    label: "Nombre"
}, {
    name: "aka",
    label: "Aka (Alias)"
}, {
    name: "edad",
    label: "Edad"
}, {
    name: "imageAvatar",
    label: "Imagen avatar"
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
}];