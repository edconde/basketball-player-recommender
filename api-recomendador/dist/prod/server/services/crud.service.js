"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Clase con los métodos CRUD básicos para ser extendida
 */
class CrudService {
    constructor(model) {
        this.model = model;
    }
    /**
     * Busca todos los documentos de un modelo <T>
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find()
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    /**
     *
     * @param id el id del documento de tipo <T> a buscar
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .findById(new mongoose.Types.ObjectId(id))
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    /**
     * Inserta un documento
     * @param body el documento a insertar
     */
    addOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .create(body)
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    /**
     * Modifica un documento
     * @param conditions las condiciones a cumplir por los documentos que serán modificados
     * @param doc el documento a modificar
     */
    updateOne(conditions, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .updateOne(conditions, doc)
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    /**
     * Elimina un documento
     * @param id el id del documento de tipo <T> a eliminar
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
}
exports.default = CrudService;
//# sourceMappingURL=crud.service.js.map