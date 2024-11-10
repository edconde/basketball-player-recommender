"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(err, req, res, next) {
    res.status(500);
    res.json({ message: err.name + ': ' + err.message });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map