import { dateFormat } from "../../../../utils/Utils";

export const Headers = [{
    name: "name",
    label: "Nombre"
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
}];